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
  id: "wings-12-BBQ Ahumada-bañadas",
  qty: 12,
  sabores: ["BBQ Ahumada"],
  unitPrice: 2500,
  prep: "bañadas" as const,
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
    expect(screen.getByText(/12 alitas bañadas \(BBQ Ahumada\)/)).toBeTruthy();
    // 1*24 + 12*2500/1000 = 24 + 30 = 54
    expect(screen.getByText("$54 Mil")).toBeTruthy();
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

  it("renders an observation textarea in the footer with the OBSERVACIÓN label", () => {
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    expect(screen.getByText("OBSERVACIÓN")).toBeTruthy();
    const textarea = screen.getByLabelText(/observación para el pedido/i);
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea.getAttribute("placeholder")).toBe(
      "Ej: sin picante, retirar a las 21hs",
    );
    expect(textarea.getAttribute("maxlength")).toBe("500");
  });

  it("typing into the observation textarea updates the store", () => {
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const textarea = screen.getByLabelText(
      /observación para el pedido/i,
    ) as HTMLTextAreaElement;
    fireEvent.change(textarea, { target: { value: "sin picante" } });
    expect(useCart.getState().observation).toBe("sin picante");
  });

  it("observation is controlled by the store value on render", () => {
    useCart.setState({
      hydrated: true,
      lines: [MAIN_LINE],
      observation: "retirar 21hs",
    });
    render(<CartDrawer open onOpenChange={() => {}} />);
    const textarea = screen.getByLabelText(
      /observación para el pedido/i,
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("retirar 21hs");
  });

  it("send includes the observation in the WhatsApp URL and clears it from the store", () => {
    useCart.setState({
      hydrated: true,
      lines: [MAIN_LINE],
      observation: "sin picante",
    });
    render(<CartDrawer open onOpenChange={() => {}} />);
    fireEvent.click(
      screen.getByRole("button", { name: /pedir por whatsapp/i }),
    );
    const url = openSpy.mock.calls[0]?.[0] as string;
    expect(url).toContain(encodeURIComponent("Observación: sin picante"));
    expect(useCart.getState().observation).toBe("");
  });

  it("the observation value survives closing and reopening the drawer", () => {
    const onOpenChange = vi.fn();
    useCart.setState({ hydrated: true, lines: [MAIN_LINE] });
    const { rerender } = render(
      <CartDrawer open onOpenChange={onOpenChange} />,
    );
    fireEvent.change(screen.getByLabelText(/observación para el pedido/i), {
      target: { value: "sin picante" },
    });
    expect(useCart.getState().observation).toBe("sin picante");
    // Simulate the parent closing then reopening the drawer.
    rerender(<CartDrawer open={false} onOpenChange={onOpenChange} />);
    rerender(<CartDrawer open onOpenChange={onOpenChange} />);
    const textarea = screen.getByLabelText(
      /observación para el pedido/i,
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("sin picante");
  });
});
