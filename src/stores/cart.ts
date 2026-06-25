import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartLine } from "#/lib/whatsapp";

export type { CartLine };

interface CartState {
  lines: CartLine[];
  hydrated: boolean;
  observation: string;
  addItem: (line: CartLine) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  setHydrated: (value: boolean) => void;
  setObservation: (value: string) => void;
  total: () => number;
  count: () => number;
}

const OBSERVATION_MAX_LENGTH = 500;

const STORAGE_KEY = "cluck-cart";
const STORAGE_VERSION = 1;

const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return globalThis.localStorage?.getItem(name) ?? null;
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      globalThis.localStorage?.setItem(name, value);
    } catch {
      // no-op: storage unavailable (SSR / private mode)
    }
  },
  removeItem: (name: string): void => {
    try {
      globalThis.localStorage?.removeItem(name);
    } catch {
      // no-op: storage unavailable
    }
  },
};

function lineSubtotalK(line: CartLine): number {
  if (line.kind === "wings") {
    return (line.qty * line.unitPrice) / 1000;
  }
  return line.qty * line.price;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      hydrated: false,
      observation: "",

      addItem: (incoming) => {
        const lines = get().lines;
        const existingIndex = lines.findIndex(
          (line) => line.id === incoming.id,
        );
        if (existingIndex === -1) {
          set({ lines: [...lines, incoming] });
          return;
        }
        const next = lines.slice();
        const existing = next[existingIndex];
        if (!existing) {
          return;
        }
        next[existingIndex] = { ...existing, qty: existing.qty + incoming.qty };
        set({ lines: next });
      },

      inc: (id) => {
        set({
          lines: get().lines.map((line) =>
            line.id === id ? { ...line, qty: line.qty + 1 } : line,
          ),
        });
      },

      dec: (id) => {
        const next = get()
          .lines.map((line) =>
            line.id === id ? { ...line, qty: line.qty - 1 } : line,
          )
          .filter((line) => line.qty > 0);
        set({ lines: next });
      },

      remove: (id) => {
        set({ lines: get().lines.filter((line) => line.id !== id) });
      },

      clear: () => {
        set({ lines: [] });
      },

      setHydrated: (value) => {
        set({ hydrated: value });
      },

      setObservation: (value) => {
        set({ observation: value.slice(0, OBSERVATION_MAX_LENGTH) });
      },

      total: () =>
        get().lines.reduce((sum, line) => sum + lineSubtotalK(line), 0),

      count: () => get().lines.length,
    }),
    {
      name: STORAGE_KEY,
      version: STORAGE_VERSION,
      storage: createJSONStorage(() => safeStorage),
      partialize: (state) => ({ lines: state.lines }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
