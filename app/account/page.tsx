import { currentUser } from "@clerk/nextjs/server";
import { AccountPanel } from "@/components/account-panel";

export default async function AccountPage() {
  const user = await currentUser();
  const hasStripeCustomer = Boolean(user?.privateMetadata?.stripeCustomerId);

  return (
    <main className="mx-auto min-h-screen max-w-2xl px-6 py-20">
      <a href="/" className="font-display text-xl italic text-ink">
        Penn &amp; Paper
      </a>

      <h1 className="mt-10 font-display text-3xl text-ink">
        Здравствуйте, {user?.firstName ?? "друг"}
      </h1>
      <p className="mt-2 font-body text-sm text-graphite">
        {user?.primaryEmailAddress?.emailAddress}
      </p>

      <div className="mt-10 border-t border-ink/10 pt-8">
        <h2 className="font-display text-xl text-ink">Оплата и заказы</h2>
        <p className="mt-2 max-w-prose font-body text-sm text-graphite">
          {hasStripeCustomer
            ? "Здесь можно посмотреть чеки, обновить карту или изменить платёжный адрес — всё через защищённую страницу Stripe."
            : "Личный кабинет Stripe появится здесь после вашей первой покупки."}
        </p>
        <AccountPanel hasStripeCustomer={hasStripeCustomer} />
      </div>
    </main>
  );
}
