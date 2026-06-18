import { Marquee } from "./marquee";

/**
 * StickerWall — la franja de stickers del sticker pack de Cluck Club,
 * en loop horizontal infinito. Equivalente a buildMarquee('.sticker-wall__track', 35, -1).
 */
type StickerVariant = "default" | "dark" | "outline";

type StickerData = {
  text: string;
  variant: StickerVariant;
};

const STICKERS: StickerData[] = [
  { text: "PURO CRUNCH,<br>CERO CUENTO", variant: "default" },
  { text: "CRUNCH MODE ON", variant: "dark" },
  { text: "¿LISTO PARA<br>EL CRUNCH?", variant: "default" },
  { text: "EXTRA CRISPY", variant: "outline" },
  { text: "DIP IT", variant: "default" },
  { text: "MÁS SALSA", variant: "dark" },
  { text: "HECHO CON<br>♥ Y CRUNCH", variant: "default" },
  { text: "CLUCK LOVER", variant: "outline" },
];

function Sticker({ text, variant }: StickerData) {
  const variantClass =
    variant === "dark"
      ? "bg-ink text-yellow shadow-[6px_6px_0_0_var(--color-red)]"
      : variant === "outline"
        ? "bg-bone shadow-hard"
        : "bg-yellow shadow-hard-orange";

  return (
    <span
      className={`[font-family:var(--font-display)] w-[220px] rotate-[-3deg] border-[3px] border-ink p-s3 text-center text-[1.1rem] uppercase leading-[1.2] whitespace-normal [&:nth-child(2n)]:rotate-[2deg] [&:nth-child(3n)]:rotate-[-1.5deg] ${variantClass}`}
      // El texto viene de un array de datos interno y fijo (no input de
      // usuario), así que el <br> controlado acá es seguro.
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
}

export default function StickerWall() {
  return (
    <section className="overflow-hidden border-y-[3px] border-ink bg-cream py-s5">
      <Marquee speed={35} direction={-1} trackClassName="flex gap-s4 w-max">
        {STICKERS.map((sticker, i) => (
          <Sticker key={i} text={sticker.text} variant={sticker.variant} />
        ))}
      </Marquee>
    </section>
  );
}
