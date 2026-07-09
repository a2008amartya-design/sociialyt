import { motion, useReducedMotion, useMotionValue, useSpring, useTransform, useScroll, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Globe, Megaphone, Instagram, Play, TrendingUp, Sparkles } from "lucide-react";

type Tile = {
  id: string;
  x: string;
  y: string;
  size: number;
  depth: number; // 0 = far, 1 = near
  rotate: number;
  delay: number;
  content: React.ReactNode;
};

const tiles: Tile[] = [
  {
    id: "site",
    x: "6%",
    y: "8%",
    size: 210,
    depth: 0.9,
    rotate: -8,
    delay: 0.05,
    content: (
      <div className="flex h-full flex-col p-4">
        <div className="mb-2 flex items-center gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/30" />
        </div>
        <div className="h-2 w-3/4 rounded-full bg-foreground/70" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-foreground/30" />
        <div className="mt-3 grid flex-1 grid-cols-2 gap-1.5">
          <div className="rounded-lg bg-[oklch(0.58_0.24_259)]/15" />
          <div className="rounded-lg bg-[oklch(0.58_0.24_259)]/25" />
          <div className="col-span-2 rounded-lg bg-foreground/5" />
        </div>
      </div>
    ),
  },
  {
    id: "chart",
    x: "62%",
    y: "4%",
    size: 190,
    depth: 0.7,
    rotate: 6,
    delay: 0.18,
    content: (
      <div className="flex h-full flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-foreground/50">
            Growth
          </span>
          <TrendingUp className="h-3.5 w-3.5 text-[oklch(0.58_0.24_259)]" />
        </div>
        <div className="text-2xl font-semibold text-gradient-brand">+318%</div>
        <svg viewBox="0 0 100 40" className="h-10 w-full">
          <defs>
            <linearGradient id="hg" x1="0" x2="1">
              <stop offset="0%" stopColor="oklch(0.58 0.24 259)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 259)" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke="url(#hg)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            points="0,34 15,28 30,30 45,20 60,22 75,10 90,12 100,4"
          />
        </svg>
      </div>
    ),
  },
  {
    id: "ad",
    x: "48%",
    y: "34%",
    size: 240,
    depth: 1,
    rotate: -3,
    delay: 0.3,
    content: (
      <div className="relative h-full overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.58 0.24 259) 0%, oklch(0.72 0.2 259) 60%, oklch(0.9 0.08 259) 100%)",
          }}
        />
        <div className="relative flex h-full flex-col justify-between p-5 text-white">
          <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest opacity-80">
            <Megaphone className="h-3 w-3" /> Sponsored
          </div>
          <div>
            <div className="text-lg font-semibold leading-tight">
              Book demo.
              <br />
              Free trial.
            </div>
            <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/25 px-3 py-1 text-[11px] font-medium backdrop-blur">
              Learn more →
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "video",
    x: "2%",
    y: "48%",
    size: 170,
    depth: 0.6,
    rotate: 5,
    delay: 0.42,
    content: (
      <div className="relative flex h-full items-center justify-center bg-[oklch(0.2_0.05_259)]">
        <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_30%_40%,oklch(0.58_0.24_259),transparent_60%)]" />
        <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-lg">
          <Play className="ml-0.5 h-5 w-5 fill-foreground text-foreground" />
        </div>
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">
          0:15
        </span>
      </div>
    ),
  },
  {
    id: "ig",
    x: "70%",
    y: "56%",
    size: 155,
    depth: 0.75,
    rotate: 9,
    delay: 0.54,
    content: (
      <div className="flex h-full flex-col p-4">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[oklch(0.58_0.24_259)] to-[oklch(0.72_0.2_320)] text-white">
            <Instagram className="h-3.5 w-3.5" />
          </span>
          <div className="flex-1">
            <div className="h-1.5 w-16 rounded-full bg-foreground/60" />
            <div className="mt-1 h-1 w-10 rounded-full bg-foreground/25" />
          </div>
        </div>
        <div className="mt-3 flex-1 rounded-xl bg-gradient-to-br from-[oklch(0.58_0.24_259)]/25 to-[oklch(0.9_0.08_259)]/40" />
        <div className="mt-2 flex items-center gap-2 text-[10px] text-foreground/60">
          <Sparkles className="h-3 w-3" /> 24.3k
        </div>
      </div>
    ),
  },
  {
    id: "web",
    x: "30%",
    y: "70%",
    size: 145,
    depth: 0.5,
    rotate: -6,
    delay: 0.66,
    content: (
      <div className="flex h-full flex-col items-center justify-center gap-2 p-4">
        <Globe className="h-6 w-6 text-[oklch(0.58_0.24_259)]" />
        <div className="text-center">
          <div className="text-[11px] font-semibold">socialyt.co</div>
          <div className="text-[9px] uppercase tracking-widest text-foreground/50">
            Live
          </div>
        </div>
      </div>
    ),
  },
];

