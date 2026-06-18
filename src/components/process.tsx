const STEPS = [
  {
    n: "01",
    title: "Pides",
    desc: "Por WhatsApp o tu app de delivery. Sin local, sin filas — directo desde tu casa.",
  },
  {
    n: "02",
    title: "Empanizamos",
    desc: "Cada tender se empaniza a mano cuando entra tu pedido. Nada precongelado.",
  },
  {
    n: "03",
    title: "Frito al momento",
    desc: "A la freidora justo antes de salir. Por eso llega crujiendo, no blando.",
  },
  {
    n: "04",
    title: "Lo destapás",
    desc: "Abrís la caja, sube el vapor, y ya. El unboxing es parte del combo.",
  },
];

export function Process() {
  return (
    <section id="proceso" className="bg-ink px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-yellow">
            Cómo funciona una cocina oculta
          </span>
          <h2 className="mt-3 font-display text-[clamp(2.2rem,7vw,4.5rem)] text-bone">
            DEL FUEGO <span className="text-orange">A TU PUERTA</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="border-[3px] border-bone bg-ink p-6 shadow-[6px_6px_0_0_var(--color-orange)]"
            >
              <p className="font-display text-5xl text-yellow">{s.n}</p>
              <h3 className="mt-4 font-display text-2xl text-bone">
                {s.title}
              </h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-bone/70">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
