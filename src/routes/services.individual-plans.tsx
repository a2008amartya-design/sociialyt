import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe, Sparkles, Rocket } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/individual-plans")({
  head: () => ({
    meta: [
      { title: "Individual Plans — Socialyt" },
      { name: "description", content: "Standalone services: websites, ad creatives, and Meta ad campaigns." },
      { property: "og:title", content: "Individual Plans — Socialyt" },
      { property: "og:url", content: "/services/individual-plans" },
    ],
    links: [{ rel: "canonical", href: "/services/individual-plans" }],
  }),
  component: Page,
});

const plans = [
  { icon: Globe, label: "Website", name: "Digital HQ", copy: "A home on the internet that earns trust before you ever speak. Fast, mobile-first, SEO-ready, with the contact forms that turn visitors into conversations." },
  { icon: Sparkles, label: "Advertisements", name: "Conversion Creatives", copy: "Editorial-grade ad creatives engineered around one job — moving a real person to click, message, or buy. Copy, visuals and hook, considered." },
  { icon: Rocket, label: "Meta Ads", name: "Scale Engine", copy: "Facebook and Instagram campaigns run like a growth desk — audience, budget and creative iterated weekly against the outcome that matters to you." },
];

function Page() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-6 py-20">
        <Reveal>
          <Link to="/services" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight md:text-6xl">
            Individual <span className="text-gradient-brand">Plans</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">Pick exactly the piece your business needs today. Add more when you're ready.</p>
        </Reveal>

        <div className="mt-16 space-y-6">
          {plans.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <Link to="/contact" className="block">
                <GlassCard className="group p-8 transition hover:-translate-y-1 md:p-12">
                  <div className="grid gap-6 md:grid-cols-[1fr_2fr] md:items-center">
                    <div>
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                        <p.icon className="h-5 w-5" />
                      </div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{p.label}</p>
                      <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{p.name}</h2>
                    </div>
                    <div>
                      <p className="text-base leading-relaxed text-foreground/80 md:text-lg">{p.copy}</p>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                        Get started <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]">
              Interested in a plan? Let's talk <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}