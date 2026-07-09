import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/packages/")({
  head: () => ({
    meta: [
      { title: "Packages — Socialyt" },
      { name: "description", content: "Bundled growth packages — Foundation, Convert and Custom." },
      { property: "og:title", content: "Packages — Socialyt" },
      { property: "og:url", content: "/services/packages" },
    ],
    links: [{ rel: "canonical", href: "/services/packages" }],
  }),
  component: PackagesIndex,
});

const packs = [
  { to: "/services/packages/foundation", name: "Foundation", tag: "Everything your business needs to exist professionally online.", featured: false },
  { to: "/services/packages/convert", name: "Convert", tag: "Built to turn attention into customers.", featured: true },
  { to: "/services/packages/custom", name: "Custom", tag: "A solution built specifically for your business.", featured: false },
] as const;

function PackagesIndex() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-7xl">
            Growth <span className="text-gradient-brand">Packages</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Bundled solutions for every stage of growth. Start where you are; scale when you're ready.</p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {packs.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <Link to={p.to} className="block h-full">
                <GlassCard
                  strong={p.featured}
                  className={`group relative h-full overflow-hidden p-8 hover:-translate-y-1 md:p-10 ${p.featured ? "ring-1 ring-[oklch(0.58_0.24_259)]/40" : ""}`}
                >
                  {p.featured && (
                    <span className="absolute right-4 top-4 rounded-full bg-[oklch(0.58_0.24_259)] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                  {p.featured && (
                    <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,92,255,0.35),transparent_70%)] blur-2xl" />
                  )}
                  <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">{p.name}</h2>
                  <p className="mt-3 text-sm text-muted-foreground">{p.tag}</p>
                  <span className="mt-10 inline-flex items-center gap-1.5 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                    Learn more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}