import { Link } from '@tanstack/react-router'

export function NotFound() {
  return (
    <main className="min-h-screen bg-cream px-4 py-8 text-ink md:px-6 md:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl items-center justify-center">
        <section className="relative w-full overflow-hidden border-[5px] border-ink bg-yellow shadow-[12px_12px_0_0_var(--color-red)]">
          <p
            aria-hidden="true"
            className="pointer-events-none absolute right-2 top-2 font-display text-[5rem] leading-none text-bone/40 md:right-6 md:top-4 md:text-[9rem]"
          >
            404
          </p>

          <div className="relative z-10 grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <span className="inline-block border-[3px] border-ink bg-red px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.25em] text-bone shadow-[3px_3px_0_0_var(--color-ink)]">
                Wrong turn
              </span>

              <h1 className="mt-5 font-display text-[clamp(3.5rem,14vw,8rem)] leading-[0.88] text-ink">
                PAGE
                <span className="block text-outline text-red">NOT FOUND</span>
              </h1>

              <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-ink/80 md:text-lg">
                Esa ruta no existe o ya salio volando. Volve al inicio y segui por
                donde si hay crunch.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/"
                  className="border-[5px] border-ink bg-red px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-bone shadow-[8px_8px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 md:text-base"
                >
                  Volver al inicio
                </Link>
                <a
                  href="#top"
                  className="border-[3px] border-ink bg-bone px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-ink shadow-[6px_6px_0_0_var(--color-orange)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0 md:text-base"
                >
                  Ir arriba
                </a>
              </div>
            </div>

            <div className="grid gap-3 self-end font-mono text-xs uppercase tracking-[0.2em] text-ink/75 md:justify-items-end">
              <div className="w-full border-[3px] border-ink bg-bone p-4 shadow-[6px_6px_0_0_var(--color-ink)] md:max-w-xs">
                <p className="text-red">Status</p>
                <p className="mt-2 text-xl font-bold text-ink">404 / Route Missing</p>
              </div>
              <div className="w-full border-[3px] border-ink bg-ink p-4 text-bone shadow-[6px_6px_0_0_var(--color-orange)] md:max-w-xs">
                <p className="text-yellow">Hint</p>
                <p className="mt-2 text-sm leading-relaxed tracking-[0.15em] text-bone/80">
                  Usa la navegacion principal o volve a la home.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
