import { Link } from "@tanstack/react-router";
import { Image } from "@unpic/react";
import { WHATSAPP_URL } from "#/constants/W_URL";
import TextMarquee from "./text-marquee";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b-[5px] border-ink bg-yellow"
    >
      {/* big background word */}
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-1/2 -z-0 -translate-y-1/2 select-none font-display text-[28vw] leading-none text-white/20 md:text-[20vw]"
      >
        CRUNCH
      </p>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 md:grid-cols-2 md:px-6 md:py-20">
        {/* copy */}
        <div>
          <span className="inline-block border-[3px] border-ink bg-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[3px_3px_0_0_var(--color-ink)]">
            Cocina oculta · Cartagena
          </span>

          <h1 className="mt-5 font-display text-ink">
            <span className="block text-[clamp(2.5rem,11vw,5.5rem)]">
              NO ES
            </span>
            <span className="block text-outline text-[clamp(2.5rem,11vw,5.5rem)]">
              FAST FOOD
            </span>
            <span className="block text-[clamp(2.5rem,11vw,5.5rem)] text-red">
              ES CLUCK CLUB
            </span>
          </h1>

          <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-ink/80 md:text-lg">
            Tenders empanizados a mano, friéndose ahora mismo en una cocina sin
            local, sin filas, sin cuento. Lo escuchás antes de morderlo.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="border-[5px] border-ink bg-red px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-bone shadow-[8px_8px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 md:text-base"
            >
              Pedir por WhatsApp
            </a>
            <Link
              to="/"
              hash="menu"
              className="border-[3px] border-ink bg-transparent px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_var(--color-orange)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 md:text-base"
            >
              Ver el menú
            </Link>
          </div>
        </div>

        {/* box visual */}
        <div className="relative mx-auto w-full max-w-md">
          {/* steam */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 z-0 flex -translate-x-1/2 gap-3"
          >
            <span className="animate-steam block h-16 w-3 rounded-full bg-bone/70" />
            <span
              className="animate-steam block h-20 w-3 rounded-full bg-bone/70"
              style={{ animationDelay: "0.6s" }}
            />
            <span
              className="animate-steam block h-14 w-3 rounded-full bg-bone/70"
              style={{ animationDelay: "1.2s" }}
            />
          </div>

          <div className="relative z-10 animate-float border-[5px] border-ink bg-yellow p-3 shadow-[12px_12px_0_0_var(--color-orange)]">
            <Image
              src="/cluck-club-caja-tenders.png"
              alt="Caja de Cluck Club abierta llena de tenders crujientes"
              width={640}
              height={640}
              fetchPriority="high"
              className="h-auto w-full"
            />
            <span className="absolute -bottom-4 -left-4 rotate-[-4deg] border-[3px] border-ink bg-bone px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-ink shadow-[3px_3px_0_0_var(--color-red)]">
              Recién frito
            </span>
          </div>
        </div>
      </div>

      {/* word marquee */}
      <div className="relative z-10">
        <TextMarquee />
      </div>
    </section>
  );
}
