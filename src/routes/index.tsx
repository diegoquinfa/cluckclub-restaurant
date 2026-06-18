import { FinalCta, Footer } from "#/components/final-cta";
import { Hero } from "#/components/hero";
import { Menu } from "#/components/menu";
import { Process } from "#/components/process";
import { SiteNav } from "#/components/site-nav";
import StickerWall from "#/components/sticker-wall";
import { Zones } from "#/components/zones";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
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
  );
}
