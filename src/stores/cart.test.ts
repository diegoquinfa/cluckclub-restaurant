import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useCart } from "#/stores/cart";

const MAIN_LINE = {
  kind: "main" as const,
  id: "Big Cluck",
  name: "Big Cluck",
  price: 24,
  qty: 1,
};

const SAUCE_LINE = {
  kind: "sauce" as const,
  id: "GuacaCluck",
  name: "GuacaCluck",
  price: 3,
  qty: 2,
};

const WINGS_LINE = {
  kind: "wings" as const,
  id: "wings-12-BBQ Ahumada",
  qty: 12,
  sabores: ["BBQ Ahumada"],
  unitPrice: 2500,
};

const TENDERS_LINE = {
  kind: "tenders" as const,
  id: "x4",
  label: "x4",
  price: 21,
  qty: 1,
};

beforeEach(() => {
  localStorage.clear();
  const { result } = renderHook(() => useCart());
  act(() => {
    result.current.clear();
  });
});

afterEach(() => {
  localStorage.clear();
});

describe("useCart - actions", () => {
  it("addItem creates a new line when id is new", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
    });
    expect(result.current.lines).toEqual([MAIN_LINE]);
  });

  it("addItem increments qty on duplicate id (no duplicate line)", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.addItem(MAIN_LINE);
      result.current.addItem(MAIN_LINE);
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0]?.qty).toBe(3);
  });

  it("inc increments the targeted line by 1", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.inc("Big Cluck");
    });
    expect(result.current.lines[0]?.qty).toBe(2);
  });

  it("dec decrements the targeted line by 1", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem({ ...MAIN_LINE, qty: 3 });
      result.current.dec("Big Cluck");
    });
    expect(result.current.lines[0]?.qty).toBe(2);
  });

  it("dec removes the line when qty would reach 0 (no line ever has qty < 1)", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.dec("Big Cluck");
    });
    expect(result.current.lines).toHaveLength(0);
  });

  it("remove deletes the targeted line by id", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.addItem(SAUCE_LINE);
      result.current.remove("GuacaCluck");
    });
    expect(result.current.lines).toHaveLength(1);
    expect(result.current.lines[0]?.id).toBe("Big Cluck");
  });

  it("clear empties lines", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.addItem(WINGS_LINE);
      result.current.clear();
    });
    expect(result.current.lines).toEqual([]);
  });

  it("clear also resets observation to an empty string", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.setObservation("sin picante");
      result.current.clear();
    });
    expect(result.current.lines).toEqual([]);
    expect(result.current.observation).toBe("");
  });
});

describe("useCart - selectors", () => {
  it("total sums qty * price across kinds and qty * unitPrice / 1000 for wings", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.addItem(SAUCE_LINE);
      result.current.addItem(WINGS_LINE);
      result.current.addItem(TENDERS_LINE);
    });
    // Big Cluck 1*24 = 24; GuacaCluck 2*3 = 6; 12 wings = 12*2500/1000 = 30; Tenders x4 = 1*21 = 21
    // Total: 24 + 6 + 30 + 21 = 81
    expect(result.current.total()).toBe(81);
  });

  it("count returns unique line count (not summed qty)", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem({ ...MAIN_LINE, qty: 3 });
      result.current.addItem(SAUCE_LINE);
    });
    expect(result.current.count()).toBe(2);
  });
});

describe("useCart - persistence", () => {
  it("persists only lines (not hydrated) to localStorage key cluck-cart version 1", async () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
    });
    // Wait for the debounced persist write.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const raw = localStorage.getItem("cluck-cart");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string) as {
      state: Record<string, unknown>;
      version: number;
    };
    expect(parsed.version).toBe(1);
    expect(parsed.state).toHaveProperty("lines");
    expect(parsed.state).not.toHaveProperty("hydrated");
    expect(parsed.state.lines).toEqual([MAIN_LINE]);
  });

  it("storage adapter no-ops when localStorage throws (SSR-safe)", () => {
    const originalGetItem = Storage.prototype.getItem;
    const originalSetItem = Storage.prototype.setItem;
    const originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.getItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.setItem = () => {
      throw new Error("blocked");
    };
    Storage.prototype.removeItem = () => {
      throw new Error("blocked");
    };
    try {
      const { result } = renderHook(() => useCart());
      act(() => {
        result.current.addItem(MAIN_LINE);
      });
      // No throw means the safe adapter worked.
      expect(result.current.lines).toHaveLength(1);
    } finally {
      Storage.prototype.getItem = originalGetItem;
      Storage.prototype.setItem = originalSetItem;
      Storage.prototype.removeItem = originalRemoveItem;
    }
  });

  it("persists observation alongside lines (not hydrated) at version 1", async () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.setObservation("retirar 21hs");
    });
    // Wait for the debounced persist write.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const raw = localStorage.getItem("cluck-cart");
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw as string) as {
      state: Record<string, unknown>;
      version: number;
    };
    expect(parsed.version).toBe(1);
    expect(parsed.state).toHaveProperty("lines");
    expect(parsed.state).toHaveProperty("observation", "retirar 21hs");
    expect(parsed.state).not.toHaveProperty("hydrated");
  });

  it("hydrates a v1 cart blob (no observation key) with observation = '' and lines preserved", async () => {
    // Inject a legacy v1 cart: only lines, no observation field, version 1.
    localStorage.setItem(
      "cluck-cart",
      JSON.stringify({
        state: { lines: [MAIN_LINE, SAUCE_LINE] },
        version: 1,
      }),
    );

    // Force a re-read from storage and wait for the hydration promise.
    await act(async () => {
      await useCart.persist.rehydrate();
    });

    const state = useCart.getState();
    expect(state.lines).toEqual([MAIN_LINE, SAUCE_LINE]);
    expect(state.observation).toBe("");
  });
});

describe("useCart - observation", () => {
  it("defaults observation to an empty string", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.observation).toBe("");
  });

  it("setObservation updates the note", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.setObservation("sin picante");
    });
    expect(result.current.observation).toBe("sin picante");
  });

  it("setObservation clamps input longer than 500 characters to length 500", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.setObservation("x".repeat(600));
    });
    expect(result.current.observation).toHaveLength(500);
  });

  it("setObservation accepts exactly 500 characters without truncating", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.setObservation("x".repeat(500));
    });
    expect(result.current.observation).toHaveLength(500);
  });

  it("setObservation silently truncates a 600-char paste to length 500 with no error", () => {
    const { result } = renderHook(() => useCart());
    expect(() => {
      act(() => {
        result.current.setObservation("y".repeat(600));
      });
    }).not.toThrow();
    expect(result.current.observation).toHaveLength(500);
    expect(result.current.observation).toBe("y".repeat(500));
  });

  it("setObservation does not affect cart lines or hydrated state", () => {
    const { result } = renderHook(() => useCart());
    act(() => {
      result.current.addItem(MAIN_LINE);
      result.current.setHydrated(true);
      result.current.setObservation("retirar 21hs");
    });
    expect(result.current.lines).toEqual([MAIN_LINE]);
    expect(result.current.hydrated).toBe(true);
    expect(result.current.observation).toBe("retirar 21hs");
  });
});
