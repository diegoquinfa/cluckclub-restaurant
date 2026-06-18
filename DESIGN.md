# Cluck Club — Design System
**Puro crunch, cero cuento.**

Sistema de diseño brutalista para Cluck Club, marca de pollo frito (tenders) en Cartagena. Este documento acompaña la landing page funcional (`index.html`) y sirve como referencia para mantener consistencia en cualquier pieza nueva: app de pedidos, redes sociales, señalética física, empaques digitales.

---

## 1. Filosofía

Cluck Club no es fast food genérico — el packaging real ya lo dice: "NO ES FAST FOOD, ES CLUCK CLUB". El sistema visual tiene que sentirse igual de directo que esa frase.

**Brutalismo con alma de fuego.** Tomamos la crudeza del brutalismo (bordes duros, sombras offset, sin curvas innecesarias, tipografía que ocupa espacio sin pedir permiso) y la cruzamos con la calidez del producto: fuego, crunch, salsa. El resultado no es frío ni distante — es directo, callejero, con hambre.

Tres reglas que gobiernan cada decisión:
1. **Nada de medias tintas.** Los bordes son gruesos o no existen. Las sombras son duras (offset sólido) o no hay sombra. Nunca un `box-shadow` difuso de Bootstrap.
2. **La tipografía hace el trabajo pesado.** Si una sección necesita "más energía", la respuesta casi siempre es subir el tamaño de letra antes que agregar decoración.
3. **El fuego es el acento, no el fondo.** El naranja y el rojo gritan; se usan para puntuar (CTAs, tags, subrayados), no para empapelar pantallas completas salvo en momentos de cierre/impacto (como el CTA final).

---

## 2. Color

| Token | Hex | Uso |
|---|---|---|
| `--cluck-yellow` | `#FFC42E` | Color base de marca. Fondos de cards destacadas, acentos cálidos. |
| `--cluck-yellow-deep` | `#F2A900` | Variante más saturada para profundidad en gradientes e ilustraciones. |
| `--cluck-orange` | `#E8540C` | Acento primario. Sombras offset, CTAs secundarios, bordes de marca. |
| `--cluck-red` | `#C62A0A` | Urgencia / acción principal. Botones de conversión, tags "más pedido". |
| `--cluck-black` | `#1A1410` | Negro tostado (no negro puro). Texto, bordes, fondos oscuros. |
| `--cluck-cream` | `#F3E9D2` | Fondo base tipo papel kraft — referencia directa a la bolsa de delivery. Usado en secciones de contenido (menú, stickers), no en el hero. |
| `--cluck-white` | `#FFF8EC` | Blanco hueso. Texto sobre fondos oscuros, cards claras. |

**Jerarquía de fondos por sección:** el hero y el nav usan amarillo (`--cluck-yellow` → `--cluck-yellow-deep` en gradiente) porque son el primer punto de contacto — necesitan la energía de marca al máximo desde el segundo cero. El resto de las secciones de contenido (proceso en negro, menú y stickers en crema, CTA final en naranja) alternan para generar ritmo visual al bajar por la página. El crema queda reservado para tramos de lectura donde no querés competir con el color de marca.

**Por qué no negro puro ni blanco puro:** el packaging real usa kraft paper y tonos cálidos. Un negro `#000` o blanco `#FFF` se vería frío y genérico — rompería la coherencia con el empaque físico que ya existe.

**Regla de contraste:** el rojo (`--cluck-red`) nunca compite con el naranja en el mismo elemento. El rojo es para un solo CTA dominante por vista; si hay dos botones, el segundo va en negro o transparente con borde.

---

## 3. Tipografía

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Archivo Black** | Headlines, títulos de sección, números grandes. Siempre mayúsculas. |
| Body | **Space Grotesk** | Párrafos, descripciones, navegación. Peso 500–600 por defecto. |
| Mono / Utility | **JetBrains Mono** | Precios, labels, eyebrows, botones, metadata. Le da textura de "ticket de cocina". |

**Por qué esta combinación:** Archivo Black tiene el peso industrial que necesita el brutalismo sin volverse una geométrica fría tipo Helvetica Bold (que ya usa medio internet). Space Grotesk mantiene calidez técnica en el cuerpo de texto. JetBrains Mono aporta el detalle de "comanda de cocina" / "recibo" que conecta con la experiencia real de pedir comida.

**Escala tipográfica (desktop → mobile vía `clamp()`):**
- Hero / CTA final: `clamp(2.5rem, 9vw, 6rem)`
- Section title: `clamp(2.5rem, 7vw, 5.5rem)`
- Card title: `1.6rem`
- Body: `1rem`
- Eyebrow / mono labels: `0.65–0.95rem`

**Texto outline (`-webkit-text-stroke`):** se usa para la segunda palabra clave de un titular de tres líneas (ej. "FAST FOOD" en el hero, "CRUNCH" en el menú). Nunca más de una palabra por composición — es un acento, no un patrón repetible.

---

## 4. Estructura y espaciado

Sistema de espaciado en escala fija, no arbitraria:

```
--space-1: 0.5rem   (8px)   — gaps internos pequeños
--space-2: 1rem     (16px)  — padding de componentes chicos
--space-3: 1.5rem   (24px)  — padding de cards, gaps de grid
--space-4: 2.5rem   (40px)  — padding de secciones en mobile
--space-5: 4rem     (64px)  — padding de secciones en desktop
--space-6: 7rem     (112px) — separación entre bloques mayores
```

