import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MarqueeProps = {
  children: React.ReactNode;
  speed?: number;
  direction?: number;
  className?: string;
  trackClassName?: string;
  pauseOnHover?: boolean;
};

/**
 * Marquee — loop horizontal infinito genérico.
 *
 * Reemplaza a buildMarquee() del script original. Duplica su contenido
 * una sola vez (vía clones reales en el DOM, no innerHTML += innerHTML,
 * para que React no pierda el rastro de los nodos) y anima el track
 * completo con GSAP en loop infinito.
 *
 * Uso:
 *   <Marquee speed={60}>
 *     <span>EXTRA CRISPY</span>
 *     <span>•</span>
 *     <span>DIP IT</span>
 *   </Marquee>
 */
export function Marquee({
  children,
  speed = 50,
  direction = -1,
  className = "",
  trackClassName = "",
  pauseOnHover = false,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container || typeof gsap === "undefined") return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    const gap = getGap(track);
    container.style.gap = `${gap}px`;

    const setWidth = track.scrollWidth + gap;

    // Clonamos el contenido las veces necesarias para cubrir el ancho del
    // contenedor (+1 extra), no solo una vez: si el set original es más
    // angosto que la pantalla, un solo clon deja un hueco vacío visible
    // al final del ciclo en vez de un loop continuo.
    const copiesNeeded = Math.max(
      1,
      Math.ceil(container.clientWidth / setWidth) + 1,
    );
    const clones: HTMLElement[] = [];
    for (let i = 0; i < copiesNeeded; i++) {
      const clone = track.cloneNode(true) as HTMLElement;
      clone.setAttribute("aria-hidden", "true");
      container.appendChild(clone);
      clones.push(clone);
    }

    const tween = gsap.to([track, ...clones], {
      x: direction * setWidth,
      duration: setWidth / speed,
      repeat: -1,
      ease: "none",
    });
    tweenRef.current = tween;

    return () => {
      tween.kill();
      clones.forEach((clone) => clone.remove());
      gsap.set([track], { x: 0 });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed, direction]);

  function getGap(el: HTMLElement) {
    const styles = window.getComputedStyle(el);
    return parseFloat(styles.gap || styles.columnGap || "0") || 0;
  }

  function handleMouseEnter() {
    if (pauseOnHover && tweenRef.current) tweenRef.current.pause();
  }
  function handleMouseLeave() {
    if (pauseOnHover && tweenRef.current) tweenRef.current.play();
  }

  return (
    <div
      ref={containerRef}
      className={`marquee ${className}`}
      style={{ display: "flex" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={trackRef} className={`marquee__track ${trackClassName}`}>
        {children}
      </div>
    </div>
  );
}
