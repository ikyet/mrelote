import Image from "next/image";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { asset } from "@/lib/utils";

const STATS = [
  { year: "2016", label: "Nace la marca en Xalapa, Veracruz" },
  { year: "2018", label: "Inicia operación como franquicia" },
  { year: "2022", label: "Mayor crecimiento del segmento" },
];

export function QuienesSomos() {
  return (
    <section
      id="quienes-somos"
      className="bg-brand-cream px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="mb-2 block font-accent text-sm font-extrabold tracking-[0.14em] text-brand-green">
            QUIÉNES SOMOS
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
            Más que elotes: una franquicia que enamora
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
          <ScrollReveal>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft">
                <Image
                  src={asset("/images/quienes-somos.jpg")}
                  alt="Fachada de una sucursal Mr. Elote"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div className="absolute bottom-4 left-4 rounded-2xl bg-brand-green px-5 py-4 text-brand-cream shadow-soft">
                <b className="block font-display text-2xl font-extrabold text-brand-yellow">
                  +8 años
                </b>
                <span className="text-sm leading-snug">
                  enamorando paladares
                </span>
              </div>
            </div>
          </ScrollReveal>

          <div>
            <ScrollReveal>
              <p className="text-lg leading-relaxed text-brand-ink/85">
                Nacimos en Xalapa en 2016 con una idea simple: llevar el
                esquite y el elote de siempre a otro nivel. Ofrecemos
                productos únicos, colaboraciones con chefs y un concepto
                familiar que nos hacen distintos en este segmento de mercado.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={1}>
              <p className="mt-4 text-lg leading-relaxed text-brand-ink/85">
                Operamos como franquicia desde inicios de 2018 y, para 2022,
                ya éramos la franquicia de eloterías gourmet con mayor
                crecimiento del país. Hoy buscamos socios que quieran
                escribir el siguiente capítulo con nosotros.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="mt-8 grid grid-cols-3 gap-4">
                {STATS.map((s) => (
                  <div key={s.year}>
                    <b className="block font-display text-2xl font-extrabold text-brand-green sm:text-3xl">
                      {s.year}
                    </b>
                    <span className="text-sm text-brand-ink/70">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={3}>
              <div className="mt-8 rounded-2xl bg-brand-green p-6 text-brand-cream">
                <span className="font-accent text-sm font-extrabold tracking-[0.1em] text-brand-yellow">
                  EN PLENA EXPANSIÓN
                </span>
                <p className="mt-3 font-script text-xl font-extrabold italic leading-snug text-brand-yellow">
                  &ldquo;Persistencia aún en la contingencia.&rdquo;
                </p>
                <p className="mt-2 text-sm leading-relaxed text-brand-cream/90">
                  Bajo el liderazgo de nuestro fundador, Jorge Correa,
                  superamos las 30 sucursales y seguimos creciendo con la
                  mira puesta también en el mercado estadounidense.
                </p>
                <cite className="mt-3 block text-xs not-italic text-brand-cream/75">
                  — Jorge Correa, fundador de Mr. Elote Mix Gourmet
                </cite>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal className="mt-16">
          <div className="grid gap-6 rounded-3xl bg-brand-yellow px-7 py-9 text-center sm:grid-cols-[auto_1fr] sm:items-center sm:px-11 sm:text-left">
            <div className="mx-auto h-[110px] w-[110px] shrink-0 overflow-hidden rounded-full border-4 border-white sm:mx-0">
              <Image
                src={asset("/images/esquite.jpg")}
                alt="Esquite Mr. Elote"
                width={110}
                height={110}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <q className="font-script text-xl font-extrabold italic leading-snug text-brand-green-800 sm:text-2xl">
                De la vista, nace el amor. Mostramos el producto de una forma
                que despierta los sentidos y deleita la vista.
              </q>
              <cite className="mt-2.5 block text-sm not-italic text-brand-ink/65">
                — Estrategia de marca, Mr. Elote Mix Gourmet
              </cite>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
