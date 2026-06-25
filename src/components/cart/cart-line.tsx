import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "#/lib/utils";
import { type CartLine, formatWingsName } from "#/lib/whatsapp";

type CartLineProps = {
  line: CartLine;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

function displayName(line: CartLine): string {
  if (line.kind === "wings") {
    return formatWingsName(line.qty, line.sabores);
  }
  if (line.kind === "tenders") {
    return `Tenders ${line.label}`;
  }
  return line.name;
}

function lineTotalK(line: CartLine): number {
  if (line.kind === "wings") {
    return (line.qty * line.unitPrice) / 1000;
  }
  return line.qty * line.price;
}

function controlClass(extra?: string) {
  return cn(
    "inline-flex size-9 shrink-0 items-center justify-center border-[3px] border-ink bg-cream text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0",
    extra,
  );
}

export function CartLineRow({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineProps) {
  const subtotal = lineTotalK(line);
  return (
    <article className="flex flex-col gap-3 border-[3px] border-ink bg-bone p-4 shadow-[4px_4px_0_0_var(--color-ink)]">
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-display text-xl leading-tight text-ink">
          {displayName(line)}
        </h4>
        <button
          type="button"
          aria-label={`Quitar ${displayName(line)}`}
          onClick={() => onRemove(line.id)}
          className={controlClass("bg-red text-bone hover:bg-red/90")}
        >
          <Trash2 aria-hidden="true" />
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Disminuir ${displayName(line)}`}
            onClick={() => onDecrement(line.id)}
            className={controlClass()}
          >
            <Minus aria-hidden="true" />
          </button>
          <span
            aria-live="polite"
            className="min-w-8 border-[3px] border-ink bg-yellow px-3 py-1 text-center font-mono text-base font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)]"
          >
            {line.qty}
          </span>
          <button
            type="button"
            aria-label={`Aumentar ${displayName(line)}`}
            onClick={() => onIncrement(line.id)}
            className={controlClass()}
          >
            <Plus aria-hidden="true" />
          </button>
        </div>
        <span className="border-[3px] border-ink bg-cream px-3 py-1 font-mono text-sm font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)]">
          ${subtotal}k
        </span>
      </div>
    </article>
  );
}