**Bordes:** dos grosores únicamente. `3px` (`--border-w`) para componentes estándar, `5px` (`--border-w-lg`) para elementos hero/signature. Nunca `1px` ni `2px` — se ve a medias en un sistema brutalista.

**Sombras:** siempre offset duro, nunca blur (excepto el vapor del hero, que es el único elemento "atmosférico" permitido). Patrón: `Npx Npx 0 0 color`. El color de la sombra es siempre un acento de marca (naranja, rojo o negro), nunca gris.

**Radius:** `0px` por defecto en todo. Las únicas excepciones son elementos que imitan objetos reales redondos (el cup de salsa, los tenders) — ahí el radius existe porque el objeto real lo tiene, no por estética de UI.

---

## 5. Componentes

### Botones
Tres variantes:
- **`.btn`** — negro con sombra naranja. Uso general / navegación.
- **`.btn--lg`** — rojo con sombra negra, tamaño aumentado. CTA principal de conversión.
- **`.btn--outline`** — transparente con sombra naranja. CTA secundario, siempre acompañando a uno primario.

Comportamiento: todos los botones se desplazan `-4px, -4px` en hover y aumentan la sombra, simulando que se "despegan" de la superficie. Al hacer click, vuelven a su posición original con sombra mínima — sensación física de botón presionado.

### Cards de menú
Card base blanca con borde negro y sombra negra. La variante `--featured` (más pedido) usa fondo amarillo para diferenciarse sin salir del sistema de color. El tag flotante (`MÁS PEDIDO`) siempre en rojo, posicionado parcialmente fuera del borde superior de la card — rompe el contenedor a propósito, gesto típico brutalista.

### Stickers / marquee
Inspirados directamente en el sticker pack real de la marca. Rotación aleatoria sutil (entre -3° y 2°) para que no se vean perfectamente alineados — la imperfección es parte del lenguaje visual, como si fueran stickers físicos pegados a mano.

### El Box (elemento signature)
La caja de Cluck Club abriéndose es el elemento que ancla toda la identidad digital — igual que la caja física ancla el unboxing real del producto. Se anima una sola vez al cargar el hero (apertura de tapas, aparición de tenders y vapor) y luego queda como elemento estático con parallax sutil en scroll. No se repite en otras secciones para que mantenga su peso como momento único.

---

## 6. Movimiento (GSAP)

### Principios de animación
1. **Una secuencia orquestada en el hero, no efectos sueltos.** Toda la entrada (caja, vapor, titular, meta-cards) es una sola timeline coordinada — sensación de "destape" único, no de elementos apareciendo al azar.
2. **Scroll storytelling en la sección de proceso.** Cada paso del "unboxing" (marinado → empanizado → salsa → entrega) se revela al entrar en viewport, reforzando la metáfora de ir destapando el pedido a medida que se hace scroll.
3. **El motion nunca esconde contenido permanentemente.** Todo elemento animado tiene un estado visible por defecto en CSS; las clases que ocultan elementos antes de animarlos solo se activan si GSAP carga correctamente (`.js-ready` en `<html>`). Si el script falla o el CDN no carga, el usuario ve el contenido completo, estático, sin animación — nunca una página rota.
4. **`prefers-reduced-motion` se respeta siempre.** Si el sistema operativo del usuario lo solicita, todas las animaciones se omiten y el contenido aparece directo.

### Mapa de animaciones por sección
| Sección | Animación | Trigger |
|---|---|---|
| Hero | Timeline de apertura de caja + vapor + reveal de titular | Carga de página (con 0.2s delay) |
| Hero | Parallax sutil de caja y texto de fondo | Scroll dentro del hero (`scrub`) |
| Proceso | Fade + slide up por step, ícono con rotación de entrada | Scroll into view (cada `.step`) |
| Marquee / Stickers | Loop horizontal infinito | Automático, continuo |
| Menú | Reveal de título y stagger de cards | Scroll into view |
| CTA final | Punch-in de título + stagger de botones | Scroll into view |

---

## 7. Voz y copy

Tono: directo, informal, colombiano, con humor seco. Verbos en imperativo o presente, nunca corporativo.

- Sí: "NO ES FAST FOOD", "Lo escuchás antes de morderlo", "Porque nunca alcanza"
- No: "Disfruta de nuestra deliciosa propuesta gastronómica"

Los CTAs describen la acción exacta, no genéricos: "PEDIR POR WHATSAPP" en vez de "Contáctanos", "+ AGREGAR" en vez de "Comprar ahora".

---

## 8. Accesibilidad y rendimiento

- Contraste verificado: texto negro sobre amarillo/naranja cumple AA; texto crema sobre negro cumple AAA.
- Focus visible con outline rojo de 3px en todos los elementos interactivos.
- `prefers-reduced-motion` respetado en toda la timeline de GSAP.
- Todo el contenido es accesible sin JavaScript — el motion es una mejora progresiva, nunca un requisito para ver contenido.

---

## 9. Archivos del sistema

```
cluck-club/
├── index.html      → estructura + contenido
├── style.css       → design tokens + todos los estilos
└── script.js       → sistema de animación GSAP (con fallback seguro)
```

Para extender el sistema (nueva sección, nuevo componente), parte siempre de los tokens en `:root` del `style.css` — nunca un color o medida hardcodeada nueva sin pasar primero por la tabla de la sección 2 y 4 de este documento.
