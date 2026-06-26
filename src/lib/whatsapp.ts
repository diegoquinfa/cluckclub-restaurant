import { WHATSAPP_URL } from "#/constants/W_URL";

export type WingsPrep = "aparte" | "bañadas";

export type CartLine =
  | {
      kind: "main" | "sauce" | "drink" | "combo";
      id: string;
      name: string;
      price: number;
      qty: number;
    }
  | {
      kind: "tenders";
      id: string;
      label: string;
      price: number;
      qty: number;
    }
  | {
      kind: "wings";
      id: string;
      qty: number;
      sabores: string[];
      unitPrice: number;
      prep: WingsPrep;
    };

export function buildWingsId(
  qty: number,
  sabores: string[],
  prep: WingsPrep,
): string {
  return `wings-${qty}-${[...sabores].sort().join("-")}-${prep}`;
}

export function formatWingsName(
  qty: number,
  sabores: string[],
  prep: WingsPrep,
): string {
  const prepLabel = prep === "bañadas" ? "bañadas" : "salsa aparte";
  const unique = [...new Set(sabores)].sort();
  if (unique.length === 1) {
    return `${qty} alitas ${prepLabel} (${unique[0] ?? ""})`.trim();
  }
  return `${qty} alitas ${prepLabel} (${unique.join(" + ")})`;
}

const WHATSAPP_PHONE_PATTERN = /wa\.me\/(\d+)/;

function readWhatsappPhone(url: string): string {
  const match = url.match(WHATSAPP_PHONE_PATTERN);
  if (!match || !match[1]) {
    throw new Error(`Cannot extract phone number from WHATSAPP_URL: ${url}`);
  }
  return match[1];
}

const WHATSAPP_PHONE = readWhatsappPhone(WHATSAPP_URL);

function lineSubtotalK(line: CartLine): number {
  if (line.kind === "wings") {
    return (line.qty * line.unitPrice) / 1000;
  }
  return line.qty * line.price;
}

function formatBullet(line: CartLine): string {
  if (line.kind === "wings") {
    return `\u2022 ${formatWingsName(line.qty, line.sabores, line.prep)}`;
  }
  if (line.kind === "tenders") {
    return `\u2022 ${line.qty} Tenders ${line.label}`;
  }
  return `\u2022 ${line.qty} ${line.name}`;
}

export function buildWhatsappMessage(
  lines: CartLine[],
  observation?: string,
): string | null {
  if (lines.length === 0) {
    return null;
  }
  const bullets = lines.map(formatBullet).join("\n");
  const totalK = lines.reduce((sum, line) => sum + lineSubtotalK(line), 0);
  const trimmedObservation = observation?.trim() ?? "";
  const observationBlock = trimmedObservation
    ? `\n\nObservación: ${trimmedObservation}\n\n`
    : "\n\n";
  return `Hola Cluck Club, quiero pedir:\n\n${bullets}${observationBlock}Total: $${totalK} Mil`;
}

export function buildWhatsappUrl(
  lines: CartLine[],
  observation?: string,
): string | null {
  const message = buildWhatsappMessage(lines, observation);
  if (message === null) {
    return null;
  }
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
