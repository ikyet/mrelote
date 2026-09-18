"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PRODUCTS } from "@/lib/content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { cn } from "@/lib/utils";

const N = PRODUCTS.length;

// Patrón de posiciones en "vaivén" que pidió Luis: la primera mitad de los
// productos va derecha → izquierda y la segunda regresa izquierda → derecha,
// como un péndulo (con 4 productos: derecha, izquierda, izquierda, derecha).
// Cada producto entra deslizándose desde ese lado (con fade) y, al dejar de
// estar activo, se desvanece de vuelta a esa misma posición en vez de
// deslizarse hacia afuera — un fundido discreto, no un rebote.
const POSITION_BY_INDEX = ["right", "left", "left", "right"] as const;
// Cuánto scroll (en vh) le toca a cada producto.
const VH_PER_PRODUCT = 70;
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

export function Experiencia() {
  const [activeIndex, setActiveIndex] = useState(0);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(0);

  // El scroll de la sección se divide en N tramos iguales, uno por producto:
  // decide cuál tarjeta está activa (y con eso su animación de entrada).
  // Antes además dibujaba frames de la animación de la mascota en un
  // <canvas>; ahora cada producto es una foto fija.
  useEffect(() => {
    const visual = visualRef.current;
    if (!visual) return;

    let ticking = false;
    const update = () => {
      const rect = visual.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      const idx = Math.min(N - 1, Math.max(0, Math.floor(progress * N)));
      if (idx !== activeIndexRef.current) {
        activeIndexRef.current = idx;
        setActiveIndex(idx);
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
  }, []);

  return (
    <section id="experiencia" className="bg-brand-cream px-5 py-16 sm:px-8 sm:py-24">
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

        <div
          ref={visualRef}
          className="relative mt-10"
          style={{ height: `${N * VH_PER_PRODUCT}vh` }}
        >
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
                  {/* Tarjeta con marco negro: envuelve el texto y la foto
                      del producto (a petición de Luis). En mobile van
                      apiladas (texto arriba, foto abajo); desde `sm` el
                      texto se pone al lado de la foto para que la tarjeta
                      quede del alto de la foto. */}
                  <div className="flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-brand-paper sm:flex-row sm:items-stretch">
                    <div className="flex w-full max-w-md flex-col justify-center p-5 sm:min-w-0 sm:max-w-none sm:flex-1 sm:p-6">
                      <h3 className="font-display text-4xl font-extrabold uppercase leading-[0.95] text-brand-green-900">
                        {product.name}
                      </h3>
                      <p className="mt-3 max-w-sm text-brand-ink/70">{product.desc}</p>
                    </div>

                    {/* La foto va pegada al marco de la tarjeta (sin margen).
                        En celular es cuadrada para que la tarjeta quepa en
                        pantalla; desde `sm` es vertical 4:5, como la foto. */}
                    <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:aspect-[4/5] sm:h-[46vh] sm:w-auto">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(min-width: 640px) 40vw, 90vw"
                        loading={i < 2 ? "eager" : "lazy"}
                        className="object-cover"
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
