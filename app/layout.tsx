import type { Metadata } from "next";
import { Montserrat, Nunito, Open_Sans } from "next/font/google";
import "./globals.css";

// Tipografías de la marca: Montserrat (títulos), Open Sans (textos) y
// Aristotelica — esa es de paga, así que en su lugar va Nunito, que es
// gratuita y tiene el mismo estilo redondeado/geométrico.
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mr. Elote Mix Gourmet",
  description:
    "Franquicia de eloterías gourmet — esquites y elotes con personalidad, nacidos en Xalapa en 2016.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${openSans.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-ink">
        {children}
      </body>
    </html>
  );
}
