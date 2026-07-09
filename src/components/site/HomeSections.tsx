import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  animate,
  type MotionValue,
} from "motion/react";
import {
  ArrowRight,
  Compass,
  Globe,
  Hammer,
  Megaphone,
  Play,
  Rocket,
  Sparkles,
  TrendingUp,
  Video,
} from "lucide-react";
import { GlassCard } from "./GlassCard";

const EASE = [0.22, 1, 0.36, 1] as const;
const DUR = 1.0;

/* ------------------------------ COUNT-UP ------------------------------- */

function useCountUp(
  target: number,
  play: boolean,
  { duration = 1.2, decimals = 0 }: { duration?: number; decimals?: number } = {},
) {
  const [display, setDisplay] = useState(0);
  const mv = useMotionValue(0);
  useEffect(() => {
    if (!play) return;
    const controls = animate(mv, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
    });
    return () => controls.stop();
  }, [play, target, duration, mv]);
  return decimals > 0 ? display.toFixed(decimals) : Math.round(display).toString();
}

/* ------------------------------ STATS ---------------------------------- */

type Stat = { value: number; suffix?: string; prefix?: string; decimals?: number; label: string };

const STATS: Stat[] = [
  { value: 99, suffix: "+", label: "Qualified leads generated" },
  { value: 3.8, suffix: "×", decimals: 1, label: "Avg. conversion lift" },
  { value: 1.9, prefix: "₹", suffix: "L+", decimals: 1, label: "Client revenue attributed" },
  { value: 68, suffix: "%", label: "Client retention" },
];

export function StatsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Ambient sketching graph */}
      <svg
        aria-hidden
        viewBox="0 0 1200 200"
        className="pointer-events-none absolute inset-x-0 top-16 h-32 w-full opacity-70"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="stroke-g" x1="0" x2="1">
            <stop offset="0%" stopColor="oklch(0.58 0.24 259)" stopOpacity="0.05" />
            <stop offset="50%" stopColor="oklch(0.58 0.24 259)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="oklch(0.58 0.24 259)" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,170 C150,160 250,150 350,120 C500,80 600,90 750,60 C900,30 1050,20 1200,10"
          fill="none"
          stroke="url(#stroke-g)"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.6, ease: EASE }}
        />
        {[0.15, 0.3, 0.5, 0.7, 0.85].map((p, i) => (
          <motion.rect
            key={i}
            x={p * 1200 - 6}
            y={200 - (30 + i * 22)}
            width="4"
            height={20 + i * 22}
            fill="oklch(0.58 0.24 259 / 0.18)"
            rx="2"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.08 }}
            style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
          />
        ))}
      </svg>

      <p className="relative text-center text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Numbers that speak for us
      </p>
      <div className="relative mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
        {STATS.map((s, i) => (
          <StatCard key={s.label} stat={s} index={i} play={inView} reduce={!!reduce} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index, play, reduce }: { stat: Stat; index: number; play: boolean; reduce: boolean }) {
  const value = useCountUp(stat.value, play, { duration: 1.2, decimals: stat.decimals ?? 0 });
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, rotateX: 15, y: 24 }}
      animate={play ? { opacity: 1, rotateX: 0, y: 0 } : undefined}
      transition={{ duration: DUR, ease: EASE, delay: index * 0.1 }}
      style={{ transformPerspective: 900 }}
    >
      <GlassCard className="p-6 md:p-8">
        <div className="text-4xl font-semibold text-gradient-brand md:text-5xl tabular-nums">
          {stat.prefix}
          {value}
          {stat.suffix}
        </div>
        <div className="mt-3 text-sm text-muted-foreground">{stat.label}</div>
      </GlassCard>
    </motion.div>
  );
}

/* ---------------------------- WHAT WE DO ------------------------------- */

const SERVICES = [
  { i: Globe, t: "Website Design", d: "Professional, mobile-optimized sites.", from: "left" as const },
  { i: Megaphone, t: "Meta Ads", d: "Facebook & Instagram ad campaigns.", from: "right" as const },
  { i: Video, t: "Video Advertisements", d: "High-grade creative production.", from: "bottom" as const },
  { i: TrendingUp, t: "Organic Growth", d: "Handle growth & engagement.", from: "back" as const },
];

const fromVariants = {
  left: { x: -80, y: 0, scale: 0.9, opacity: 0 },
  right: { x: 80, y: 0, scale: 0.9, opacity: 0 },
  bottom: { x: 0, y: 80, scale: 0.9, opacity: 0 },
  back: { x: 0, y: 0, scale: 0.7, opacity: 0 },
};