const callouts = ["More Leads.", "Better Ads.", "Real Growth.", "Live Sites."];

export function HeroTiles() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smx = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smy = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const [calloutIdx, setCalloutIdx] = useState(0);

  // Scroll-linked exit: as hero scrolls out, tiles pull back, blur, and fade.
  const { scrollY: pageY } = useScroll();
  const exitProgress = useTransform(pageY, [0, 600], [0, 1]);
  const clusterScale = useTransform(exitProgress, [0, 1], [1, 0.82]);
  const clusterOpacity = useTransform(exitProgress, [0, 1], [1, 0]);
  const clusterBlur = useTransform(exitProgress, [0, 1], [0, 12]);
  const clusterFilter = useTransform(clusterBlur, (b) => `blur(${b}px)`);
  const parallaxY = useTransform(pageY, (v) => (reduce ? 0 : -v * 0.12));

  useEffect(() => {
    const t = setInterval(() => setCalloutIdx((i) => (i + 1) % callouts.length), 2400);
    return () => clearInterval(t);
  }, []);

  const handleMove = (e: React.MouseEvent) => {
    if (reduce) return;
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mouseX.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    mouseY.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative aspect-square w-full max-w-[560px]"
      style={{
        perspective: 1200,
        scale: reduce ? 1 : clusterScale,
        opacity: reduce ? 1 : clusterOpacity,
        filter: reduce ? undefined : clusterFilter,
      }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-8 rounded-full bg-[radial-gradient(circle_at_center,oklch(0.72_0.2_259/0.28),transparent_65%)] blur-3xl" />

      {tiles.map((t) => (
        <TileEl
          key={t.id}
          tile={t}
          smx={smx}
          smy={smy}
          parallaxY={parallaxY}
          reduce={!!reduce}
        />
      ))}

      {/* Rotating callout text */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          key={calloutIdx}
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="glass-strong rounded-2xl px-4 py-2 text-sm font-semibold text-foreground shadow-xl"
        >
          {callouts[calloutIdx]}
        </motion.div>
      </div>
    </motion.div>
  );
}

function TileEl({
  tile,
  smx,
  smy,
  parallaxY,
  reduce,
}: {
  tile: Tile;
  smx: MotionValue<number>;
  smy: MotionValue<number>;
  parallaxY: MotionValue<number>;
  reduce: boolean;
}) {
  const tiltX = useTransform(smy, (v) => -v * (6 + tile.depth * 6));
  const tiltY = useTransform(smx, (v) => v * (6 + tile.depth * 6));
  const px = useTransform(smx, (v) => v * tile.depth * 14);
  const py = useTransform(smy, (v) => v * tile.depth * 14);
  const parY = useTransform(parallaxY, (v) => v * tile.depth * 1.5);

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.5, y: 30, rotate: tile.rotate }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: tile.rotate }}
      transition={
        reduce
          ? { duration: 0.4, delay: tile.delay }
          : { type: "spring", stiffness: 180, damping: 14, mass: 0.9, delay: tile.delay }
      }
      style={{
        left: tile.x,
        top: tile.y,
        width: tile.size,
        height: tile.size,
        rotateX: reduce ? 0 : tiltX,
        rotateY: reduce ? 0 : tiltY,
        x: reduce ? 0 : px,
        y: reduce ? 0 : py,
        transformStyle: "preserve-3d",
      }}
      className="absolute"
    >
      <motion.div
        animate={
          reduce
            ? undefined
            : {
                y: [0, -6, 0, 4, 0],
                rotate: [tile.rotate, tile.rotate + 1.2, tile.rotate, tile.rotate - 1.2, tile.rotate],
              }
        }
        transition={{ duration: 9 + tile.depth * 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ y: reduce ? 0 : parY }}
        className="glass-strong h-full w-full overflow-hidden rounded-3xl shadow-[0_20px_60px_-20px_rgba(10,50,180,0.35)] ring-1 ring-white/60"
      >
        {tile.content}
      </motion.div>
    </motion.div>
  );
}
