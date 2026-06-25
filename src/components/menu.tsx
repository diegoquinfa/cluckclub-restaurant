import { Image } from "@unpic/react";
import { ShoppingBag } from "lucide-react";
import { WHATSAPP_URL } from "#/constants/W_URL";
import { useCart } from "#/stores/cart";

type MainDish = {
  name: string;
  subtitle?: string;
  ingredients: string[];
  img: string;
  alt: string;
  featured?: boolean;
  price?: number;
};

type PricedPortion = { label: string; price: number };
type PricedItem = { name: string; price?: number };

// Pure helper — kept exported so tests can exercise it directly.
export function formatPrice(price: number): string {
  return `${price}k`;
}

// Reusable price chip. Exported for unit tests; still defined locally
// and used by the Menu render below.
export function PriceChip({ price }: { price: number }) {
  return (
    <span className="mt-3 inline-block border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)]">
      {formatPrice(price)}
    </span>
  );
}

function AgregarButton({
  onClick,
  ariaLabel,
  className,
}: {
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={
        className ??
        "inline-flex items-center justify-center gap-1 border-[3px] border-ink bg-red px-2.5 py-1 font-mono text-[0.7rem] font-bold uppercase tracking-widest text-bone shadow-[2px_2px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
      }
    >
      <ShoppingBag aria-hidden="true" className="size-3" />
      Agregar
    </button>
  );
}

export const MAIN_DISHES: MainDish[] = [
  {
    name: "DoggiCluck",
    img: "/cluck-club-perro-caliente-tenders.png",
    alt: "Perros x 2 con tenders, cheddar y tocineta crunch",
    featured: true,
    price: 23,
    ingredients: [
      "Pan mini perro",
      "Tenders pollo (65 gr)",
      "Salsa cheddar cluck",
      "Salsa cluckiihoney",
      "Tocineta crunch",
      "Cebolla crispy",
      "Cebollín fresco",
    ],
  },
  {
    name: "Big Cluck",
    subtitle: "con papas",
    img: "/cluck-club-hamburguesa-pollo.png",
    alt: "Hamburguesa de churrasco de pollo apanado con queso munster",
    price: 24,
    ingredients: [
      "Churrasco pollo apanado (250 gr)",
      "Salsa Hot club",
      "Lechuga mix",
      "Cebolla crispy",
      "Queso Mounster",
      "Tocineta crunch",
    ],
  },
  {
    name: "Botanita Cluck",
    subtitle: "con papas",
    img: "/cluck-club-hamburguesa-pollo.png",
    alt: "Hamburguesa de pollo apanado con doritos y guacamole",
    price: 26,
    ingredients: [
      "Churrasco pollo apanado (250 gr)",
      "Salsa La del Club",
      "Salsa guacamole",
      "Salsa cheddar cluck",
      "Doritos",
      "Mix lechuga",
    ],
  },
  {
    name: "Cluckii Wrap",
    img: "/cluck-club-burrito-tenders.png",
    alt: "Burrito relleno de tenders, queso mozzarella y cheddar",
    price: 25,
    ingredients: [
      "3 tenders (65 gr c/u)",
      "Queso Mozzarella",
      "Queso Cheddar",
      "Tocineta crunch",
      "Mix lechugas",
      "Salsa cluckiihoney",
    ],
  },
];

export const TENDERS_PORTIONS: PricedPortion[] = [
  { label: "x4", price: 21 },
  { label: "x8", price: 38 },
  { label: "x12", price: 55 },
];

export const WINGS = {
  unitPrice: 2500,
  minimum: 6,
  promo: "cada 6 alitas = 1 salsa gratis",
  quantities: [6, 12, 24, 36],
  flavors: ["Miel picante", "Miel mostaza", "Buffalo", "BBQ Ahumada"],
} as const;

const FRANCESA_INGREDIENTS = [
  "Salsa cluckiihoney",
  "Salsa cheddar cluck",
  "Tocineta",
  "Cebollín fresco",
];

export const ACCOMPANIMENTS: PricedItem[] = [
  { name: "Papas con Tenders", price: 19 },
];

export const ADDITIONAL_SIDES: PricedItem[] = [
  { name: "Papas Francesas" },
  { name: "Aros cebolla" },
  { name: "Papas 120g", price: 4 },
];