export function WhatWeDoSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-24">
      {/* Distinct scene backdrop: slow-drifting mesh */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.2_259/0.25),transparent_70%)] blur-3xl"
          animate={reduce ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-16 bottom-0 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.08_259/0.35),transparent_70%)] blur-3xl"
          animate={reduce ? undefined : { x: [0, -30, 0], y: [0, -20, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: DUR, ease: EASE }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            What we do
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Four disciplines,
            <br />
            one growth engine.
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Every service is designed to compound with the others — a system that
            turns strangers into customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {SERVICES.map((s, idx) => {
            const initial = reduce ? { opacity: 0 } : fromVariants[s.from];
            return (
              <motion.div
                key={s.t}
                initial={initial}
                animate={inView ? { x: 0, y: 0, scale: 1, opacity: 1 } : undefined}
                transition={{ duration: DUR, ease: EASE, delay: idx * 0.12 }}
              >
                <Link to="/services" className="block h-full">
                  <GlassCard className="group h-full p-6 transition-transform duration-500 hover:-translate-y-1">
                    <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <ServiceIcon which={s.t} play={inView} reduce={!!reduce} />
                    </div>
                    <h3 className="text-lg font-semibold">{s.t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[oklch(0.58_0.24_259)]">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceIcon({ which, play, reduce }: { which: string; play: boolean; reduce: boolean }) {
  if (which === "Website Design") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <motion.rect
          x="3" y="4" width="18" height="16" rx="2"
          initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
        />
        <motion.line
          x1="3" y1="9" x2="21" y2="9"
          initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
          animate={play ? { pathLength: 1 } : undefined}
          transition={{ duration: 0.6, ease: EASE, delay: 0.9 }}
        />
      </svg>
    );
  }
  if (which === "Meta Ads") {
    return (
      <motion.span
        animate={reduce || !play ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex"
      >
        <Megaphone className="h-5 w-5" />
      </motion.span>
    );
  }
  if (which === "Video Advertisements") {
    return (
      <motion.span
        animate={reduce || !play ? undefined : { scale: [1, 1.12, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="inline-flex"
      >
        <Play className="h-5 w-5 fill-current" />
      </motion.span>
    );
  }
  // Organic Growth: rising trend line
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <motion.polyline
        points="3,17 9,12 13,14 21,6"
        initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
        animate={play ? { pathLength: 1 } : undefined}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      <motion.polyline
        points="21,6 21,11 16,6"
        initial={reduce ? { opacity: 1 } : { pathLength: 0 }}
        animate={play ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.5, ease: EASE, delay: 1.2 }}
      />
    </svg>
  );
}

/* ------------------------------ PROCESS -------------------------------- */

const STEPS = [
  { icon: Compass, title: "Discover", desc: "We audit your brand, audience and market." },
  { icon: Sparkles, title: "Strategize", desc: "Blueprint the funnel, creative and channel mix." },
  { icon: Hammer, title: "Build", desc: "Websites, ads and creatives crafted to convert." },
  { icon: Rocket, title: "Grow", desc: "Launch, optimize, and compound results monthly." },
];

export function ProcessSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 30%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.4 });
  const lineScale = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 py-32">
      <div className="max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          How we work
        </p>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          A four-step system,
          <br />
          engineered for growth.
        </h2>
      </div>

      <div className="relative mt-16">
        {/* Base track */}
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block" />
        {/* Progress line */}
        <motion.div
          aria-hidden
          className="absolute left-0 top-6 hidden h-px origin-left bg-gradient-to-r from-[oklch(0.58_0.24_259)] via-[oklch(0.72_0.2_259)] to-[oklch(0.9_0.08_259)] shadow-[0_0_16px_oklch(0.58_0.24_259/0.5)] md:block"
          style={{ scaleX: reduce ? 1 : lineScale, right: 0 }}
        />
        <ol className="grid gap-10 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <StepNode key={s.title} step={s} index={i} progress={progress} reduce={!!reduce} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepNode({
  step,
  index,
  progress,
  reduce,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const threshold = index / STEPS.length + 0.02;
  const active = useTransform(progress, (v) => (v >= threshold ? 1 : 0));
  const [on, setOn] = useState(false);
  useEffect(() => {
    const unsub = active.on("change", (v) => setOn(v > 0.5));
    return unsub;
  }, [active]);
  const Icon = step.icon;

  return (
    <li className="relative">
      <motion.div
        animate={
          reduce
            ? undefined
            : { scale: on ? 1 : 0.85, boxShadow: on ? "0 0 28px oklch(0.58 0.24 259 / 0.5)" : "0 0 0 rgba(0,0,0,0)" }
        }
        transition={{ duration: 0.7, ease: EASE }}
        className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border ${
          on
            ? "border-[oklch(0.58_0.24_259)] bg-[oklch(0.58_0.24_259)] text-white"
            : "border-border bg-background text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <div className="mt-5">
        <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Step {String(index + 1).padStart(2, "0")}
        </div>
        <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
      </div>
    </li>
  );
}

/* ------------------------------- PORTALS ------------------------------- */

export function PortalsSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32"
    >
      {/* Deeper blue wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.94 0.03 259) 30%, oklch(0.9 0.06 259) 70%, transparent 100%)",
        }}
      />
      {/* Drifting particles */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {Array.from({ length: 18 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-[oklch(0.58_0.24_259/0.55)] shadow-[0_0_8px_oklch(0.58_0.24_259/0.8)]"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 71) % 100}%` }}
            animate={reduce ? undefined : { y: [0, -20, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 6 + (i % 5), repeat: Infinity, ease: "easeInOut", delay: -i * 0.4 }}
          />
        ))}
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Ways to work with us
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
            Two doorways into growth.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {[
            {
              to: "/services/individual-plans",
              label: "Individual Plans",
              desc: "Single-service plans for a focused push — websites, ads, or organic growth on their own.",
            },
            {
              to: "/services/packages",
              label: "Packages",
              desc: "Bundled systems designed to compound — the fastest way to a full growth engine.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.to}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 80, rotateX: 12 }}
              animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE, delay: 0.15 + i * 0.15 }}
              style={{ transformPerspective: 1200 }}
            >
              <Link to={p.to} className="group block">
                <GlassCard strong className="relative overflow-hidden p-10 transition-transform duration-500 hover:-translate-y-1 md:p-14">
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-[radial-gradient(circle,oklch(0.58_0.24_259/0.35),transparent_70%)] blur-3xl"
                  />
                  <div className="relative">
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {p.label}
                    </h3>
                    <p className="mt-4 max-w-md text-muted-foreground">{p.desc}</p>
                    <span className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition group-hover:scale-[1.03]">
                      Explore
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </GlassCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- CTA -------------------------------- */

export function CtaSection() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const drifters = [
    { left: "8%", size: 90, delay: 0 },
    { left: "22%", size: 60, delay: 0.4 },
    { left: "38%", size: 110, delay: 0.15 },
    { left: "62%", size: 70, delay: 0.55 },
    { left: "78%", size: 100, delay: 0.3 },
    { left: "90%", size: 55, delay: 0.65 },
  ];

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-6 pb-32 pt-16">
      <GlassCard strong className="relative overflow-hidden p-10 text-center md:p-16">
        {/* Drifting glass tiles echoing the hero */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {drifters.map((d, i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 rounded-2xl border border-white/50 bg-white/40 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(10,50,180,0.35)]"
              style={{ left: d.left, width: d.size, height: d.size }}
              initial={reduce ? { opacity: 0.4, y: 0 } : { opacity: 0, y: 80 }}
              animate={
                inView
                  ? reduce
                    ? { opacity: 0.4 }
                    : { opacity: 0.55, y: -20 - i * 6 }
                  : undefined
              }
              transition={{ duration: 1.6, ease: EASE, delay: d.delay }}
            />
          ))}
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.58_0.24_259/0.35),transparent_70%)] blur-3xl"
        />

        <h2 className="relative text-4xl font-semibold tracking-tight md:text-6xl">
          Ready to grow with{" "}
          <span className="text-gradient-brand">Socialyt?</span>
        </h2>
        <p className="relative mx-auto mt-4 max-w-lg text-muted-foreground">
          One conversation is all it takes to design your growth engine.
        </p>

        <div className="relative mt-8 inline-flex">
          <motion.span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-[oklch(0.58_0.24_259)]"
            animate={reduce ? undefined : { opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: "blur(14px)" }}
          />
          <Link
            to="/contact"
            className="relative inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
          >
            Get in Touch
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </GlassCard>
    </section>
  );
}
