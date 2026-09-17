"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { GALLERY } from "@/lib/content";
import { ScrollReveal } from "@/components/site/scroll-reveal";

const N = GALLERY.length;
// Cuánto scroll (en vh) toma pasar de una foto a la siguiente.
const VH_PER_PHOTO = 40;
// Tamaño de las fotos que no están al centro, relativo a la activa.
const MIN_SCALE = 0.45;
// Separación vertical entre centros de fotos, relativa al alto de la activa.
const GAP = 0.78;

// Galería "foto por foto" que pidió el cliente: mientras bajas, la foto que
// llega al centro se hace grande y la anterior se achica al subir. La sección
// es alta (N × VH_PER_PHOTO) y lo de adentro queda fijo (sticky); el avance
// del scroll decide qué foto está al centro. Los estilos se escriben directo
// al DOM en requestAnimationFrame para no re-renderizar React en cada scroll.
export function Galeria() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const captionRef = useRef<HTMLParagraphElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let ticking = false;
    let lastActive = -1;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      const progress = Math.min(Math.max((72 - rect.top) / scrollable, 0), 1);
      const pos = progress * (N - 1);

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const d = i - pos;
        if (Math.abs(d) > 3) {
          card.style.visibility = "hidden";
          return;
        }
        const closeness = Math.max(0, 1 - Math.abs(d));
        const scale = MIN_SCALE + (1 - MIN_SCALE) * closeness;
        card.style.visibility = "visible";
        card.style.transform = `translate(-50%, calc(-50% + ${d * GAP * 100}%)) scale(${scale})`;
        card.style.opacity = String(0.35 + 0.65 * closeness);
        card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      });

      const active = Math.round(pos);
      if (active !== lastActive) {
        lastActive = active;
        if (captionRef.current) captionRef.current.textContent = GALLERY[active].caption;
        if (counterRef.current) counterRef.current.textContent = `${active + 1} / ${N}`;
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="bg-brand-cream px-5 pt-16 sm:px-8 sm:pt-24">
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="mb-2 block font-accent text-sm font-bold tracking-[0.14em] text-brand-green">
            CONOCE MÁS
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
            Fotos que hablan por sí solas
          </h2>
        </ScrollReveal>
      </div>

      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(${(N - 1) * VH_PER_PHOTO}vh + 100vh)` }}
      >
        {/* top-[72px]: debajo de la barra verde fija, para que no tape la foto. */}
        <div className="sticky top-[72px] mx-auto flex h-[calc(100dvh-72px)] max-w-6xl items-center overflow-hidden">
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-[200] text-center md:bottom-auto md:left-0 md:right-auto md:top-1/2 md:w-[30%] md:-translate-y-1/2 md:text-left">
            <span
              ref={counterRef}
              className="font-accent text-sm font-bold tracking-[0.14em] text-brand-green"
            >
              1 / {N}
            </span>
            <p
              ref={captionRef}
              className="mx-auto mt-1 max-w-[22ch] rounded-2xl bg-brand-cream/85 px-3 py-1 font-display text-lg font-extrabold uppercase leading-tight text-brand-green-900 md:mx-0 md:bg-transparent md:px-0 md:text-3xl"
            >
              {GALLERY[0].caption}
            </p>
          </div>

          <div className="relative h-full w-full md:ml-[30%] md:w-[70%]">
            {GALLERY.map((photo, i) => (
              <figure
                key={photo.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 aspect-[4/5] h-[54vh] max-w-[88vw] md:h-[64vh] overflow-hidden rounded-3xl shadow-soft will-change-transform"
                style={{ visibility: i < 3 ? "visible" : "hidden" }}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 85vw"
                  loading={i < 3 ? "eager" : "lazy"}
                  className="object-cover"
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
