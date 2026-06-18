import { Link } from "@tanstack/react-router";
import { WHATSAPP_URL } from "#/constants/W_URL";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-ink bg-yellow">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link to="/" hash="#top" className="flex items-center gap-2">
          <span className="grid size-9 place-items-center border-[3px] border-ink bg-red font-display text-lg text-bone shadow-[3px_3px_0_0_var(--color-ink)]">
            C
          </span>
          <span className="font-display text-xl tracking-tight text-ink md:text-2xl">
            CLUCK CLUB
          </span>
        </Link>

        <nav className="hidden items-center gap-6 font-mono text-xs uppercase tracking-widest text-ink md:flex">
          <Link to="/" hash="#menu" className="hover:text-red">
            Menú
          </Link>
          <Link to="/" hash="#proceso" className="hover:text-red">
            Cómo funciona
          </Link>
          <Link to="/" hash="#zonas" className="hover:text-red">
            Zonas
          </Link>
        </nav>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="border-[3px] border-ink bg-ink px-4 py-2 font-mono text-xs font-bold uppercase tracking-widest text-bone shadow-[4px_4px_0_0_var(--color-orange)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
        >
          Pedir
        </a>
      </div>
    </header>
  );
}
