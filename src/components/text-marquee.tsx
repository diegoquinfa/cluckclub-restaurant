import { Marquee } from "./marquee";

/**
 * TextMarquee — la franja negra de texto en loop ("EXTRA CRISPY • CRUNCH
 * MODE ON • ..."). Equivalente a buildMarquee('.marquee__track', 60, -1).
 */
const WORDS = [
  "EXTRA CRISPY",
  "CRUNCH MODE ON",
  "DIP IT",
  "MÁS SALSA",
  "HECHO CON CRUNCH",
];

export default function TextMarquee() {
  return (
    <Marquee
      speed={60}
      direction={-1}
      className="border-t-[3px] border-ink bg-ink py-s3"
      trackClassName="flex items-center gap-s4"
    >
      {WORDS.map((word, i) => (
        <span
          key={i}
          className="flex items-center gap-s4 whitespace-nowrap font-sans text-lg font-bold uppercase tracking-wide text-yellow md:text-xl"
        >
          {word}
          <span aria-hidden="true" className="text-orange">
            •
          </span>
        </span>
      ))}
    </Marquee>
  );
}
