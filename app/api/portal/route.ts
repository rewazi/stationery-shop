import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Требуется вход" }, { status: 401 });
  }

  const user = await currentUser();
  const stripeCustomerId = user?.privateMetadata?.stripeCustomerId as
    | string
    | undefined;

  if (!stripeCustomerId) {
    return NextResponse.json(
      {
        error:
          "У вас пока нет ни одной оплаты через Stripe, поэтому личный кабинет ещё не создан.",
      },
      { status: 404 }
    );
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${origin}/account`,
  });

  return NextResponse.json({ url: portalSession.url });
}
