import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, Footer } from "#/components/final-cta";
import { Hero } from "#/components/hero";
import { Menu } from "#/components/menu";
import { Process } from "#/components/process";
import { SiteNav } from "#/components/site-nav";
import StickerWall from "#/components/sticker-wall";
import { Zones } from "#/components/zones";

const SITE_ORIGIN = "https://cluckclub.co";
const OG_IMAGE = `${SITE_ORIGIN}/og_web_cluckclub.webp`;
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_ALT =
  "Caja de tenders crujientes recién fritos de Cluck Club, cocina oculta en Cartagena";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cluck Club | Tenders y alitas crujientes en Cartagena",
      },
      {
        name: "description",
        content:
          "Cluck Club: cocina oculta en Cartagena. Tenders empanizados a mano, alitas, hamburguesas y perros calientes. Pedí por WhatsApp y recibí en tu casa.",
      },
      // Open Graph
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:url",
        content: SITE_ORIGIN,
      },
      {
        property: "og:site_name",
        content: "Cluck Club",
      },
      {
        property: "og:title",
        content: "Cluck Club | Tenders y alitas crujientes en Cartagena",
      },
      {
        property: "og:description",
        content:
          "Cocina oculta en Cartagena. Tenders empanizados a mano, alitas, hamburguesas y perros calientes. Pedí por WhatsApp.",
      },
      {
        property: "og:image",
        content: OG_IMAGE,
      },
      {
        property: "og:image:secure_url",
        content: OG_IMAGE,
      },
      {
        property: "og:image:type",
        content: "image/webp",
      },
      {
        property: "og:image:width",
        content: String(OG_IMAGE_WIDTH),
      },
      {
        property: "og:image:height",
        content: String(OG_IMAGE_HEIGHT),
      },
      {
        property: "og:image:alt",
        content: OG_IMAGE_ALT,
      },
      {
        property: "og:locale",
        content: "es_CO",
      },
      // Twitter Card
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: "Cluck Club | Tenders y alitas crujientes en Cartagena",
      },
      {
        name: "twitter:description",
        content:
          "Cocina oculta en Cartagena. Tenders empanizados a mano, alitas, hamburguesas y perros calientes. Pedí por WhatsApp.",
      },
      {
        name: "twitter:image",
        content: OG_IMAGE,
      },
    ],
    links: [
      {
        rel: "canonical",
        href: SITE_ORIGIN,
      },
    ],
  }),
  component: Home,
});

const MENU_JSON_LD = {
  "@type": "Menu",
  "@id": `${SITE_ORIGIN}/#menu`,
  name: "Carta Cluck Club",
  inLanguage: "es-CO",
  hasMenuSection: [
    {
      "@type": "MenuSection",
      name: "Platos Fuertes",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "DoggiCluck x 2 + papas",
          description:
            "Perros x 2 con tenders, cheddar y tocineta crunch + papas",
          offers: {
            "@type": "Offer",
            price: "23000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Big Cluck + papas",
          description:
            "Hamburguesa de churrasco de pollo apanado con queso munster",
          offers: {
            "@type": "Offer",
            price: "24000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Botanera Cluck + papas",
          description:
            "Hamburguesa de pollo apanado con doritos y guacamole",
          offers: {
            "@type": "Offer",
            price: "26000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Cluckii Wrap + papas",
          description:
            "Burrito relleno de tenders, queso mozzarella y cheddar",
          offers: {
            "@type": "Offer",
            price: "25000",
            priceCurrency: "COP",
          },
        },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Pollo & Alitas",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Tenders x4 + papas",
          description: "Tenders de pollo 65gr c/u, empanizados a mano + papas",
          offers: {
            "@type": "Offer",
            price: "21000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Tenders x8 + papas",
          description: "Tenders de pollo 65gr c/u, empanizados a mano + papas",
          offers: {
            "@type": "Offer",
            price: "38000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Tenders x12 + papas",
          description: "Tenders de pollo 65gr c/u, empanizados a mano + papas",
          offers: {
            "@type": "Offer",
            price: "55000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Cluck Wings + papas",
          description:
            "Alitas glaseadas a mano. 5 sabores. Mínimo 6 unidades.",
          offers: {
            "@type": "Offer",
            price: "2500",
            priceCurrency: "COP",
            eligibleQuantity: {
              "@type": "QuantitativeValue",
              minValue: 6,
            },
          },
        },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Acompañamientos",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Cluck Fries",
          description:
            "2 tenders + papas a la francesa + salsa de la casa + cheddar + tocineta + cebollín fresco",
          offers: {
            "@type": "Offer",
            price: "19000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Aros de cebolla",
          offers: {
            "@type": "Offer",
            price: "4000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Papas 120g",
          offers: {
            "@type": "Offer",
            price: "4000",
            priceCurrency: "COP",
          },
        },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Salsas extra",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "GuacaCluck",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Salsa de la casa",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Miel picante",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Miel mostaza",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Bbq",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Ajo parmesano",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Salsa búfalo",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
      ],
    },
    {
      "@type": "MenuSection",
      name: "Bebidas",
      hasMenuItem: [
        {
          "@type": "MenuItem",
          name: "Agua",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Kola Roman 250 ml",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Coca Cola Zero 250 ml",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Manzana 250 ml",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Pepsi 250 ml",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
        {
          "@type": "MenuItem",
          name: "Colombiana 250 ml",
          offers: {
            "@type": "Offer",
            price: "3000",
            priceCurrency: "COP",
          },
        },
      ],
    },
  ],
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${SITE_ORIGIN}/#restaurant`,
      name: "Cluck Club",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/food/crispy_tenders.webp`,
      image: `${SITE_ORIGIN}/og_web_cluckclub.webp`,
      telephone: "+57-302-6688105",
      priceRange: "$$",
      servesCuisine: ["Pollo frito", "Comida rápida artesanal", "Americana"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cartagena",
        addressRegion: "Bolívar",
        addressCountry: "CO",
      },
      areaServed: {
        "@type": "City",
        name: "Cartagena",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "17:00",
          closes: "23:00",
        },
      ],
      sameAs: ["https://www.instagram.com/cluckclub.col"],
      hasMenu: { "@id": `${SITE_ORIGIN}/#menu` },
      potentialAction: {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://wa.me/573026688105?text=Hola%20Cluck%20Club%2C%20quiero%20pedir",
          actionPlatform: [
            "https://schema.org/DesktopWebPlatform",
            "https://schema.org/MobileWebPlatform",
          ],
        },
        deliveryMethod: "https://schema.org/ParcelService",
      },
    },
    MENU_JSON_LD,
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_ORIGIN,
      name: "Cluck Club",
      publisher: {
        "@id": `${SITE_ORIGIN}/#restaurant`,
      },
      inLanguage: "es-CO",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Inicio",
          item: SITE_ORIGIN,
        },
      ],
    },
  ],
};

function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
    />
  );
}

function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-cream">
        <SiteNav />
        <Hero />
        <Menu />
        <Process />
        <Zones />
        <StickerWall />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
