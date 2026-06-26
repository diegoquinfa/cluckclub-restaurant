import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WingsModal } from "#/components/menu/wings-modal";
import { useCart } from "#/stores/cart";

beforeEach(() => {
  localStorage.clear();
  useCart.setState({ lines: [], hydrated: true });
});

afterEach(() => {
  cleanup();
  useCart.setState({ lines: [], hydrated: false });
  localStorage.clear();
});

describe("WingsModal", () => {
  it("renders with default state: portion x6 and 1 sabor dropdown", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    const x6Button = screen.getByRole("button", { name: /x6/i });
    expect(x6Button.getAttribute("aria-pressed")).toBe("true");
    const saborSelect = screen.getByRole("combobox", {
      name: /sabor del bloque 1/i,
    });
    expect(saborSelect).toBeTruthy();
    // 1 dropdown for x6
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
  });

  it("changing the portion updates the number of sabor dropdowns", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /x24/i }));
    // 24 / 6 = 4 dropdowns
    expect(screen.getAllByRole("combobox")).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: /x12/i }));
    expect(screen.getAllByRole("combobox")).toHaveLength(2);
    fireEvent.click(screen.getByRole("button", { name: /x36/i }));
    expect(screen.getAllByRole("combobox")).toHaveLength(6);
  });

  it("changing a sabor updates the state and the dropdown value", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    const select = screen.getByRole("combobox", {
      name: /sabor del bloque 1/i,
    }) as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "Buffalo" } });
    expect(select.value).toBe("Buffalo");
  });

  it("shows the correct total in the footer based on the selected portion", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    // default x6 -> 15 Mil
    expect(screen.getByText("$15 Mil")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /x12/i }));
    expect(screen.getByText("$30 Mil")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /x24/i }));
    expect(screen.getByText("$60 Mil")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: /x36/i }));
    expect(screen.getByText("$90 Mil")).toBeTruthy();
  });

  it("shows non-integer totals for custom quantities (e.g. 7 alitas = $17.5 Mil)", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    const input = screen.getByLabelText(/cantidad custom/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "7" } });
    // 7 * 2500 / 1000 = 17.5
    expect(screen.getByText("$17.5 Mil")).toBeTruthy();
  });

  it("clamps invalid custom quantities to the minimum of 1", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    const input = screen.getByLabelText(/cantidad custom/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "0" } });
    expect(input.value).toBe("1");
    expect(screen.getByText("$2.5 Mil")).toBeTruthy();
  });

  it("toggles between Salsa aparte and Bañadas and the active button is pressed", () => {
    render(<WingsModal open onOpenChange={() => {}} />);
    const aparteBtn = screen.getByRole("button", { name: /salsa aparte/i });
    const bañadasBtn = screen.getByRole("button", { name: /bañadas en salsa/i });
    // Default is "bañadas"
    expect(bañadasBtn.getAttribute("aria-pressed")).toBe("true");
    expect(aparteBtn.getAttribute("aria-pressed")).toBe("false");
    fireEvent.click(aparteBtn);
    expect(aparteBtn.getAttribute("aria-pressed")).toBe("true");
    expect(bañadasBtn.getAttribute("aria-pressed")).toBe("false");
  });

  it("clicking Agregar al carrito adds a wings line with the correct shape and closes the modal", () => {
    const onOpenChange = vi.fn();
    render(<WingsModal open onOpenChange={onOpenChange} />);
    // default: x6, sabor Miel picante, prep bañadas
    fireEvent.click(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    );
    const lines = useCart.getState().lines;
    expect(lines).toHaveLength(1);
    const line = lines[0];
    expect(line?.kind).toBe("wings");
    expect(line).toMatchObject({
      id: "wings-6-Miel picante-bañadas",
      qty: 6,
      sabores: ["Miel picante"],
      unitPrice: 2500,
      prep: "bañadas",
    });
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("clicking Agregar with a mixed 12-wing configuration produces the expected line and deterministic id", () => {
    const onOpenChange = vi.fn();
    render(<WingsModal open onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /x12/i }));
    const block1 = screen.getByRole("combobox", {
      name: /sabor del bloque 1/i,
    });
    const block2 = screen.getByRole("combobox", {
      name: /sabor del bloque 2/i,
    });
    fireEvent.change(block1, { target: { value: "Miel picante" } });
    fireEvent.change(block2, { target: { value: "BBQ Ahumada" } });
    fireEvent.click(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    );
    const line = useCart.getState().lines[0];
    expect(line).toMatchObject({
      kind: "wings",
      id: "wings-12-BBQ Ahumada-Miel picante-bañadas", // sorted, order-independent
      qty: 12,
      sabores: ["Miel picante", "BBQ Ahumada"],
      unitPrice: 2500,
      prep: "bañadas",
    });
  });

  it("persists the prep choice (aparte) in the added cart line", () => {
    const onOpenChange = vi.fn();
    render(<WingsModal open onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /salsa aparte/i }));
    fireEvent.click(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    );
    const line = useCart.getState().lines[0];
    expect(line).toMatchObject({
      id: "wings-6-Miel picante-aparte",
      prep: "aparte",
    });
  });

  it("clicking Cancelar closes the modal without adding to the cart", () => {
    const onOpenChange = vi.fn();
    render(<WingsModal open onOpenChange={onOpenChange} />);
    fireEvent.click(screen.getByRole("button", { name: /cancelar/i }));
    expect(useCart.getState().lines).toHaveLength(0);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it("resets state to defaults after a successful Agregar so the next open starts clean", () => {
    const onOpenChange = vi.fn();
    const { rerender } = render(
      <WingsModal open onOpenChange={onOpenChange} />,
    );
    fireEvent.click(screen.getByRole("button", { name: /x12/i }));
    const block1 = screen.getByRole("combobox", {
      name: /sabor del bloque 1/i,
    });
    fireEvent.change(block1, { target: { value: "Buffalo" } });
    fireEvent.click(
      screen.getByRole("button", { name: /agregar al carrito/i }),
    );
    // close and reopen
    rerender(<WingsModal open={false} onOpenChange={onOpenChange} />);
    rerender(<WingsModal open onOpenChange={onOpenChange} />);
    // Should be back to x6 default with bañadas prep
    const x6Button = screen.getByRole("button", { name: /x6/i });
    expect(x6Button.getAttribute("aria-pressed")).toBe("true");
    expect(screen.getAllByRole("combobox")).toHaveLength(1);
    const bañadasBtn = screen.getByRole("button", { name: /bañadas en salsa/i });
    expect(bañadasBtn.getAttribute("aria-pressed")).toBe("true");
  });
});
