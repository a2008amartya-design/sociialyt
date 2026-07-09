import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Megaphone, Video, TrendingUp } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { Hero3D } from "@/components/site/Hero3D";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 pt-16 pb-24 md:grid-cols-2 md:pt-24 md:pb-32">
        <div className="relative z-10">
          <Reveal>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-foreground/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.58_0.24_259)]" />
              A social-first growth studio
            </span>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="mt-6 text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
              We turn attention
              <br />
              into <span className="text-gradient-brand">growth.</span>
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-6 max-w-lg text-lg text-muted-foreground md:text-xl">
              Socialyt is your full-stack growth partner — websites, Meta ads,
              video creatives and organic social growth, all in one place.
            </p>
          </Reveal>
          <Reveal delay={360}>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
              >
                Explore Services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/contact"
                className="glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-foreground transition hover:scale-[1.03]"
              >
                Start a Conversation
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="relative flex items-center justify-center">
          <Hero3D />
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal>
          <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Numbers that speak for us
          </p>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { n: "99+", l: "Qualified leads generated" },
            { n: "3.8×", l: "Avg. conversion lift" },
            { n: "₹1.9L+", l: "Client revenue attributed" },
            { n: "68%", l: "Client retention" },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 100}>
              <GlassCard className="p-6 md:p-8">
                <div className="text-4xl font-semibold text-gradient-brand md:text-5xl">
                  {s.n}
                </div>
                <div className="mt-3 text-sm text-muted-foreground">{s.l}</div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                What we do
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
                Four disciplines,
                <br />
                one growth engine.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Every service is designed to compound with the others — a system
                that turns strangers into customers.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { i: Globe, t: "Website Design", d: "Professional, mobile-optimized sites." },
              { i: Megaphone, t: "Meta Ads", d: "Facebook & Instagram ad campaigns." },
              { i: Video, t: "Video Advertisements", d: "High-grade creative production." },
              { i: TrendingUp, t: "Organic Growth", d: "Handle growth & engagement." },
            ].map(({ i: Icon, t, d }, idx) => (
              <Reveal key={t} delay={idx * 100}>
                <Link to="/services" className="block h-full">
                  <GlassCard className="group h-full p-6 hover:-translate-y-1">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </GlassCard>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <GlassCard strong className="relative overflow-hidden p-10 text-center md:p-16">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(10,92,255,0.35),transparent_70%)] blur-3xl" />
            <h2 className="relative text-4xl font-semibold tracking-tight md:text-6xl">
              Ready to grow with <span className="text-gradient-brand">Socialyt?</span>
            </h2>
            <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
              One conversation is all it takes to design your growth engine.
            </p>
            <Link
              to="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
            >
              Get in Touch
              <ArrowRight className="h-4 w-4" />
            </Link>
          </GlassCard>
        </Reveal>
      </section>
    </SiteLayout>
  );
}
