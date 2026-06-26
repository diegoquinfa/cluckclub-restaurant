import { describe, expect, it } from "vitest";
import { WHATSAPP_URL } from "#/constants/W_URL";
import {
  buildWhatsappMessage,
  buildWhatsappUrl,
  buildWingsId,
  type CartLine,
} from "#/lib/whatsapp";

const mainLine: CartLine = {
  kind: "main",
  id: "Big Cluck",
  name: "Big Cluck",
  price: 24,
  qty: 1,
};

const tendersLine: CartLine = {
  kind: "tenders",
  id: "x4",
  label: "x4",
  price: 21,
  qty: 1,
};

const wingsLine: CartLine = {
  kind: "wings",
  id: "wings-12-BBQ Ahumada-bañadas",
  qty: 12,
  sabores: ["BBQ Ahumada"],
  unitPrice: 2500,
  prep: "bañadas",
};

const mixedWingsLine: CartLine = {
  kind: "wings",
  id: "wings-12-BBQ Ahumada-Miel picante-bañadas",
  qty: 12,
  sabores: ["Miel picante", "BBQ Ahumada"],
  unitPrice: 2500,
  prep: "bañadas",
};

const PHONE_FROM_URL = (() => {
  const match = WHATSAPP_URL.match(/wa\.me\/(\d+)/);
  return match ? match[1] : "";
})();

describe("buildWhatsappMessage", () => {
  it("returns null for an empty cart", () => {
    expect(buildWhatsappMessage([])).toBeNull();
  });

  it("renders header, bullets and total for a main dish", () => {
    const message = buildWhatsappMessage([mainLine]);
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 1 Big Cluck\n\n" +
        "Total: $24 Mil",
    );
  });

  it("uses Spanish-first phrasing for wings (alitas) with a single flavor", () => {
    const message = buildWhatsappMessage([wingsLine]);
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 12 alitas bañadas (BBQ Ahumada)\n\n" +
        `Total: $${(12 * 2500) / 1000} Mil`,
    );
  });

  it("joins multiple wing flavors with '+' and dedupes the list", () => {
    const message = buildWhatsappMessage([mixedWingsLine]);
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 12 alitas bañadas (BBQ Ahumada + Miel picante)\n\n" +
        `Total: $${(12 * 2500) / 1000} Mil`,
    );
  });

  it("uses 'salsa aparte' phrasing when prep is aparte", () => {
    const aparteLine: CartLine = {
      kind: "wings",
      id: "wings-12-Buffalo-aparte",
      qty: 12,
      sabores: ["Buffalo"],
      unitPrice: 2500,
      prep: "aparte",
    };
    const message = buildWhatsappMessage([aparteLine]);
    expect(message).toContain("12 alitas salsa aparte (Buffalo)");
  });

  it("uses the label for tenders lines", () => {
    const message = buildWhatsappMessage([tendersLine]);
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 1 Tenders x4\n\n" +
        "Total: $21 Mil",
    );
  });

  it("omits the observation section when observation is an empty string", () => {
    const message = buildWhatsappMessage([mainLine], "");
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 1 Big Cluck\n\n" +
        "Total: $24 Mil",
    );
    expect(message).not.toContain("Observación");
  });

  it("omits the observation section when observation is whitespace-only", () => {
    const message = buildWhatsappMessage([mainLine], "   ");
    expect(message).not.toContain("Observación");
  });

  it("omits the observation section when observation is omitted entirely", () => {
    const message = buildWhatsappMessage([mainLine]);
    expect(message).not.toContain("Observación");
  });

  it("inserts the trimmed observation block between bullets and total", () => {
    const message = buildWhatsappMessage([mainLine], "retirar 21hs");
    expect(message).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 1 Big Cluck\n\n" +
        "Observación: retirar 21hs\n\n" +
        "Total: $24 Mil",
    );
  });

  it("trims leading and trailing whitespace from the observation", () => {
    const message = buildWhatsappMessage([mainLine], "  sin picante  ");
    expect(message).toContain("Observación: sin picante");
  });

  it("preserves newlines inside the observation", () => {
    const message = buildWhatsappMessage([mainLine], "line1\nline2");
    expect(message).toContain("Observación: line1\nline2");
  });
});

describe("buildWhatsappUrl", () => {
  it("returns null for an empty cart", () => {
    expect(buildWhatsappUrl([])).toBeNull();
  });

  it("reads the phone number from WHATSAPP_URL and encodes the message", () => {
    const url = buildWhatsappUrl([mainLine]);
    expect(url).not.toBeNull();
    expect(url).toMatch(/^https:\/\/wa\.me\//);
    expect(url).toContain(PHONE_FROM_URL);

    const parsed = new URL(url as string);
    expect(parsed.searchParams.get("text")).toBe(
      "Hola Cluck Club, quiero pedir:\n\n" +
        "\u2022 1 Big Cluck\n\n" +
        "Total: $24 Mil",
    );
  });

  it("URL-encodes special characters in wings flavor", () => {
    const url = buildWhatsappUrl([wingsLine]) as string;
    const parsed = new URL(url);
    const text = parsed.searchParams.get("text") ?? "";
    expect(text).toContain("alitas bañadas (BBQ Ahumada)");
    // No raw spaces inside the text parameter portion of the URL.
    const textSegment = url.split("?text=")[1] ?? "";
    expect(textSegment).not.toMatch(/ /);
  });

  it("URL-encodes newlines in the observation as %0A", () => {
    const url = buildWhatsappUrl([mainLine], "a\nb") as string;
    expect(url).toContain("%0A");
    const parsed = new URL(url);
    const text = parsed.searchParams.get("text") ?? "";
    expect(text).toContain("Observación: a\nb");
  });

  it("buildWingsId is order-independent (sorts sabores before joining)", () => {
    const id1 = buildWingsId(12, ["Miel picante", "BBQ Ahumada"], "bañadas");
    const id2 = buildWingsId(12, ["BBQ Ahumada", "Miel picante"], "bañadas");
    expect(id1).toBe(id2);
    expect(id1).toBe("wings-12-BBQ Ahumada-Miel picante-bañadas");
  });

  it("buildWingsId distinguishes prep methods (bañadas vs aparte) as different ids", () => {
    const idBañadas = buildWingsId(6, ["BBQ Ahumada"], "bañadas");
    const idAparte = buildWingsId(6, ["BBQ Ahumada"], "aparte");
    expect(idBañadas).not.toBe(idAparte);
    expect(idBañadas).toBe("wings-6-BBQ Ahumada-bañadas");
    expect(idAparte).toBe("wings-6-BBQ Ahumada-aparte");
  });
});
