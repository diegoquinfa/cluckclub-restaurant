const ZONES = [
  "Centro Histórico",
  "Getsemaní",
  "Bocagrande",
  "Castillogrande",
  "Manga",
  "Pie de la Popa",
  "Crespo",
  "Marbella",
];

export function Zones() {
  return (
    <section id="zonas" className="bg-yellow px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red">
            Zonas de entrega · Cartagena
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,7vw,4.5rem)] leading-none text-ink">
            SI ESTÁS ACÁ,
            <br />
            <span className="text-red">YA CASI PRUEBAS</span>
          </h2>
          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink/80">
            Operamos como cocina oculta — no nos buscás en un local, te buscamos
            nosotros. Estas son las zonas donde llegamos crujiendo.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {ZONES.map((z, i) => (
            <span
              key={z}
              style={{ "--rot": `${(i % 3) - 1}deg` } as React.CSSProperties}
              className="rotate-[var(--rot)] border-[3px] border-ink bg-bone px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--color-orange)]"
            >
              {z}
            </span>
          ))}
          <span className="border-[3px] border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[3px_3px_0_0_var(--color-red)]">
            ¿No estás? Escribinos
          </span>
        </div>
      </div>
    </section>
  );
}
