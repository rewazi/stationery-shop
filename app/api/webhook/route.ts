import { NextRequest, NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

// Stripe needs the raw request body to verify the webhook signature, so
// this route must not be parsed as JSON by Next.js — the default
// (Node) runtime with req.text() below gives us that raw body.

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Отсутствует подпись вебхука" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error(`Webhook signature verification failed: ${message}`);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const client = await clerkClient();

  switch (event.type) {
    // A checkout just completed — link the new/returning Stripe Customer
    // to the Clerk user that started the session, so the Customer Portal
    // and future checkouts know who they are.
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const clerkUserId =
        session.client_reference_id ?? session.metadata?.clerkUserId;
      const customerId =
        typeof session.customer === "string" ? session.customer : undefined;

      if (clerkUserId && customerId) {
        await client.users.updateUserMetadata(clerkUserId, {
          privateMetadata: { stripeCustomerId: customerId },
        });
      }
      break;
    }

    // Handy log points if you later add subscriptions — the Customer
    // Portal can also manage these once you enable them in Stripe.
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.log(`Subscription ${subscription.id}: ${event.type}`);
      break;
    }

    default:
      break;
  }

  return NextResponse.json({ received: true });
}
