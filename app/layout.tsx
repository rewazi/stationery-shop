import type { Metadata } from "next";
import { Alegreya, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const alegreya = Alegreya({
  subsets: ["latin", "cyrillic"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Penn & Paper — канцелярия для медленной работы",
  description:
    "Блокноты, перьевые ручки и чернила для тех, кто пишет от руки. Магазин Penn & Paper.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#B4472B",
          colorText: "#20241F",
          colorBackground: "#F6F1E4",
          colorInputBackground: "#FFFFFF",
          fontFamily: "var(--font-public-sans)",
          borderRadius: "2px",
        },
      }}
    >
      <html lang="ru" className={`${alegreya.variable} ${manrope.variable}`}>
        <body className="font-body antialiased">{children}</body>
      </html>
    </ClerkProvider>
  );
}
