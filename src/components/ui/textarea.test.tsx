import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Textarea } from "#/components/ui/textarea";

afterEach(() => {
  cleanup();
});

describe("Textarea", () => {
  it("renders a native <textarea> element", () => {
    render(<Textarea aria-label="note" />);
    expect(screen.getByLabelText("note").tagName).toBe("TEXTAREA");
  });

  it("forwards placeholder, value, and className to the native textarea", () => {
    render(
      <Textarea
        aria-label="note"
        placeholder="sin picante"
        value="retirar 21hs"
        readOnly
        className="custom-class"
      />,
    );
    const el = screen.getByLabelText("note") as HTMLTextAreaElement;
    expect(el.placeholder).toBe("sin picante");
    expect(el.value).toBe("retirar 21hs");
    expect(el.className).toContain("custom-class");
  });
});
