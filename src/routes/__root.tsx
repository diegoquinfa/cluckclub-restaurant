import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { useState } from "react";

import { CartDrawer } from "#/components/cart/cart-drawer";
import { CartFab } from "#/components/cart/cart-fab";
import { NotFound } from "#/components/not-found";
import appCss from "../styles.css?url";

const archivoBlackFont = "/Archivo_Black/ArchivoBlack-Regular.woff2";
const spaceGroteskFont = "/Space_Grotesk/SpaceGrotesk-VariableFont_wght.woff2";
const jetBrainsMonoFont =
  "/JetBrains_Mono/JetBrainsMono-VariableFont_wght.woff2";

const SITE_ORIGIN = "https://cluckclub.co";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#ffc42e",
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        title: "Cluck Club | Tenders y alitas crujientes en Cartagena",
      },
      {
        name: "description",
        content:
          "Cluck Club: cocina oculta en Cartagena. Tenders empanizados, alitas, hamburguesas y perros calientes. Pide por WhatsApp y recibe en tu casa.",
      },
      {
        name: "author",
        content: "Cluck Club",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "canonical",
        href: SITE_ORIGIN,
      },
      {
        rel: "icon",
        href: "/favicon.ico",
      },
      {
        rel: "apple-touch-icon",
        href: "/food/crispy_tenders.webp",
      },
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "preload",
        href: archivoBlackFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: spaceGroteskFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      {
        rel: "preload",
        href: jetBrainsMonoFont,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
    ],
    scripts: [
      {
        src: "https://analytics.ahrefs.com/analytics.js",
        async: true,
        "data-key": "owM7XDPnaHLmqr7xq14nyg",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <html lang="es-CO">
      <head>
        <HeadContent />
        <style>{`
          @font-face {
            font-family: 'Archivo Black';
            src: url('${archivoBlackFont}') format('woff2');
            font-style: normal;
            font-weight: 400;
            font-display: swap;
          }

          @font-face {
            font-family: 'Space Grotesk';
            src: url('${spaceGroteskFont}') format('woff2');
            font-style: normal;
            font-weight: 300 700;
            font-display: swap;
          }

          @font-face {
            font-family: 'JetBrains Mono';
            src: url('${jetBrainsMonoFont}') format('woff2');
            font-style: normal;
            font-weight: 100 800;
            font-display: swap;
          }
        `}</style>
      </head>
      <body>
        {children}
        <CartFab onOpen={() => setCartOpen(true)} />
        <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
