import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Compass,
  Hammer,
  Rocket,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { SiteLayout } from "./SiteLayout";
import { GlassCard } from "./GlassCard";
import { Reveal } from "./Reveal";

export interface IncludeItem {
  label: string;
  blurb?: string;
  icon?: LucideIcon;
}

interface Props {
  name: string;
  tagline: string;
  includes: Array<IncludeItem | string>;
  perfectFor?: string;
  bestFor?: string;
  optional?: string;
  ctaLabel?: string;
  eyebrow?: string;
}

const steps: { icon: LucideIcon; title: string; copy: string }[] = [
  { icon: Compass, title: "Discovery Call", copy: "We learn your business and goals." },
  { icon: Hammer, title: "Build", copy: "We design and build your package." },
  { icon: Rocket, title: "Launch", copy: "Your new presence goes live." },
  { icon: TrendingUp, title: "Grow", copy: "We support and optimize as you scale." },
];

export function PackageDetail({
  name,
  tagline,
  includes,
  perfectFor,
  bestFor,
  optional,
  ctaLabel = "Start a Conversation",
  eyebrow = "Package",
}: Props) {
  const items: IncludeItem[] = includes.map((it) =>
    typeof it === "string" ? { label: it } : it,
  );
  return (
    <SiteLayout>
      <section className="relative mx-auto max-w-5xl px-6 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-40 -z-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(10,92,255,0.22),transparent_70%)] blur-3xl motion-safe:animate-[drift_18s_ease-in-out_infinite]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-[560px] -z-10 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(120,160,255,0.22),transparent_70%)] blur-3xl motion-safe:animate-[drift_22s_ease-in-out_infinite_reverse]"
        />
        <Reveal>
          <Link
            to="/services/packages"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Packages
          </Link>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={160}>
          <h1 className="mt-3 text-5xl font-semibold tracking-tight md:text-7xl">
            <span className="text-gradient-brand">{name}</span>
          </h1>
        </Reveal>
        <Reveal delay={240}>
          <p className="mt-6 max-w-2xl text-xl text-muted-foreground md:text-2xl">
            {tagline}
          </p>
        </Reveal>

        <div className="mt-16 space-y-6">
          <Reveal delay={120}>
            <GlassCard strong className="p-8 md:p-10">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Includes
              </h3>
              <ul className="mt-6 flex flex-col divide-y divide-border/50">
                {items.map(({ label, blurb, icon: Icon }) => (
                  <li
                    key={label}
                    className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      {Icon ? <Icon className="h-4 w-4" strokeWidth={1.75} /> : <Check className="h-4 w-4" />}
                    </span>
                    <div className="min-w-0">
                      <p className="break-words text-base font-medium text-foreground md:text-lg">
                        {label}
                      </p>
                      {blurb && (
                        <p className="mt-1 break-words text-sm text-muted-foreground">
                          {blurb}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              {optional && (
                <p className="mt-8 rounded-2xl border border-dashed border-border/70 bg-white/40 p-4 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground/80">Optional add-on:</span>{" "}
                  {optional}
                </p>
              )}
            </GlassCard>
          </Reveal>

          {(perfectFor || bestFor) && (
            <Reveal delay={200}>
              <GlassCard className="p-8">
                <p className="text-sm md:text-base">
                  <span className="font-semibold">
                    {perfectFor ? "Perfect for:" : "Best for:"}
                  </span>{" "}
                  <span className="text-muted-foreground">{perfectFor ?? bestFor}</span>
                </p>
                <Link
                  to="/services/packages"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  Not sure this is the right fit? See the other packages
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </GlassCard>
            </Reveal>
          )}
        </div>

        <Reveal delay={160}>
          <div className="mt-20">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              How it works
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <GlassCard key={s.title} className="p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <s.icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Step {i + 1}
                    </span>
                  </div>
                  <h4 className="mt-4 text-lg font-semibold tracking-tight">{s.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{s.copy}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
            >
              {ctaLabel} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
      </section>
    </SiteLayout>
  );
}