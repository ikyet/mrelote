import { WHATSAPP_NUMBER } from "@/lib/content";

export function Footer() {
  return (
    <footer className="bg-brand-ink text-brand-cream/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:pb-7 sm:pt-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <a href="#inicio" className="flex items-center gap-2.5 text-brand-cream">
            <svg className="h-9 w-9 fill-brand-yellow" viewBox="0 0 64 64" aria-hidden="true">
              <rect x="2" y="2" width="60" height="60" rx="22" />
              <path
                d="M16 32c4 9 12 15 16 15s12-6 16-15"
                stroke="#140b08"
                strokeWidth={6}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="font-display text-lg tracking-wide">
              mr. <b className="text-brand-yellow">élote</b>
            </span>
          </a>
          <p className="mt-3.5 max-w-[36ch] text-sm leading-relaxed">
            Esquites y elotes gourmet con personalidad, nacidos en Xalapa en
            2016 — hoy, franquicia en crecimiento en todo México.
          </p>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-brand-cream">Explora</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a href="#quienes-somos" className="hover:text-brand-yellow">
              Quiénes somos
            </a>
            <a href="#experiencia" className="hover:text-brand-yellow">
              Conoce más
            </a>
            <a href="#franquicia" className="hover:text-brand-yellow">
              Adquiere tu franquicia
            </a>
          </div>
        </div>
        <div>
          <h4 className="mb-3 font-bold text-brand-cream">Contacto</h4>
          <div className="flex flex-col gap-2 text-sm">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener"
              className="hover:text-brand-yellow"
            >
              WhatsApp de franquicias
            </a>
            <a href="#lead-form" className="hover:text-brand-yellow">
              Dejar mis datos
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-white/10 px-5 py-6 text-xs sm:flex-row sm:justify-between sm:px-8">
        <span>© {new Date().getFullYear()} Mr. Elote Mix Gourmet. Todos los derechos reservados.</span>
        <span>Franquicia de eloterías gourmet — Xalapa, México.</span>
      </div>
    </footer>
  );
}
