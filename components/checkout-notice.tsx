"use client";

import { useSearchParams } from "next/navigation";

export function CheckoutNotice() {
  const params = useSearchParams();
  const status = params.get("checkout");

  if (status !== "success" && status !== "cancelled") return null;

  const isSuccess = status === "success";

  return (
    <div
      className={`px-6 py-3 text-center font-body text-sm ${
        isSuccess ? "bg-sage/20 text-sage" : "bg-clay/10 text-clay-dark"
      }`}
    >
      {isSuccess
        ? "Спасибо! Оплата прошла успешно — чек уже летит на вашу почту."
        : "Оформление отменено. Товары остались в корзине."}
    </div>
  );
}
