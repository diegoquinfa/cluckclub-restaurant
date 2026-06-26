import { Send } from "lucide-react";
import { CartLineRow } from "#/components/cart/cart-line";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "#/components/ui/sheet";
import { Textarea } from "#/components/ui/textarea";
import { buildWhatsappUrl } from "#/lib/whatsapp";
import { useCart } from "#/stores/cart";

type CartDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const lines = useCart((state) => state.lines);
  const total = useCart((state) => state.total());
  const observation = useCart((state) => state.observation);
  const setObservation = useCart((state) => state.setObservation);
  const inc = useCart((state) => state.inc);
  const dec = useCart((state) => state.dec);
  const remove = useCart((state) => state.remove);
  const clear = useCart((state) => state.clear);

  const isEmpty = lines.length === 0;

  const handleSend = () => {
    const url = buildWhatsappUrl(lines, observation);
    if (!url) {
      return;
    }
    window.open(url, "_blank");
    clear();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col gap-0 border-l-[3px] border-ink bg-cream p-0 text-ink shadow-hard sm:max-w-md"
      >
        <SheetHeader className="border-b-[3px] border-ink bg-yellow p-5">
          <SheetTitle className="font-display text-3xl text-ink">
            Tu pedido
          </SheetTitle>
          <SheetDescription className="font-sans text-sm text-ink/70">
            Revisa los items y envíalos por WhatsApp para confirmar con el
            equipo.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-5">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <p className="font-display text-2xl text-ink">
                El carrito está vacío
              </p>
              <p className="font-sans text-sm text-ink/70">
                Agrega items del menú para armar tu pedido.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {lines.map((line) => (
                <CartLineRow
                  key={line.id}
                  line={line}
                  onIncrement={inc}
                  onDecrement={dec}
                  onRemove={remove}
                />
              ))}
            </div>
          )}
        </div>

        <div className="border-t-[3px] border-ink bg-bone p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
              Total
            </span>
            <span className="border-[3px] border-ink bg-yellow px-3 py-1 font-display text-2xl text-ink shadow-[2px_2px_0_0_var(--color-ink)]">
              ${total} Mil
            </span>
          </div>
          <div className="mb-4 flex flex-col gap-2">
            <label
              htmlFor="cart-observation"
              className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70"
            >
              OBSERVACIÓN
            </label>
            <Textarea
              id="cart-observation"
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              maxLength={500}
              placeholder="Ej: sin picante, retirar a las 21hs"
              aria-label="Observación para el pedido"
              className="min-h-[80px] w-full border-[3px] border-ink bg-cream p-3 font-sans text-sm text-ink shadow-[2px_2px_0_0_var(--color-ink)] placeholder:text-ink/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red resize-none"
            />
          </div>
          <button
            type="button"
            onClick={handleSend}
            disabled={isEmpty}
            className="inline-flex w-full items-center justify-center gap-2 border-[3px] border-ink bg-red px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest text-bone shadow-[4px_4px_0_0_var(--color-ink)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send aria-hidden="true" className="size-4" />
            Pedir por WhatsApp
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
