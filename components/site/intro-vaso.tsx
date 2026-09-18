"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/utils";

// Intro animada: el vaso de Mr. Elote se llena de elote mientras bajas. Es un
// video de 8 s generado con IA (Cup_filling_with_corn_animation), convertido a
// 96 frames (12 fps, 1280x720) con el fondo gris corregido a blanco cuadro por
// cuadro. El logo y la frase "it's elote o'clock" ya vienen en el video. Los
// frames se dibujan en un <canvas> según el scroll: si subes, se regresa.
const FRAME_COUNT = 96;
const FRAME_W = 1280;
const FRAME_H = 720;
const frameSrc = (i: number) =>
  asset(`/intro/vaso/frame-${String(i + 1).padStart(3, "0")}.webp`);

// El video ocupa el 92% del scroll de la sección; el resto se queda en el
// último cuadro antes de pasar a la página.
const VIDEO_END = 0.92;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export function IntroVaso() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    let lastDrawn = -1;
    let ticking = false;
    let loaded = 0;

    const draw = (idx: number) => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      // Si ese frame aún no llega, usar el cargado más cercano hacia atrás.
      for (let i = idx; i >= 0; i--) {
        const img = frames[i];
        if (img?.complete && img.naturalWidth) {
          if (i !== lastDrawn) {
            ctx.drawImage(img, 0, 0, FRAME_W, FRAME_H);
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

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.decoding = "async";
      img.src = frameSrc(i);
      img.onload = () => {
        loaded += 1;
        if (i === 0) {
          setReady(true);
          update();
        }
        if (loaded === FRAME_COUNT) update();
      };
      frames.push(img);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section id="inicio" ref={sectionRef} className="relative h-[320vh] bg-white">
      <div className="sticky top-[72px] flex h-[calc(100dvh-72px)] items-center justify-center overflow-hidden bg-white">
        {/* Cuadro del video: siempre completo (ancho de la pantalla en
            celular). No se agranda para recortar lados porque el vaso, el
            logo y la frase se mueven de orilla a orilla y se cortaban. */}
        <div
          className="relative w-screen shrink-0 sm:w-[min(100vw,calc((100dvh-72px)*16/9))]"
          style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        >
          <canvas
            ref={canvasRef}
            width={FRAME_W}
            height={FRAME_H}
            aria-label="Vaso de Mr. Elote llenándose de elote"
            className="absolute inset-0 h-full w-full"
          />
          {!ready && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={frameSrc(0)} alt="" className="absolute inset-0 h-full w-full" />
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
