export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number; // in euro cents
  image: string;
  /**
   * The Stripe Price ID for this product (starts with "price_").
   * Create these in the Stripe Dashboard → Product catalog,
   * then paste the IDs here. Until you do, checkout falls back
   * to Stripe's `price_data`, built from `price` above, so the
   * store works immediately — but the Price IDs are what let you
   * manage prices, taxes and currencies from the Dashboard later.
   */
  stripePriceId?: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "notebook-dotted",
    name: "Точечный блокнот А5",
    tagline: "80 г/м², прошивка нитью, лежит плоско",
    price: 1290,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "fountain-pen",
    name: "Перьевая ручка «Скрипт»",
    tagline: "Перо EF, латунный корпус",
    price: 3490,
    image:
      "https://images.unsplash.com/photo-1583485088034-697b5bd54333?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "ink-bottle",
    name: "Чернила «Дубовый орех»",
    tagline: "50 мл, быстросохнущие",
    price: 990,
    image:
      "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "washi-set",
    name: "Набор васи-ленты",
    tagline: "6 узоров, 15 мм × 5 м",
    price: 890,
    image:
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "desk-organizer",
    name: "Органайзер «Планка»",
    tagline: "Дуб, 4 отделения",
    price: 4290,
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "wax-seal",
    name: "Набор сургучной печати",
    tagline: "Латунная печать + 3 палочки сургуча",
    price: 1990,
    image:
      "https://images.unsplash.com/photo-1607435097405-db48f377bff6?q=80&w=800&auto=format&fit=crop",
  },
];

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
