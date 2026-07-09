import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { HeroTiles } from "@/components/site/HeroTiles";
import {
  StatsSection,
  WhatWeDoSection,
  ProcessSection,
  PortalsSection,
  CtaSection,
} from "@/components/site/HomeSections";
import logoUrl from "@/assets/socialyt-logo.png";

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
            <div className="flex items-center gap-3">
              <img
                src={logoUrl}
                alt="Socialyt"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full shadow-sm ring-1 ring-black/5"
              />
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-foreground/70">
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.58_0.24_259)]" />
                A social-first growth studio
              </span>
            </div>
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
          <HeroTiles />
        </div>
      </section>

      <StatsSection />
      <WhatWeDoSection />
      <ProcessSection />
      <PortalsSection />
      <CtaSection />
    </SiteLayout>
  );
}
