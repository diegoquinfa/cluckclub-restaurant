import { createFileRoute } from "@tanstack/react-router";
import { FinalCta, Footer } from "#/components/final-cta";
import { Hero } from "#/components/hero";
import { Menu } from "#/components/menu";
import { Process } from "#/components/process";
import { SiteNav } from "#/components/site-nav";
import StickerWall from "#/components/sticker-wall";
import { Zones } from "#/components/zones";

const SITE_ORIGIN = "https://cluckclub.co";
const OG_IMAGE = `${SITE_ORIGIN}/cluck-club-caja-tenders.png`;

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

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Restaurant",
      "@id": `${SITE_ORIGIN}/#restaurant`,
      name: "Cluck Club",
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/cluck-club-caja-tenders.png`,
      image: `${SITE_ORIGIN}/cluck-club-caja-tenders.png`,
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
      potentialAction: {
        "@type": "OrderAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://wa.me/573026688105?text=Hola%20Cluck%20Club%2C%20quiero%20pedir",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
        deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp",
      },
    },
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
