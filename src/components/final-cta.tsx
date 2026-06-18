import { WHATSAPP_URL } from "#/constants/W_URL";

export function FinalCta() {
  return (
    <section className="bg-orange px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-[clamp(2.5rem,12vw,6rem)] leading-none text-bone">
          <span className="text-outline-cream">NO ES</span>
          <br />
          <span className="text-outline-cream">FAST FOOD, ES...</span>
          <br />
          CLUCK CLUB.
        </h2>
        <p className="mx-auto mt-6 max-w-md font-sans text-base leading-relaxed text-bone/90 md:text-lg">
          Sin local que buscar, sin reserva que hacer. Un mensaje y los tenders
          ya van saliendo de la freidora.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-9 inline-block border-[5px] border-ink bg-yellow px-8 py-4 font-mono text-base font-bold uppercase tracking-widest text-ink shadow-[10px_10px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 md:text-lg"
        >
          Pedir por WhatsApp
        </a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t-[5px] border-ink bg-ink px-4 py-12 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl text-bone md:text-4xl">
            CLUCK CLUB
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-widest text-yellow">
            Puro crunch, cero cuento.
          </p>
        </div>

        <div className="font-mono text-xs uppercase tracking-widest text-bone/70">
          <p>Cocina oculta · Cartagena, Colombia</p>
          <p className="mt-1">Mar–Dom · 17:00 — 23:00</p>
          <p className="mt-1">@cluckclub.col</p>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl border-t-[3px] border-bone/20 pt-6 font-mono text-[0.65rem] uppercase tracking-widest text-bone/50">
        © {new Date().getFullYear()} Cluck Club · No es fast food.
      </p>
    </footer>
  );
}
