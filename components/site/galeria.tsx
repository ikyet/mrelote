"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { GALLERY } from "@/lib/content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { cn } from "@/lib/utils";

export function Galeria() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openIndex, close]);

  const active = openIndex !== null ? GALLERY[openIndex] : null;

  return (
    <div className="bg-brand-cream px-5 py-16 sm:px-8 sm:py-24">
      <div className="mx-auto max-w-6xl">
      <ScrollReveal>
        <span className="mb-2 block text-sm font-bold tracking-[0.14em] text-brand-green">
          CONOCE MÁS
        </span>
        <h2 className="mb-10 font-display text-3xl uppercase tracking-wide sm:text-4xl">
          Fotos que hablan por sí solas
        </h2>
      </ScrollReveal>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5">
        {GALLERY.map((photo, i) => (
          <ScrollReveal
            key={photo.src}
            delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
            className={cn(photo.hideOnMobile && "hidden sm:block")}
          >
            <figure
              className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl"
              onClick={() => setOpenIndex(i)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 640px) 30vw, 45vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-3 pb-3 pt-8">
                <figcaption className="text-xs font-semibold text-white sm:text-sm">
                  {photo.caption}
                </figcaption>
              </div>
            </figure>
          </ScrollReveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-brand-ink/95 p-6 sm:p-10"
          onClick={close}
        >
          <button
            type="button"
            aria-label="Cerrar imagen"
            onClick={close}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <X size={22} />
          </button>
          <div
            className="relative max-h-[85vh] w-full max-w-3xl"
            style={{ aspectRatio: `${active.w}/${active.h}` }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="rounded-xl object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
