import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CartFab } from "#/components/cart/cart-fab";
import { useCart } from "#/stores/cart";

beforeEach(() => {
  localStorage.clear();
  useCart.setState({ lines: [], hydrated: false });
});

afterEach(() => {
  cleanup();
  useCart.setState({ lines: [], hydrated: false });
  localStorage.clear();
});

describe("CartFab", () => {
  it("is not rendered before hydration completes", () => {
    useCart.setState({ hydrated: false, lines: [] });
    render(<CartFab onOpen={() => {}} />);
    expect(screen.queryByRole("button", { name: /abrir carrito/i })).toBeNull();
  });

  it("renders after hydration with the current line count in the badge", () => {
    useCart.setState({
      hydrated: true,
      lines: [
        { kind: "main", id: "Big Cluck", name: "Big Cluck", price: 24, qty: 1 },
        {
          kind: "main",
          id: "Botanita Cluck",
          name: "Botanita Cluck",
          price: 26,
          qty: 1,
        },
      ],
    });
    render(<CartFab onOpen={() => {}} />);
    const button = screen.getByRole("button", { name: /abrir carrito/i });
    expect(button).toBeTruthy();
    expect(button.textContent).toContain("2");
  });

  it("invokes onOpen when the button is clicked", () => {
    useCart.setState({ hydrated: true, lines: [] });
    const onOpen = vi.fn();
    render(<CartFab onOpen={onOpen} />);
    const button = screen.getByRole("button", { name: /abrir carrito/i });
    fireEvent.click(button);
    expect(onOpen).toHaveBeenCalledTimes(1);
  });
});