export const ADDITIONAL_SAUCES: PricedItem[] = [
  { name: "GuacaCluck", price: 3 },
  { name: "La del Club", price: 3 },
  { name: "Hot club", price: 3 },
  { name: "cluckiihoney", price: 3 },
  { name: "cheddar cluck", price: 3 },
];

export const DRINKS: PricedItem[] = [
  { name: "Agua", price: 3 },
  { name: "Coca Cola 250", price: 3 },
  { name: "Coca Cola Zero 250", price: 3 },
  { name: "Manzana 250", price: 3 },
  { name: "Pepsi 250", price: 3 },
  { name: "Colombiana 250", price: 3 },
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
                  {dish.subtitle && (
                    <p className="mt-1 font-sans text-sm font-medium uppercase tracking-wide text-ink/70">
                      {dish.subtitle}
                    </p>
                  )}
                  {dish.price !== undefined && <PriceChip price={dish.price} />}
                  {dish.price !== undefined && (
                    <button
                      type="button"
                      onClick={() =>
                        useCart.getState().addItem({
                          kind: "main",
                          id: dish.name,
                          name: dish.name,
                          price: dish.price as number,
                          qty: 1,
                        })
                      }
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 border-[3px] border-ink bg-red px-3 py-2 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                    >
                      <ShoppingBag aria-hidden="true" className="size-4" />
                      Agregar
                    </button>
                  )}
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
                  Crispy tenders
                </h4>
                <p className="mt-2 font-sans text-sm text-ink/80">
                  Tenders de pollo 65 gr c/u, empanizados a mano.
                </p>
                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Porciones
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {TENDERS_PORTIONS.map((p) =>
                    p.price !== undefined ? (
                      <div
                        key={p.label}
                        className="flex items-center gap-2 border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)]"
                      >
                        <span>
                          Tenders {p.label} · {formatPrice(p.price)}
                        </span>
                        <AgregarButton
                          ariaLabel={`Agregar Tenders ${p.label}`}
                          onClick={() =>
                            useCart.getState().addItem({
                              kind: "tenders",
                              id: p.label,
                              label: p.label,
                              price: p.price as number,
                              qty: 1,
                            })
                          }
                        />
                      </div>
                    ) : null,
                  )}
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
                  Cluck wings
                </h4>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)]">
                    {WINGS.unitPrice}/unidad
                  </span>
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
                    Mínimo {WINGS.minimum}
                  </span>
                </div>

                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Porciones
                </span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {WINGS.quantities.map((qty) => (
                    <div
                      key={qty}
                      className="border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                    >
                      x{qty} · {formatPrice((qty * WINGS.unitPrice) / 1000)}
                    </div>
                  ))}
                </div>

                <p className="mt-3 inline-block border-[3px] border-ink bg-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[3px_3px_0_0_var(--color-ink)]">
                  {WINGS.promo}
                </p>

                <span className="mt-4 font-mono text-xs font-bold uppercase tracking-widest text-red">
                  Elige sabor y agrega
                </span>
                <div className="mt-2 flex flex-col gap-3">
                  {WINGS.quantities.map((qty) => (
                    <div key={qty} className="flex flex-col gap-2">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
                        x{qty}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {WINGS.flavors.map((flavor) => (
                          <button
                            key={flavor}
                            type="button"
                            onClick={() =>
                              useCart.getState().addItem({
                                kind: "wings",
                                id: `${qty}-${flavor}`,
                                qty,
                                flavor,
                                unitPrice: WINGS.unitPrice,
                              })
                            }
                            aria-label={`Agregar ${qty} alitas ${flavor}`}
                            className="inline-flex items-center gap-2 border-[3px] border-ink bg-cream px-3 py-1 font-sans text-sm font-medium text-ink shadow-[2px_2px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                          >
                            <span>{flavor}</span>
                            <span className="inline-flex items-center justify-center gap-1 border-[2px] border-ink bg-red px-1.5 py-0.5 font-mono text-[0.65rem] font-bold uppercase tracking-widest text-bone">
                              <ShoppingBag
                                aria-hidden="true"
                                className="size-3"
                              />
                              Agregar
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
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
                  Cluck Fries
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
                  {ADDITIONAL_SIDES.map((s) =>
                    s.price !== undefined ? (
                      <div
                        key={s.name}
                        className="inline-flex items-center gap-2 border-[3px] border-ink bg-yellow px-3 py-1 font-sans text-sm font-medium text-ink shadow-[3px_3px_0_0_var(--color-ink)]"
                      >
                        <span>
                          {s.name} ·{" "}
                          <span className="font-mono text-xs font-bold">
                            {formatPrice(s.price)}
                          </span>
                        </span>
                        <AgregarButton
                          ariaLabel={`Agregar ${s.name}`}
                          onClick={() =>
                            useCart.getState().addItem({
                              kind: "combo",
                              id: s.name,
                              name: s.name,
                              price: s.price as number,
                              qty: 1,
                            })
                          }
                        />
                      </div>
                    ) : null,
                  )}
                </div>
              </article>
              <article className="border-[3px] border-ink bg-bone p-5 shadow-[6px_6px_0_0_var(--color-ink)]">
                <h4 className="font-display text-2xl leading-tight text-ink">
                  Salsas extra
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {ADDITIONAL_SAUCES.map((s) =>
                    s.price !== undefined ? (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-2 border-[3px] border-ink bg-cream px-3 py-1 font-sans text-sm font-medium text-ink"
                      >
                        <span>
                          {s.name} ·{" "}
                          <span className="font-mono text-xs font-bold">
                            {formatPrice(s.price)}
                          </span>
                        </span>
                        <AgregarButton
                          ariaLabel={`Agregar ${s.name}`}
                          onClick={() =>
                            useCart.getState().addItem({
                              kind: "sauce",
                              id: s.name,
                              name: s.name,
                              price: s.price as number,
                              qty: 1,
                            })
                          }
                        />
                      </span>
                    ) : null,
                  )}
                </div>
              </article>
            </div>
          </div>

          {/* Papas con Tenders combo — new combo under Acompañamientos */}
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {ACCOMPANIMENTS.map((item) => (
              <article
                key={item.name}
                className="flex flex-col border-[3px] border-ink bg-yellow shadow-[6px_6px_0_0_var(--color-ink)]"
              >
                <div className="border-b-[3px] border-ink bg-cream p-4">
                  <Image
                    src="/placeholder.svg"
                    alt={item.name}
                    width={400}
                    height={300}
                    className="mx-auto h-40 w-auto object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h4 className="font-display text-2xl leading-tight text-ink">
                    {item.name}
                  </h4>
                  {item.price !== undefined && <PriceChip price={item.price} />}
                  {item.price !== undefined && (
                    <AgregarButton
                      className="mt-3 inline-flex w-fit items-center justify-center gap-2 border-[3px] border-ink bg-red px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
                      ariaLabel={`Agregar ${item.name}`}
                      onClick={() =>
                        useCart.getState().addItem({
                          kind: "combo",
                          id: item.name,
                          name: item.name,
                          price: item.price as number,
                          qty: 1,
                        })
                      }
                    />
                  )}
                  <p className="mt-3 font-sans text-sm text-ink/80">
                    Combo de papas y tenders, ideal para compartir o disfrutar
                    solo.
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 04 — Bebidas */}
        <div>
          <SectionLabel index="04" title="Bebidas" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {DRINKS.map((drink) =>
              drink.price !== undefined ? (
                <div
                  key={drink.name}
                  className="flex flex-col items-center justify-center gap-2 border-[3px] border-ink bg-bone px-3 py-6 text-center font-mono text-sm font-bold uppercase tracking-wide text-ink shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
                >
                  <span>{drink.name}</span>
                  <span className="border-[2px] border-ink bg-yellow px-2 py-0.5 font-mono text-xs text-ink shadow-[2px_2px_0_0_var(--color-ink)]">
                    {formatPrice(drink.price)}
                  </span>
                  <AgregarButton
                    ariaLabel={`Agregar ${drink.name}`}
                    onClick={() =>
                      useCart.getState().addItem({
                        kind: "drink",
                        id: drink.name,
                        name: drink.name,
                        price: drink.price as number,
                        qty: 1,
                      })
                    }
                  />
                </div>
              ) : null,
            )}
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
