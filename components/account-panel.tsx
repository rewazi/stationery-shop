"use client";

import { useState } from "react";

export function AccountPanel({
  hasStripeCustomer,
}: {
  hasStripeCustomer: boolean;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function openPortal() {
    setError(null);
    setIsLoading(true);
    try {
      const res = await fetch("/api/portal", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Что-то пошло не так");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Что-то пошло не так");
      setIsLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <button
        onClick={openPortal}
        disabled={!hasStripeCustomer || isLoading}
        className="bg-ink px-5 py-3 font-body text-sm text-paper transition hover:bg-clay-dark disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isLoading ? "Открываем…" : "Управлять оплатой"}
      </button>
      {error && (
        <p className="mt-3 font-body text-sm text-clay-dark">{error}</p>
      )}
      {!hasStripeCustomer && (
        <a
          href="/#catalog"
          className="ml-4 font-body text-sm text-ink underline decoration-clay/50 underline-offset-4 hover:text-clay"
        >
          Перейти в каталог →
        </a>
      )}
    </div>
  );
}
