"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { useCart } from "./cart-context";

export function Header() {
  const { totalCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-display text-xl italic text-ink">
          Penn &amp; Paper
        </a>

        <nav className="hidden gap-8 font-body text-sm text-ink/80 md:flex">
          <a href="#catalog" className="hover:text-clay">
            Каталог
          </a>
          <a href="#story" className="hover:text-clay">
            О нас
          </a>
          <SignedIn>
            <Link href="/account" className="hover:text-clay">
              Личный кабинет
            </Link>
          </SignedIn>
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={openCart}
            className="relative font-body text-sm text-ink underline decoration-clay/50 underline-offset-4 hover:decoration-clay"
            aria-label="Открыть корзину"
          >
            Корзина
            {totalCount > 0 && (
              <span className="ml-1 rounded-full bg-clay px-1.5 py-0.5 text-xs text-paper">
                {totalCount}
              </span>
            )}
          </button>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-sm border border-ink/20 px-3 py-1.5 font-body text-sm text-ink hover:border-clay hover:text-clay">
                Войти
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
