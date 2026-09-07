# Penn & Paper — магазин канцелярии

Одностраничный интернет-магазин на Next.js 14 (App Router) с авторизацией
через **Clerk** и оплатой через **Stripe Checkout** + **Stripe Customer
Portal**.

## Что уже сделано

- Каталог из 6 товаров (`lib/products.ts`) — отредактируйте под свой
  ассортимент.
- Вход/регистрация через Clerk (модальное окно и отдельные страницы
  `/sign-in`, `/sign-up`).
- Корзина на клиенте (React Context) → `/api/checkout` создаёт сессию
  Stripe Checkout.
- Вебхук `/api/webhook` сохраняет `stripeCustomerId` в `privateMetadata`
  пользователя Clerk после успешной оплаты.
- Защищённая страница `/account` с кнопкой «Управлять оплатой», которая
  открывает Stripe Customer Portal (`/api/portal`).
- `middleware.ts` защищает `/account` и обе платёжные API-роуты — без
  входа Clerk их не пропустит.

## Шаг 1 — установите зависимости

```bash
npm install
```

## Шаг 2 — создайте аккаунт в Clerk (5 минут)

1. Зайдите на **https://dashboard.clerk.com** и зарегистрируйтесь
   (можно через Google/GitHub).
2. Нажмите **Create application**, дайте название («Penn & Paper»),
   оставьте способы входа по умолчанию (email + пароль, например).
3. Откройте **API Keys** в боковом меню и скопируйте:
   - `Publishable key` → `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `Secret key` → `CLERK_SECRET_KEY`

## Шаг 3 — создайте аккаунт в Stripe (5 минут)

1. Зайдите на **https://dashboard.stripe.com/register** и
   зарегистрируйтесь.
2. Убедитесь, что переключатель в правом верхнем углу стоит на
   **Test mode** — на нём удобно всё проверить перед реальными
   платежами.
3. Откройте **Developers → API keys** и скопируйте `Secret key`
   (`sk_test_...`) → `STRIPE_SECRET_KEY`.
4. Включите **Customer Portal**: Settings → Billing → Customer portal →
   Activate test link (можно оставить настройки по умолчанию — какие
   поля клиент может менять и т.д.).

### Вебхук (обязательно, иначе `/account` не узнает об оплате)

Локально — через Stripe CLI:

```bash
# https://stripe.com/docs/stripe-cli — установить один раз
stripe login
npm run stripe:listen
```

Команда выведет `whsec_...` — вставьте его в `STRIPE_WEBHOOK_SECRET`.

В проде — в Dashboard → Developers → Webhooks → **Add endpoint**:
- URL: `https://ваш-домен.com/api/webhook`
- Событие: `checkout.session.completed` (и, если добавите подписки —
  `customer.subscription.updated`, `customer.subscription.deleted`)
- Скопируйте **Signing secret** в `STRIPE_WEBHOOK_SECRET` на хостинге.

## Шаг 4 — заполните .env.local

```bash
cp .env.example .env.local
# впишите ключи, полученные выше
```

## Шаг 5 — запустите

```bash
npm run dev
```

Откройте http://localhost:3000, зарегистрируйтесь через Clerk, добавьте
товар в корзину и оформите заказ тестовой картой Stripe:

```
Номер карты: 4242 4242 4242 4242
Срок: любая будущая дата, CVC: любые 3 цифры
```

После оплаты вернитесь на сайт → «Личный кабинет» → «Управлять
оплатой» откроет Stripe Customer Portal с этим заказом.

## Реальные цены через Stripe Dashboard (опционально)

Сейчас цены передаются в Stripe «на лету» (`price_data`) из
`lib/products.ts`, так что магазин работает сразу после настройки
ключей. Когда захотите управлять ценами из Stripe Dashboard: создайте
там Product + Price для каждого товара и впишите `price_xxx` в поле
`stripePriceId` в `lib/products.ts` — код автоматически начнёт
использовать его вместо `price_data`.

## Структура проекта

```
app/
  page.tsx                 — главная (витрина)
  account/page.tsx         — личный кабинет (защищено Clerk)
  sign-in/, sign-up/       — страницы Clerk
  api/checkout/route.ts    — создаёт Stripe Checkout Session
  api/portal/route.ts      — создаёт сессию Customer Portal
  api/webhook/route.ts     — слушает события Stripe
lib/
  products.ts              — каталог товаров
  stripe.ts                — клиент Stripe SDK
components/
  cart-context.tsx         — состояние корзины
  header.tsx, product-grid.tsx, cart-drawer.tsx, account-panel.tsx
middleware.ts              — защита приватных роутов через Clerk
```
