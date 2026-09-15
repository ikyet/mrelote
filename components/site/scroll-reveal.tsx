"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  as?: "div" | "article" | "figure";
}

const DELAY_CLASS: Record<number, string> = {
  1: "delay-[100ms]",
  2: "delay-[220ms]",
  3: "delay-[340ms]",
  4: "delay-[460ms]",
};

/** Fades + slides an element in the first time it enters the viewport.
 * Mirrors the original site's [data-reveal] IntersectionObserver behavior. */
export function ScrollReveal({
  children,
  delay,
  className,
  as = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Comp = as as "div";

  return (
    <Comp
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-[cubic-bezier(.2,.8,.2,1)]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        delay ? DELAY_CLASS[delay] : undefined,
        className,
      )}
    >
      {children}
    </Comp>
  );
}
