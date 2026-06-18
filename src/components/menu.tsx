import { Image } from "@unpic/react";
import { WHATSAPP_URL } from "#/constants/W_URL";

type MainDish = {
  name: string;
  ingredients: string[];
  img: string;
  alt: string;
  featured?: boolean;
};

const MAIN_DISHES: MainDish[] = [
  {
    name: "Perro Caliente",
    img: "/cluck-club-perro-caliente-tenders.png",
    alt: "Perro caliente con tenders, cheddar y tocineta crunch",
    featured: true,
    ingredients: [
      "Pan mini perro",
      "Tenders pollo (65 gr)",
      "Salsa Cheddar",
      "Salsa Cluck",
      "Tocineta crunch",
      "Cebolla crispy",
      "Cebollín fresco",
    ],
  },
  {
    name: "Hamburguesa 1",
    img: "/cluck-club-hamburguesa-pollo.png",
    alt: "Hamburguesa de churrasco de pollo apanado con queso munster",
    ingredients: [
      "Churrasco pollo apanado (250 gr)",
      "Salsa Big Cluck",
      "Lechuga mix",
      "Cebolla crispy",
      "Queso Mounster",
      "Tocineta crunch",
    ],
  },
  {
    name: "Hamburguesa 2",
    img: "/cluck-club-hamburguesa-pollo.png",
    alt: "Hamburguesa de pollo apanado con doritos y guacamole",
    ingredients: [
      "Churrasco pollo apanado (250 gr)",
      "Salsa Queso crema y ajo",
      "Salsa guacamole",
      "Salsa Queso Cheddar",
      "Doritos",
      "Mix lechuga",
    ],
  },
  {
    name: "Burrito",
    img: "/cluck-club-burrito-tenders.png",
    alt: "Burrito relleno de tenders, queso mozzarella y cheddar",
    ingredients: [
      "3 tenders (65 gr c/u)",
      "Queso Mozzarella",
      "Queso Cheddar",
      "Tocineta crunch",
      "Mix lechugas",
      "Salsa Cluck",
    ],
  },
];

const TENDERS_PORTIONS = ["x4", "x8", "x12", "x16", "x24"];
const WINGS_PORTIONS = ["x6", "x12", "x24", "x48"];
const WINGS_FLAVORS = [
  "Miel picante",
  "Miel mostaza",
  "Buffalo",
  "BBQ Ahumada",
];

const FRANCESA_INGREDIENTS = [
  "Salsa Cluck",
  "Salsa Cheddar",
  "Tocineta",
  "Cebollín fresco",
];
const ADDITIONAL_SIDES = ["Papas Francesas", "Aros cebolla"];
const ADDITIONAL_SAUCES = [
  "Guacamole",
  "Queso crema y ajo",
  "Big Cluck",
  "Cluck",
  "Cheddar",
];
const DRINKS = [
  "Agua",
  "Coca Cola 250",
  "Coca Cola Zero 250",
  "Manzana 250",
  "Pepsi 250",
  "Colombiana 250",
];

function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-end gap-4 border-b-[3px] border-ink pb-3">
      <span className="font-mono text-sm font-bold text-red">{index}</span>
      <h3 className="font-display text-[clamp(1.75rem,5vw,3rem)] leading-none text-ink">
        {title}
      </h3>
    </div>
  );
}

