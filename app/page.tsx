import { Suspense } from "react";
import Image from "next/image";
import { CartProvider } from "@/components/cart-context";
import { Header } from "@/components/header";
import { ProductGrid } from "@/components/product-grid";
import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutNotice } from "@/components/checkout-notice";

export default function HomePage() {
  return (
    <CartProvider>
      <div id="top">
        <Header />
        <Suspense fallback={null}>
          <CheckoutNotice />
        </Suspense>

        <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="mb-4 font-body text-sm text-clay">
              Магазин канцелярии
            </p>
            <h1 className="font-display text-5xl italic leading-[1.05] text-ink md:text-6xl">
              Пишите
              <br />
              медленнее
            </h1>
            <p className="mt-6 max-w-prose font-body text-base leading-relaxed text-graphite">
              Бумага, которая держит перо, чернила, которые не просвечивают,
              и блокноты, которые раскрываются полностью. Мы собираем вещи
              для тех, кто всё ещё пишет от руки — списки, письма, планы на
              год.
            </p>
            <a
              href="#catalog"
              className="mt-8 inline-block border-b border-ink pb-1 font-body text-sm text-ink hover:border-clay hover:text-clay"
            >
              Смотреть каталог
            </a>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-paper-dark">
            <Image
              src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop"
              alt="Письменный стол с блокнотом и перьевой ручкой"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </section>

        <ProductGrid />

        <section
          id="story"
          className="border-t border-ink/10 bg-paper-dark/60"
        >
          <div className="mx-auto max-w-2xl px-6 py-20 text-center">
            <h2 className="font-display text-3xl text-ink">О нас</h2>
            <p className="mt-6 font-body leading-relaxed text-graphite">
              Penn &amp; Paper начался с одной перьевой ручки, купленной на
              блошином рынке, и вопроса, почему хорошую бумагу так трудно
              найти. Сегодня мы отбираем канцелярию у небольших мастерских —
              каждая вещь выдерживает ежедневное использование и остаётся
              приятной в руке.
            </p>
          </div>
        </section>

        <footer className="border-t border-ink/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 font-body text-sm text-graphite md:flex-row">
            <span>© {new Date().getFullYear()} Penn &amp; Paper</span>
            <a href="/account" className="hover:text-clay">
              Личный кабинет и заказы
            </a>
          </div>
        </footer>

        <CartDrawer />
      </div>
    </CartProvider>
  );
}
