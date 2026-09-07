import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";

type CartItem = { id: string; quantity: number };

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  const { items } = (await req.json()) as { items: CartItem[] };
  if (!items?.length) {
    return NextResponse.json({ error: "Корзина пуста" }, { status: 400 });
  }

  const line_items = items.map(({ id, quantity }) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error(`Unknown product id: ${id}`);

    // Prefer a real Stripe Price ID (set in lib/products.ts) so prices are
    // managed from the Stripe Dashboard. Fall back to inline price_data so
    // the demo store works before you've created Prices in Stripe.
    if (product.stripePriceId) {
      return { price: product.stripePriceId, quantity };
    }
    return {
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        product_data: {
          name: product.name,
          description: product.tagline,
          images: [product.image],
        },
      },
    };
  });

  const user = await currentUser();
  const existingCustomerId = user?.privateMetadata?.stripeCustomerId as
    | string
    | undefined;

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items,
    client_reference_id: userId,
    customer: existingCustomerId,
    customer_email: existingCustomerId
      ? undefined
      : user?.primaryEmailAddress?.emailAddress,
    // Stripe creates a Customer record for first-time buyers so the
    // Customer Portal and order history work for them afterwards too.
    customer_creation: existingCustomerId ? undefined : "always",
    success_url: `${origin}/?checkout=success`,
    cancel_url: `${origin}/?checkout=cancelled`,
    metadata: { clerkUserId: userId },
  });

  // Note: we don't write stripeCustomerId here. With `customer_creation:
  // "always"`, Stripe only materializes the Customer once payment
  // completes — the webhook below is the reliable place to save it.
  return NextResponse.json({ url: session.url });
}
