"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { asset, cn } from "@/lib/utils";

const N = PRODUCTS.length;

// Patrón de posiciones en "vaivén" que pidió Luis: los primeros 3 productos
// entran derecha → centro → izquierda, y los últimos 3 regresan en reversa
// izquierda → centro → derecha — como un péndulo a lo largo de los 6
// productos. Cada producto entra deslizándose desde ese lado (con fade) y,
// al dejar de estar activo, se desvanece de vuelta a esa misma posición en
// vez de deslizarse hacia afuera — un fundido discreto, no un rebote.
const POSITION_BY_INDEX = [
  "right",
  "center",
  "left",
  "left",
  "center",
  "right",
] as const;
type Position = (typeof POSITION_BY_INDEX)[number];

function alignClasses(pos: Position) {
  switch (pos) {
    case "right":
      return "items-end text-right";
    case "left":
      return "items-start text-left";
    default:
      return "items-center text-center";
  }
}

function enterOffsetClasses(pos: Position) {
  switch (pos) {
    case "right":
      return "translate-x-16 sm:translate-x-24";
    case "left":
      return "-translate-x-16 sm:-translate-x-24";
    default:
      return "translate-y-10";
  }
}

// Color de fondo real de los frame-NNN.webp (el fondo detrás de la mascota
// en los videos de producto, no es blanco puro). En vez de difuminar la
// base del video hacia transparente, la sección entera usa este mismo
// color de fondo — así el borde del video se pierde contra la página
// porque son literalmente el mismo color, sin necesidad de fundido.
const FRAME_BG = "#eff0f5";

export function Experiencia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [framesLoaded, setFramesLoaded] = useState(false);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  // framesRef.current[i] = imágenes ya precargadas del producto i (una por
  // frame-NNN.webp). Se llenan una sola vez, cuando el usuario se acerca a
  // esta sección.
  const framesRef = useRef<HTMLImageElement[][]>([]);
  const activeIndexRef = useRef(0);

  // Precarga las imágenes solo cuando el usuario se acerca a esta sección
  // (evita bajar ~10 MB de frames de golpe al abrir la página) — antes
  // hacíamos lo mismo con los <video>, ahora precargamos cada frame-NNN.webp
  // como un objeto Image().
  useEffect(() => {
    const target = visualRef.current;
    if (!target || !("IntersectionObserver" in window)) {
      setFramesLoaded(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();

        const total = PRODUCTS.reduce((sum, p) => sum + p.frames.count, 0);
        let loaded = 0;
        const markLoaded = () => {
          loaded += 1;
          if (loaded === total) setFramesLoaded(true);
        };

        PRODUCTS.forEach((product, i) => {
          const imgs: HTMLImageElement[] = [];
          for (let f = 1; f <= product.frames.count; f++) {
            const img = new window.Image();
            const num = String(f).padStart(3, "0");
            img.src = `${product.frames.base}/frame-${num}.webp`;
            img.onload = markLoaded;
            img.onerror = markLoaded;
            imgs.push(img);
          }
          framesRef.current[i] = imgs;
        });
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  // Un solo cálculo de scroll maneja dos cosas a la vez: (1) qué producto
  // está activo (para su bloque de texto+video y su animación de entrada) y
  // (2) qué frame de esa animación toca dibujar en su <canvas> —
  // "scroll-scrubbing" con una secuencia de imágenes en vez de un <video>
  // buscando por currentTime (misma técnica que el proyecto de referencia de
  // Nescafé). El scroll total de la sección se divide en N tramos iguales,
  // uno por producto. Aplica igual en mobile y desktop (ya no hay una
  // versión distinta por breakpoint).
  useEffect(() => {
    if (!framesLoaded) return;
    const visual = visualRef.current;
    if (!visual) return;

    let ticking = false;
    const update = () => {
      const rect = visual.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const segment = progress * N;
      const idx = Math.min(N - 1, Math.max(0, Math.floor(segment)));
      const local = Math.min(1, Math.max(0, segment - idx));

      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
      }

      const imgs = framesRef.current[idx];
      const canvas = canvasRefs.current[idx];
      if (!imgs || !imgs.length || !canvas) return;
      const frameIdx = Math.min(imgs.length - 1, Math.round(local * (imgs.length - 1)));
      const img = imgs[frameIdx];
      if (img && img.complete && img.naturalWidth) {
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    update();
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [framesLoaded]);

  return (
    <section id="experiencia" className="px-5 py-16 sm:px-8 sm:py-24" style={{ backgroundColor: FRAME_BG }}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="mb-2 block font-accent text-sm font-extrabold tracking-[0.14em] text-brand-yellow-600">
            LA EXPERIENCIA MR. ELOTE
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase text-brand-green-900 sm:text-4xl">
            Algunos productos...
          </h2>
          <p className="mt-4 max-w-2xl text-brand-ink/70">
            Nuestro producto está pensado para despertar los sentidos antes
            del primer bocado. Así viste Mr. Elote su producto según el
            antojo del día — desliza y descubre algunos de ellos.
          </p>
        </ScrollReveal>

        <div ref={visualRef} className="relative mt-10 h-[420vh]">
          <div className="sticky top-24 h-[78vh] max-h-[720px] min-h-[520px] overflow-hidden">
            {PRODUCTS.map((product, i) => {
              const pos = POSITION_BY_INDEX[i];
              const isActive = i === activeIndex;
              return (
                <div
                  key={product.n}
                  className={cn(
                    "absolute inset-0 flex flex-col justify-center px-2 transition-[opacity,transform] duration-500 ease-out sm:px-4",
                    alignClasses(pos),
                    isActive
                      ? "translate-x-0 translate-y-0 opacity-100"
                      : cn("pointer-events-none opacity-0", enterOffsetClasses(pos)),
                  )}
                >
                  {/* Tarjeta con marco negro: envuelve el texto y la escena
                      del producto (a petición de Luis) — su tamaño lo da el
                      contenido (texto + escena), sin ancho/alto fijo aparte
                      de eso, y su fondo es el color real de ese producto
                      (product.bg en content.ts), no un color único para
                      los 6. En mobile van apiladas (texto arriba, escena
                      abajo); desde `sm` el texto se pone al lado de la
                      escena para que la tarjeta quede del alto de la escena
                      en vez de más alta por el texto encima. */}
                  <div
                    className="flex flex-col overflow-hidden rounded-2xl border-4 border-black sm:flex-row sm:items-stretch"
                    style={{ backgroundColor: product.bg }}
                  >
                    <div className="flex w-full max-w-md flex-col justify-center p-5 sm:min-w-0 sm:max-w-none sm:flex-1 sm:p-6">
                      <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-brand-green-900">
                        {product.name}
                      </h3>
                      <p className="mt-3 max-w-sm text-brand-ink/70">{product.desc}</p>
                    </div>

                    {/* La escena va pegada al marco de la tarjeta y con la
                        proporción exacta del video, así el borde de la
                        animación ES el borde de la tarjeta (sin margen ni
                        franjas de color a los lados). */}
                    <div
                      className="relative w-full shrink-0 overflow-hidden sm:h-[46vh] sm:w-auto"
                      style={{ aspectRatio: `${product.frames.w} / ${product.frames.h}` }}
                    >
                      {!framesLoaded && (
                        <Image
                          src={asset("/images/mascot.jpg")}
                          alt="Mr. Elote, la mascota de la marca"
                          fill
                          className="object-contain"
                          sizes="80vw"
                        />
                      )}
                      <canvas
                        ref={(el) => {
                          canvasRefs.current[i] = el;
                        }}
                        width={product.frames.w}
                        height={product.frames.h}
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
