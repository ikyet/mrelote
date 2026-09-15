"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { asset } from "@/lib/utils";

export function Hero() {
  return (
    <section id="inicio">
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={asset("/images/hero-kiosk.jpg")}
        bgImageSrc={asset("/images/hero-bg.jpg")}
        title="mr. élote"
        date="Franquicia de eloterías gourmet"
        scrollToExpand="Desliza para descubrir la marca ↓"
      >
        <div className="mx-auto max-w-3xl text-center">
          <p className="mx-auto max-w-2xl text-lg text-brand-ink/80">
            Esquites y elotes gourmet con personalidad — la franquicia con
            mayor crecimiento del segmento en 2022. Conoce la marca, vive la
            experiencia y descubre tu próxima franquicia.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#quienes-somos"
              className="rounded-full border-2 border-brand-ink/15 px-6 py-3 font-semibold text-brand-ink transition-colors hover:border-brand-ink/40"
            >
              Conoce la marca
            </a>
            <a
              href="#lead-form"
              className="rounded-full bg-brand-green px-6 py-3 font-semibold text-brand-cream shadow-soft transition-transform hover:-translate-y-0.5"
            >
              Quiero mi franquicia
            </a>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