export function Menu() {
  return (
    <section id="menu" className="bg-cream px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-red">
            La carta
          </span>
          <h2 className="mt-3 font-display text-ink">
            <span className="block text-[clamp(2.5rem,8vw,5rem)]">PIDES.</span>
            <span className="block text-outline text-[clamp(2.5rem,8vw,5rem)]">
              CRUNCH.
            </span>
            <span className="block text-[clamp(2.5rem,8vw,5rem)] text-red">
              REPITES.
            </span>
          </h2>
        </div>

        {/* 01 — Platos Fuertes */}
        <div className="mb-16">
          <SectionLabel index="01" title="Platos Fuertes" />
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {MAIN_DISHES.map((dish) => (
              <article
                key={dish.name}
                className={`relative flex flex-col border-[3px] border-ink shadow-[6px_6px_0_0_var(--color-ink)] ${
                  dish.featured ? "bg-yellow" : "bg-bone"
                }`}
              >
                {dish.featured && (
                  <span className="absolute -top-4 left-5 z-10 -rotate-3 border-[3px] border-ink bg-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[3px_3px_0_0_var(--color-ink)]">
                    Más pedido
                  </span>
                )}
                <div className="border-b-[3px] border-ink bg-cream p-4">
                  <Image
                    src={dish.img || "/placeholder.svg"}
                    alt={dish.alt}
                    width={400}
                    height={300}
                    className="mx-auto h-40 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="font-display text-2xl leading-tight text-ink">
                    {dish.name}
                  </h4>
                  <ul className="mt-3 flex-1 space-y-1">
                    {dish.ingredients.map((ing) => (
                      <li
                        key={ing}
                        className="flex gap-2 font-sans text-sm leading-snug text-ink/80"
                      >
                        <span className="text-red">/</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 02 — Pollo & Alitas */}
        <div className="mb-16">
          <SectionLabel index="02" title="Pollo & Alitas" />
          <div className="grid gap-8 md:grid-cols-2">
            {/* Tenders */}
            <article className="flex flex-col border-[3px] border-ink bg-bone shadow-[6px_6px_0_0_var(--color-ink)]">
              <div className="border-b-[3px] border-ink bg-cream p-4">
                <Image
                  src="/cluck-club-tenders-pollo.png"
                  alt="Tenders de pollo crujientes"
                  width={400}
                  height={300}
                  className="mx-auto h-40 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  Tenders
                </h4>
                <p className="mt-2 font-sans text-sm text-ink/80">
                  Tenders de pollo 65 gr c/u, empanizados a mano.
                </p>
                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Porciones
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TENDERS_PORTIONS.map((p) => (
                    <div
                      key={p}
                      className="border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            {/* Alitas */}
            <article className="flex flex-col border-[3px] border-ink bg-bone shadow-[6px_6px_0_0_var(--color-ink)]">
              <div className="border-b-[3px] border-ink bg-cream p-4">
                <Image
                  src="/cluck-club-alitas-pollo.png"
                  alt="Alitas de pollo glaseadas"
                  width={400}
                  height={300}
                  className="mx-auto h-40 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  Alitas
                </h4>
                <span className="mt-3 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Porciones
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {WINGS_PORTIONS.map((p) => (
                    <div
                      key={p}
                      className="border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      {p}
                    </div>
                  ))}
                </div>
                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Sabores
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {WINGS_FLAVORS.map((f) => (
                    <span
                      key={f}
                      className="border-[3px] border-ink bg-cream px-3 py-1 font-sans text-sm font-medium text-ink"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* 03 — Acompañamientos */}
        <div className="mb-16">
          <SectionLabel index="03" title="Acompañamientos" />
          <div className="grid gap-8 md:grid-cols-2">
            {/* Francesa */}
            <article className="flex flex-col border-[3px] border-ink bg-bone shadow-[6px_6px_0_0_var(--color-ink)]">
              <div className="border-b-[3px] border-ink bg-cream p-4">
                <Image
                  src="/cluck-club-papas-francesas.png"
                  alt="Papas francesas con salsa cluck y cheddar"
                  width={400}
                  height={300}
                  className="mx-auto h-40 w-auto object-contain"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  La Francesa
                </h4>
                <ul className="mt-3 flex-1 space-y-1">
                  {FRANCESA_INGREDIENTS.map((ing) => (
                    <li
                      key={ing}
                      className="flex gap-2 font-sans text-sm leading-snug text-ink/80"
                    >
                      <span className="text-red">/</span>
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            {/* Extras + Salsas */}
            <div className="flex flex-col gap-8">
              <article className="border-[3px] border-ink bg-bone p-5 shadow-[6px_6px_0_0_var(--color-ink)]">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  Chips de papa
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ADDITIONAL_SIDES.map((s) => (
                    <div
                      key={s}
                      className="border-[3px] border-ink bg-yellow px-3 py-1 font-sans text-sm font-medium text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </article>
              <article className="border-[3px] border-ink bg-bone p-5 shadow-[6px_6px_0_0_var(--color-ink)]">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  Salsas extra
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ADDITIONAL_SAUCES.map((s) => (
                    <span
                      key={s}
                      className="border-[3px] border-ink bg-cream px-3 py-1 font-sans text-sm font-medium text-ink"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* 04 — Bebidas */}
        <div>
          <SectionLabel index="04" title="Bebidas" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {DRINKS.map((drink) => (
              <div
                key={drink}
                className="flex items-center justify-center border-[3px] border-ink bg-bone px-3 py-6 text-center font-mono text-sm font-bold uppercase tracking-wide text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
              >
                {drink}
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-14 flex justify-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-[3px] border-ink bg-red px-8 py-4 font-mono text-sm font-bold uppercase tracking-widest text-bone shadow-[6px_6px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
