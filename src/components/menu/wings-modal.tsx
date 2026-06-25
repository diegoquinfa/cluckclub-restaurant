import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "#/components/ui/sheet";
import { buildWingsId, type CartLine } from "#/lib/whatsapp";
import { useCart } from "#/stores/cart";

const PORTIONS = [6, 12, 24, 36] as const;
const FLAVORS = [
  "Miel picante",
  "Miel mostaza",
  "Buffalo",
  "BBQ Ahumada",
  "Ajo parmesano",
] as const;
const UNIT_PRICE = 2500;
const DEFAULT_FLAVOR = FLAVORS[0];
const DEFAULT_PORTION = PORTIONS[0];

type WingsModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function buildInitialSabores(qty: (typeof PORTIONS)[number]): string[] {
  return Array(qty / 6).fill(DEFAULT_FLAVOR);
}

function portionLabelK(qty: (typeof PORTIONS)[number]): number {
  return (qty * UNIT_PRICE) / 1000;
}

function selectClass(extra?: string) {
  const base =
    "w-full border-[3px] border-ink bg-cream px-3 py-2 font-sans text-sm font-medium text-ink shadow-[2px_2px_0_0_var(--color-ink)] focus:outline-hidden focus:ring-2 focus:ring-ring";
  return extra ? `${base} ${extra}` : base;
}

function chipClass(active: boolean) {
  return active
    ? "inline-flex items-center gap-1 border-[3px] border-ink bg-red px-3 py-1 font-mono text-sm font-bold text-bone shadow-[3px_3px_0_0_var(--color-ink)]"
    : "inline-flex items-center gap-1 border-[3px] border-ink bg-yellow px-3 py-1 font-mono text-sm font-bold text-ink shadow-[3px_3px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5";
}

export function WingsModal({ open, onOpenChange }: WingsModalProps) {
  const [qty, setQty] = useState<(typeof PORTIONS)[number]>(DEFAULT_PORTION);
  const [sabores, setSabores] = useState<string[]>(() =>
    buildInitialSabores(DEFAULT_PORTION),
  );
  const addItem = useCart((state) => state.addItem);

  const blockCount = qty / 6;

  const handlePortionChange = (newQty: (typeof PORTIONS)[number]) => {
    setQty(newQty);
    const newBlockCount = newQty / 6;
    setSabores((prev) => {
      if (prev.length < newBlockCount) {
        return [
          ...prev,
          ...Array<string>(newBlockCount - prev.length).fill(DEFAULT_FLAVOR),
        ];
      }
      return prev.slice(0, newBlockCount);
    });
  };

  const handleSaborChange = (index: number, value: string) => {
    setSabores((prev) => prev.map((s, i) => (i === index ? value : s)));
  };

  const reset = () => {
    setQty(DEFAULT_PORTION);
    setSabores(buildInitialSabores(DEFAULT_PORTION));
  };

  const handleConfirm = () => {
    const line: CartLine = {
      kind: "wings",
      id: buildWingsId(qty, sabores),
      qty,
      unitPrice: UNIT_PRICE,
      sabores,
    };
    addItem(line);
    onOpenChange(false);
    reset();
  };

  const handleCancel = () => {
    onOpenChange(false);
    reset();
  };

  const totalK = portionLabelK(qty);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 border-l-[3px] border-ink bg-cream p-0 text-ink shadow-hard sm:max-w-md"
      >
        <SheetHeader className="border-b-[3px] border-ink bg-yellow p-5">
          <SheetTitle className="font-display text-3xl text-ink">
            Armá tus alitas
          </SheetTitle>
          <SheetDescription className="font-sans text-sm text-ink/70">
            Cada bloque de 6 alitas elegís un sabor. Podés mezclar.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-6 overflow-y-auto p-5">
          <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
            <legend className="font-mono text-xs font-bold uppercase tracking-widest text-red">
              Porción
            </legend>
            <div className="flex flex-wrap gap-2">
              {PORTIONS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => handlePortionChange(p)}
                  aria-pressed={p === qty}
                  className={chipClass(p === qty)}
                >
                  x{p} · ${portionLabelK(p)}k
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
            <legend className="font-mono text-xs font-bold uppercase tracking-widest text-red">
              {blockCount === 1 ? "Sabor" : `Sabores (${blockCount})`}
            </legend>
            <div className="flex flex-col gap-3">
              {Array.from({ length: blockCount }).map((_, i) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: blocks are positional and never reorder
                  key={i}
                  className="flex items-center gap-3"
                >
                  <span className="w-20 shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
                    Bloque {i + 1}
                  </span>
                  <select
                    value={sabores[i] ?? DEFAULT_FLAVOR}
                    onChange={(e) => handleSaborChange(i, e.target.value)}
                    aria-label={`Sabor del bloque ${i + 1}`}
                    className={selectClass()}
                  >
                    {FLAVORS.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="border-t-[3px] border-ink bg-bone p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
              Total
            </span>
            <span
              data-testid="wings-modal-total"
              className="border-[3px] border-ink bg-yellow px-3 py-1 font-display text-2xl text-ink shadow-[2px_2px_0_0_var(--color-ink)]"
            >
              ${totalK}k
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex w-full items-center justify-center gap-2 border-[3px] border-ink bg-red px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-bone shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
            >
              <ShoppingBag aria-hidden="true" className="size-4" />
              Agregar al carrito
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex w-full items-center justify-center border-[3px] border-ink bg-cream px-6 py-2 font-mono text-sm font-bold uppercase tracking-widest text-ink transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0"
            >
              Cancelar
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
