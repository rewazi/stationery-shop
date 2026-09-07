"use client";

import Image from "next/image";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { useCart } from "./cart-context";

export function ProductGrid() {
  const { addItem } = useCart();

  return (
    <section id="catalog" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mb-12 flex items-end justify-between border-b border-ink/15 pb-6">
        <h2 className="font-display text-3xl text-ink">Каталог</h2>
        <p className="max-w-xs text-right font-body text-sm text-graphite">
          Шесть вещей, которые стоит держать на столе.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((product) => (
          <article key={product.id} className="group">
            <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-paper-dark">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-lg text-ink">
                  {product.name}
                </h3>
                <p className="font-body text-sm text-graphite">
                  {product.tagline}
                </p>
              </div>
              <span className="whitespace-nowrap font-body text-sm text-ink">
                {formatPrice(product.price)}
              </span>
            </div>
            <button
              onClick={() => addItem(product.id)}
              className="mt-3 border-b border-clay pb-0.5 font-body text-sm text-clay hover:text-clay-dark hover:border-clay-dark"
            >
              Добавить в корзину
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
