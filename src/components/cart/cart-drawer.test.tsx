import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CartDrawer } from "#/components/cart/cart-drawer";
import { useCart } from "#/stores/cart";

const MAIN_LINE = {
  kind: "main" as const,
  id: "Big Cluck",
  name: "Big Cluck",
  price: 24,
  qty: 1,
};

const WINGS_LINE = {
  kind: "wings" as const,
  id: "wings-12-BBQ Ahumada",
  qty: 12,
  sabores: ["BBQ Ahumada"],
  unitPrice: 2500,
};

let openSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  localStorage.clear();
  openSpy = vi.fn();
  vi.stubGlobal("open", openSpy);
  useCart.setState({ lines: [], hydrated: true });
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
  useCart.setState({ lines: [], hydrated: false });
  localStorage.clear();
});

describe("CartDrawer", () => {
  it("renders cart lines and the running total when open", () => {
    useCart.setState({
      hydrated: true,
      lines: [MAIN_LINE, WINGS_LINE],
    });
    render(<CartDrawer open onOpenChange={() => {}} />);
    expect(screen.getByText("Big Cluck")).toBeTruthy();
    expect(screen.getByText(/12 alitas BBQ Ahumada/)).toBeTruthy();
    // 1*24 + 12*2500/1000 = 24 + 30 = 54
    expect(screen.getByText("$54k")).toBeTruthy();
  });

  it("increments line quantity when the plus button is pressed", () => {
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const incButton = screen.getByRole("button", {
      name: /aumentar big cluck/i,
    });
    fireEvent.click(incButton);
    expect(useCart.getState().lines[0]?.qty).toBe(2);
  });

  it("removes the line when the minus button is pressed at qty 1", () => {
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const decButton = screen.getByRole("button", {
      name: /disminuir big cluck/i,
    });
    fireEvent.click(decButton);
    expect(useCart.getState().lines).toHaveLength(0);
  });

  it("removes the line when the trash button is pressed", () => {
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const removeButton = screen.getByRole("button", {
      name: /quitar big cluck/i,
    });
    fireEvent.click(removeButton);
    expect(useCart.getState().lines).toHaveLength(0);
  });

  it("disables the send button when the cart is empty", () => {
    useCart.setState({ hydrated: true, lines: [] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const sendButton = screen.getByRole("button", {
      name: /pedir por whatsapp/i,
    });
    expect(sendButton).toHaveProperty("disabled", true);
  });

  it("opens WhatsApp, clears the cart, and closes the drawer on send", () => {
    const onOpenChange = vi.fn();
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={onOpenChange} />);
    const sendButton = screen.getByRole("button", {
      name: /pedir por whatsapp/i,
    });
    fireEvent.click(sendButton);

    expect(openSpy).toHaveBeenCalledTimes(1);
    const url = openSpy.mock.calls[0]?.[0] as string;
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain(encodeURIComponent("Big Cluck"));
    expect(openSpy.mock.calls[0]?.[1]).toBe("_blank");
    expect(useCart.getState().lines).toHaveLength(0);
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
