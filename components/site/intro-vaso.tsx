"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { asset } from "@/lib/utils";

// Intro animada: el vaso de Mr. Elote se llena de elote mientras bajas. Es un
// video de 8 s a 24 fps generado con IA (Cup_filling_with_corn_animation),
// convertido a sus 192 frames con el fondo gris corregido a blanco cuadro por
// cuadro. El logo y la frase "it's elote o'clock" ya vienen en el video. Los
// frames se dibujan en un <canvas> según el scroll: si subes, se regresa.
//
// Dos juegos de frames: HD (1920x1080, escalado desde el original de 720p con
// lanczos + nitidez) para pantallas grandes, y SD (1280x720, el tamaño
// original) para celular, donde el 1080 no se nota y solo pesaría más.
const FRAME_COUNT = 192;
const SETS = {
  hd: { dir: "vaso-hd", w: 1920, h: 1080 },
  sd: { dir: "vaso-sd", w: 1280, h: 720 },
} as const;
type SetKey = keyof typeof SETS;
const frameSrc = (set: SetKey, i: number) =>
  asset(`/intro/${SETS[set].dir}/frame-${String(i + 1).padStart(3, "0")}.webp`);

// El video ocupa el 92% del scroll de la sección; el resto se queda en el
// último cuadro antes de pasar a la página.
const VIDEO_END = 0.92;

// Orden de carga: primero 1 de cada 4 frames (para poder bajar casi de
// inmediato) y luego se rellenan los demás.
const LOAD_ORDER = (() => {
  const order: number[] = [];
  for (const step of [4, 2, 1]) {
    for (let i = 0; i < FRAME_COUNT; i += step) {
      if (!order.includes(i)) order.push(i);
    }
  }
  return order;
})();

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

// Pantalla grande (HD) o celular (SD). En el servidor se asume celular.
const WIDE_QUERY = "(min-width: 768px)";
const subscribeWide = (cb: () => void) => {
  const m = window.matchMedia(WIDE_QUERY);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const getWide = () => window.matchMedia(WIDE_QUERY).matches;
const getWideServer = () => false;

export function IntroVaso() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const wide = useSyncExternalStore(subscribeWide, getWide, getWideServer);
  const set: SetKey = wide ? "hd" : "sd";
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { w, h } = SETS[set];
    const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
    let lastDrawn = -1;
    let ticking = false;
    let cancelled = false;

    const isLoaded = (i: number) => {
      const img = frames[i];
      return !!img && img.complete && img.naturalWidth > 0;
    };

    const draw = (idx: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      // Si ese frame aún no llega, usar el cargado más cercano.
      for (let d = 0; d < FRAME_COUNT; d++) {
        for (const i of [idx - d, idx + d]) {
          if (i < 0 || i >= FRAME_COUNT || !isLoaded(i)) continue;
          if (i !== lastDrawn) {
            ctx.drawImage(frames[i]!, 0, 0, w, h);
            lastDrawn = i;
          }
          return;
        }
      }
    };

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;
      draw(Math.round(clamp01(p / VIDEO_END) * (FRAME_COUNT - 1)));
      if (hintRef.current) {
        hintRef.current.style.opacity = String(1 - clamp01(p / 0.06));
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

    // Carga por etapas, de 6 en 6 para no saturar la conexión.
    let next = 0;
    const loadNext = () => {
      if (cancelled || next >= LOAD_ORDER.length) return;
      const i = LOAD_ORDER[next++];
      const img = new Image();
      img.decoding = "async";
      img.onload = img.onerror = () => {
        if (cancelled) return;
        if (i === 0) setReady(true);
        lastDrawn = -1;
        update();
        loadNext();
      };
      img.src = frameSrc(set, i);
      frames[i] = img;
    };
    for (let k = 0; k < 6; k++) loadNext();

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [set]);

  const { w, h } = SETS[set];

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[320vh] bg-white">
      <div className="sticky top-[72px] flex h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-white">
        {/* Cuadro del video: siempre completo (ancho de la pantalla en
            celular). No se agranda para recortar lados porque el vaso, el
            logo y la frase se mueven de orilla a orilla y se cortaban. */}
        <div
          className="relative w-screen shrink-0 sm:w-[min(100vw,calc((100dvh-72px)*16/9))]"
          style={{ aspectRatio: "16 / 9" }}
        >
          <canvas
            key={set}
            ref={canvasRef}
            width={w}
            height={h}
            aria-label="Vaso de Mr. Elote llenándose de elote"
            className="absolute inset-0 h-full w-full"
          />
          {!ready && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={frameSrc(set, 0)} alt="" className="absolute inset-0 h-full w-full" />
          )}
        </div>

        <div
          ref={hintRef}
          className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 font-accent text-sm font-bold text-brand-green-700"
        >
          Desliza para descubrir ↓
        </div>
      </div>
    </section>
  );
}
