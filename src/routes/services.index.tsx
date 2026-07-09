import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LayoutGrid, Package } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Socialyt" },
      {
        name: "description",
        content:
          "Individual plans or bundled packages — pick the path that fits your growth.",
      },
      { property: "og:title", content: "Services — Socialyt" },
      {
        property: "og:description",
        content: "Individual plans or bundled packages built for growth.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Services
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Two ways to work
            <br />
            with <span className="text-gradient-brand">Socialyt.</span>
          </h1>
        </Reveal>
        <Reveal delay={220}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Pick a single service, or bundle a full growth package. Either way, the
            work is crafted end-to-end by our team.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <Reveal delay={100}>
            <Link to="/services/individual-plans" className="block h-full">
              <GlassCard strong className="group relative h-full overflow-hidden p-10 hover:-translate-y-1 md:p-14">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(10,92,255,0.3),transparent_70%)] blur-3xl" />
                <LayoutGrid className="h-8 w-8 text-[oklch(0.58_0.24_259)]" />
                <h2 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">Individual Plans</h2>
                <p className="mt-3 text-muted-foreground">Pick exactly what you need — a website, ads, or creatives.</p>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </GlassCard>
            </Link>
          </Reveal>

          <Reveal delay={200}>
            <Link to="/services/packages" className="block h-full">
              <GlassCard strong className="group relative h-full overflow-hidden p-10 hover:-translate-y-1 md:p-14">
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(120,160,255,0.35),transparent_70%)] blur-3xl" />
                <Package className="h-8 w-8 text-[oklch(0.58_0.24_259)]" />
                <h2 className="mt-8 text-3xl font-semibold tracking-tight md:text-4xl">Packages</h2>
                <p className="mt-3 text-muted-foreground">Bundled solutions for every stage of growth.</p>
                <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                  Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </GlassCard>
            </Link>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}