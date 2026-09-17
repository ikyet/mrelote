"use client";

import { useEffect, useRef } from "react";
import { GALLERY } from "@/lib/content";

const N = GALLERY.length;
// Cuánto scroll (en vh) toma pasar de una foto a la siguiente.
const VH_PER_PHOTO = 40;
// Tamaño de las fotos que no están al centro, relativo a la activa.
const MIN_SCALE = 0.45;
// Separación vertical entre centros de fotos, relativa al alto de la activa.
const GAP = 0.78;
// Cuántas fotos alrededor de la activa se dibujan. Las demás se quitan del
// render (display:none) para que el celular no tenga 37 capas vivas.
const WINDOW = 2;
// Alto de la barra verde fija.
const NAV_H = 72;

// Galería "foto por foto": mientras bajas, la foto que llega al centro se hace
// grande y la anterior se achica al subir. La sección es alta (N ×
// VH_PER_PHOTO) y lo de adentro queda fijo (sticky); el avance del scroll
// decide qué foto está al centro.
//
// Rendimiento (en celular se sentía trabado): en cada frame solo se tocan las
// fotos de la ventana visible, `will-change` y las capas GPU se ponen y se
// quitan al entrar/salir de esa ventana, y las fotos lejanas van en
// display:none. Las imágenes se sirven en dos tamaños (700px en celular,
// 1100px en escritorio) con <picture>.
export function Galeria() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    let ticking = false;
    let lastActive = -1;
    // Índices que están dibujados ahora mismo, para no escribir estilos de más.
    const shown = new Set<number>();
    const preloaded = new Set<number>();

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = track.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max((NAV_H - rect.top) / scrollable, 0), 1);
      const pos = progress * (N - 1);

      const from = Math.max(0, Math.ceil(pos) - WINDOW);
      const to = Math.min(N - 1, Math.floor(pos) + WINDOW);

      shown.forEach((i) => {
        if (i < from || i > to) {
          const card = cardRefs.current[i];
          if (card) {
            card.style.display = "none";
            card.style.willChange = "auto";
          }
          shown.delete(i);
        }
      });

      for (let i = from; i <= to; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;
        if (!shown.has(i)) {
          card.style.display = "block";
          card.style.willChange = "transform, opacity";
          shown.add(i);
        }
        const d = i - pos;
        const closeness = Math.max(0, 1 - Math.abs(d));
        const scale = MIN_SCALE + (1 - MIN_SCALE) * closeness;
        card.style.transform = `translate3d(-50%, calc(-50% + ${d * GAP * 100}%), 0) scale(${scale})`;
        card.style.opacity = String(0.35 + 0.65 * closeness);
        card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));
      }

      const active = Math.round(pos);
      if (active !== lastActive) {
        lastActive = active;
        if (counterRef.current) {
          counterRef.current.textContent = `${active + 1} / ${N}`;
        }
        // Las fotos fuera de la ventana van en display:none, así que su <img>
        // lazy no empieza a bajar hasta que aparecen. Se van pidiendo antes,
        // en caché, para que ninguna entre en blanco.
        const small = window.innerWidth <= 768;
        for (let i = active + 1; i <= Math.min(N - 1, active + 4); i++) {
          const photo = GALLERY[i];
          if (preloaded.has(i)) continue;
          preloaded.add(i);
          const img = new Image();
          img.src = small ? photo.srcSm : photo.src;
        }
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
    <div className="bg-brand-cream px-5 sm:px-8">
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(${(N - 1) * VH_PER_PHOTO}vh + 100vh)` }}
      >
        {/* top-[72px]: debajo de la barra verde fija, para que no tape la foto. */}
        <div className="sticky top-[72px] mx-auto flex h-[calc(100dvh-72px)] max-w-6xl items-center overflow-hidden [contain:layout_paint]">
          <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-[200] text-center md:bottom-auto md:left-0 md:right-auto md:top-1/2 md:w-[30%] md:-translate-y-1/2 md:text-left">
            <span
              ref={counterRef}
              className="font-accent text-sm font-bold tracking-[0.14em] text-brand-green"
            >
              1 / {N}
            </span>
            {/* Una sola frase para toda la galería: ya no cambia foto por foto. */}
            <p className="mx-auto mt-1 max-w-[16ch] rounded-2xl bg-brand-cream/85 px-3 py-1 font-display text-lg font-extrabold uppercase leading-tight text-brand-green-900 md:mx-0 md:bg-transparent md:px-0 md:text-5xl">
              Más que solo elote
            </p>
          </div>

          <div className="relative h-full w-full md:ml-[30%] md:w-[70%]">
            {GALLERY.map((photo, i) => (
              <figure
                key={photo.src}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="absolute left-1/2 top-1/2 aspect-[4/5] h-[54vh] max-w-[88vw] overflow-hidden rounded-3xl shadow-soft md:h-[64vh]"
                style={{ display: i <= WINDOW ? "block" : "none" }}
              >
                <picture>
                  <source
                    media="(max-width: 768px)"
                    srcSet={photo.srcSm}
                    width={700}
                    height={875}
                  />
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    width={1100}
                    height={1375}
                    loading={i <= WINDOW ? "eager" : "lazy"}
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
