import { ShoppingBag } from "lucide-react";
import { useCart } from "#/stores/cart";

type CartFabProps = {
  onOpen: () => void;
};

export function CartFab({ onOpen }: CartFabProps) {
  const hydrated = useCart((state) => state.hydrated);
  const count = useCart((state) => state.count());
  if (!hydrated) {
    return null;
  }
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Abrir carrito"
      data-testid="cart-fab"
      className="fixed right-4 bottom-4 z-40 inline-flex size-16 items-center justify-center border-[3px] border-ink bg-red text-bone shadow-[6px_6px_0_0_var(--color-ink)] transition-transform hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0 active:translate-y-0"
    >
      <ShoppingBag aria-hidden="true" className="size-6" />
      <span
        aria-hidden="true"
        className="absolute -top-2 -right-2 inline-flex min-w-7 items-center justify-center rounded-full border-[3px] border-ink bg-yellow px-2 py-0.5 font-mono text-sm font-bold text-ink shadow-[2px_2px_0_0_var(--color-ink)]"
      >
        {count}
      </span>
    </button>
  );
}
