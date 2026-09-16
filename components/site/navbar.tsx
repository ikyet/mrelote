"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/content";
import { useActiveSection } from "@/hooks/use-active-section";
import { asset, cn } from "@/lib/utils";

const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  // Al entrar al sitio (todavía en el Hero) la barra se ve "limpia": solo el
  // logo de la marca, sin links/botón/burger — igual que pidió Luis. El resto
  // aparece con fade recién cuando el usuario ya bajó más de 40px (el mismo
  // umbral que le pone el fondo oscuro a la barra), es decir, después de que
  // termina la animación del Hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[120] flex items-center justify-between px-5 py-4 transition-[background-color,padding] duration-300 sm:px-8",
          scrolled ? "bg-brand-ink/95 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <a
          href="#inicio"
          className="flex items-center gap-2.5 text-brand-cream"
          onClick={close}
        >
          <Image
            src={asset("/images/logo-a.png")}
            alt="Mr. Elote Mix Gourmet"
            width={671}
            height={191}
            priority
            className="h-10 w-auto"
          />
        </a>

        <div
          className={cn(
            "hidden items-center gap-7 transition-opacity duration-300 md:flex",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                "text-sm font-semibold text-brand-cream/80 transition-colors hover:text-brand-yellow",
                active === link.id && "text-brand-yellow",
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#lead-form"
          className={cn(
            "hidden rounded-full bg-brand-yellow px-5 py-2.5 text-sm font-bold text-brand-ink transition-[opacity,transform] duration-300 hover:-translate-y-0.5 md:inline-flex",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          Quiero mi franquicia
        </a>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "z-[110] flex h-10 w-10 items-center justify-center rounded-full text-brand-cream transition-opacity duration-300 md:hidden",
            scrolled ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={cn(
          "fixed inset-0 z-[90] flex flex-col items-center justify-center gap-7 bg-brand-ink transition-transform duration-400 ease-[cubic-bezier(.2,.8,.2,1)] md:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={close}
            className="font-display text-3xl tracking-wide text-brand-cream"
          >
            {link.label === "Conoce más" ? (
              <>
                Conoce <b className="text-brand-yellow">más</b>
              </>
            ) : link.label === "Quiénes somos" ? (
              <>
                Quiénes <b className="text-brand-yellow">somos</b>
              </>
            ) : (
              link.label
            )}
          </a>
        ))}
        <a
          href="#lead-form"
          onClick={close}
          className="mt-4 rounded-full bg-brand-yellow px-8 py-3.5 text-lg font-bold text-brand-ink"
        >
          Quiero mi franquicia
        </a>
      </div>
    </>
  );
}
