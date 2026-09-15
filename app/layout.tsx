import type { Metadata } from "next";
import { Anton, Baloo_2, Permanent_Marker } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const baloo = Baloo_2({
  variable: "--font-baloo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const marker = Permanent_Marker({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "400",
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
      className={`${anton.variable} ${baloo.variable} ${marker.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-brand-cream text-brand-ink">
        {children}
      </body>
    </html>
  );
}
