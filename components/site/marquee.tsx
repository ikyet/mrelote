const ITEMS = [
  "ESQUITES",
  "ELOTES GOURMET",
  "LA FRANQUICIA DE ELOTES MÁS QUERIDA DE MÉXICO",
];

export function Marquee() {
  const line = ITEMS.join("  ·  ") + "  ·  ";
  return (
    <div className="overflow-hidden bg-brand-yellow py-3 text-brand-ink">
      <div className="flex w-max animate-[marquee_22s_linear_infinite] gap-3 whitespace-nowrap font-accent text-sm font-extrabold tracking-wide motion-reduce:animate-none">
        <span>{line.repeat(4)}</span>
      </div>
    </div>
  );
}
