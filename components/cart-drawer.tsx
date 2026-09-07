"use client";

import { useState } from "react";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { PRODUCTS, formatPrice } from "@/lib/products";
import { useCart } from "./cart-context";

export function CartDrawer() {
  const { isOpen, closeCart, lines, setQuantity, totalPrice } = useCart();
  const { isSignedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Что-то пошло не так");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
      setIsLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <button
          aria-label="Закрыть корзину"
          onClick={closeCart}
          className="fixed inset-0 z-40 bg-ink/30"
        />
      )}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-paper shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
          <h2 className="font-display text-xl text-ink">Ваша корзина</h2>
          <button
            onClick={closeCart}
            aria-label="Закрыть"
            className="font-body text-sm text-graphite hover:text-ink"
          >
            Закрыть
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="mt-8 text-center font-body text-sm text-graphite">
              Пока пусто. Загляните в каталог.
            </p>
          ) : (
            <ul className="divide-y divide-ink/10">
              {lines.map((line) => {
                const product = PRODUCTS.find((p) => p.id === line.id);
                if (!product) return null;
                return (
                  <li key={line.id} className="flex gap-4 py-4">
                    <div className="flex-1">
                      <p className="font-body text-sm text-ink">
                        {product.name}
                      </p>
                      <p className="font-body text-xs text-graphite">
                        {formatPrice(product.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            setQuantity(line.id, line.quantity - 1)
                          }
                          className="h-6 w-6 border border-ink/20 font-body text-sm text-ink hover:border-clay"
                          aria-label="Уменьшить количество"
                        >
                          −
                        </button>
                        <span className="w-6 text-center font-body text-sm">
                          {line.quantity}
                        </span>
                        <button
                          onClick={() =>
                            setQuantity(line.id, line.quantity + 1)
                          }
                          className="h-6 w-6 border border-ink/20 font-body text-sm text-ink hover:border-clay"
                          aria-label="Увеличить количество"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="font-body text-sm text-ink">
                      {formatPrice(product.price * line.quantity)}
                    </p>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="border-t border-ink/10 px-6 py-5">
          <div className="mb-4 flex items-center justify-between font-body text-sm text-ink">
            <span>Итого</span>
            <span className="font-display text-lg">
              {formatPrice(totalPrice)}
            </span>
          </div>

          {error && (
            <p className="mb-3 font-body text-sm text-clay-dark">{error}</p>
          )}

          {isSignedIn ? (
            <button
              onClick={handleCheckout}
              disabled={lines.length === 0 || isLoading}
              className="w-full bg-ink py-3 font-body text-sm text-paper transition hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isLoading ? "Переходим к оплате…" : "Оформить заказ"}
            </button>
          ) : (
            <SignInButton mode="modal">
              <button
                disabled={lines.length === 0}
                className="w-full bg-ink py-3 font-body text-sm text-paper transition hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
              >
                Войти и оформить заказ
              </button>
            </SignInButton>
          )}
        </div>
      </aside>
    </>
  );
}
