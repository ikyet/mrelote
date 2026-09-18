"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import { PLANS, PLAN_INCLUDES, WHATSAPP_NUMBER } from "@/lib/content";
import { ScrollReveal } from "@/components/site/scroll-reveal";
import { cn } from "@/lib/utils";

function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <article
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-white shadow-soft",
        plan.featured
          ? "border-2 border-brand-yellow"
          : "border-brand-ink/[0.08]",
      )}
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={plan.image}
          alt={plan.name}
          fill
          className="object-cover"
          style={{ objectPosition: plan.imagePosition }}
          sizes="(min-width: 900px) 33vw, 90vw"
        />
        <span className="absolute left-4 top-4 rounded-full bg-brand-green px-3 py-1.5 font-accent text-xs font-extrabold text-brand-cream">
          {plan.badge}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="font-display text-xl font-extrabold">{plan.name}</h3>
        <p className="font-display text-3xl font-extrabold text-brand-green">
          {plan.price}
        </p>
        <p className="-mt-2 text-xs font-bold uppercase tracking-wide text-brand-ink/70">
          Inversión inicial (MXN)
        </p>
        <p className="text-sm text-brand-ink/70">
          {plan.size} · {plan.modality}
        </p>
        <hr className="my-1 border-dashed border-brand-ink/15" />
        <details className="text-sm">
          <summary className="cursor-pointer font-accent font-extrabold text-brand-ink">
            Qué incluye
          </summary>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-brand-ink/75">
            {PLAN_INCLUDES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </details>
        <span className="mt-1 inline-block w-fit rounded-full bg-brand-green-300/40 px-3 py-1.5 text-xs font-bold text-brand-green-900">
          Regalías: $1,800 MXN mensuales
        </span>
        {plan.note && (
          <p className="text-xs text-brand-ink/50">{plan.note}</p>
        )}
      </div>
    </article>
  );
}

export function Franquicia() {
  const [status, setStatus] = useState<"idle" | "ok">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const nombre = data.get("nombre");
    const telefono = data.get("telefono");
    const correo = data.get("correo");
    const ciudad = data.get("ciudad");
    const modelo = data.get("modelo");
    const mensaje = data.get("mensaje");

    const texto = [
      `Hola, soy ${nombre}.`,
      `Me interesa una franquicia Mr. Elote (${modelo}).`,
      `Ciudad: ${ciudad}.`,
      correo ? `Correo: ${correo}.` : null,
      `Teléfono: ${telefono}.`,
      mensaje ? `Mensaje: ${mensaje}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener",
    );
    setStatus("ok");
    form.reset();
  };

  return (
    <section
      id="franquicia"
      className="bg-white px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <span className="mb-2 block font-accent text-sm font-extrabold tracking-[0.14em] text-brand-green">
            ADQUIERE TU FRANQUICIA
          </span>
          <h2 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
            ¿Listo para tomar la mejor decisión de tu vida?
          </h2>
          <p className="mt-4 max-w-2xl text-brand-ink/75">
            Tres formas de sumarte a la franquicia de eloterías gourmet con
            mayor crecimiento del país. Los tres modelos incluyen manual de
            procedimientos, recetarios, capacitación, asesoría técnica y
            campaña de apertura, con contrato de franquicia por 5 años.
          </p>
        </ScrollReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={`${plan.name}-${plan.price}`} delay={(i + 1) as 1 | 2 | 3}>
              <PlanCard plan={plan} />
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-brand-ink/60">
          ¿No sabes cuál modelo es para ti? Cuéntanos tu ciudad y presupuesto
          abajo — te ayudamos a elegir.
        </p>

        <ScrollReveal className="mt-16">
          <div
            id="lead-form"
            className="grid overflow-hidden rounded-2xl shadow-soft md:grid-cols-[0.9fr_1.1fr]"
          >
            <div className="flex flex-col justify-center gap-4 bg-brand-yellow p-8 text-brand-ink sm:p-11">
              <span className="font-accent text-sm font-extrabold text-brand-green-800">
                Déjanos tus datos
              </span>
              <h3 className="font-display text-3xl font-extrabold uppercase sm:text-4xl">
                Empecemos la conversación
              </h3>
              <p className="text-brand-ink/75">
                Cuéntanos quién eres y en qué ciudad te imaginas tu Mr. Elote.
                Un asesor de franquicias te contacta directo por WhatsApp.
              </p>
              <div className="mt-2 flex items-center gap-2.5 rounded-2xl border border-brand-ink/10 bg-white/50 px-3.5 py-3 text-sm">
                <MessageCircle size={20} className="shrink-0 text-brand-green" />
                Al enviar, se abre WhatsApp con tus datos listos para mandar.
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex min-w-0 flex-col gap-4 bg-white p-8 sm:p-10"
            >
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Nombre completo" htmlFor="f-nombre">
                  <input
                    id="f-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="name"
                    required
                    className="input-field"
                  />
                </Field>
                <Field label="WhatsApp / Teléfono" htmlFor="f-telefono">
                  <input
                    id="f-telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="input-field"
                  />
                </Field>
              </div>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Correo (opcional)" htmlFor="f-correo">
                  <input
                    id="f-correo"
                    name="correo"
                    type="email"
                    autoComplete="email"
                    className="input-field"
                  />
                </Field>
                <Field label="Ciudad de interés" htmlFor="f-ciudad">
                  <input
                    id="f-ciudad"
                    name="ciudad"
                    type="text"
                    required
                    className="input-field"
                  />
                </Field>
              </div>
              <Field label="Modelo de franquicia de interés" htmlFor="f-modelo">
                <select
                  id="f-modelo"
                  name="modelo"
                  required
                  defaultValue=""
                  className="input-field"
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option>Punto Xpress — $138,000 (hazlo tú mismo)</option>
                  <option>Punto Mr. — $168,000 (hazlo tú mismo)</option>
                  <option>Punto Xpress — $440,000 (llave en mano)</option>
                  <option>Aún no estoy seguro</option>
                </select>
              </Field>
              <Field label="Cuéntanos algo más (opcional)" htmlFor="f-mensaje">
                <textarea
                  id="f-mensaje"
                  name="mensaje"
                  rows={3}
                  className="input-field resize-y"
                />
              </Field>

              <button
                type="submit"
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25d366] px-6 py-3.5 font-accent font-extrabold text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle size={20} />
                Enviar por WhatsApp
              </button>
              <p
                role="status"
                className={cn(
                  "min-h-[1.4em] text-sm font-bold",
                  status === "ok" ? "text-brand-green-700" : "text-transparent",
                )}
              >
                ¡Listo! Abrimos WhatsApp con tus datos — solo confirma el
                envío.
              </p>
            </form>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}
