import { useEffect, useRef } from "react";

/**
 * Cinematic layered "3D" hero object built with CSS transforms.
 * A glossy floating device mockup with soft rim light + drop shadow,
 * subtle continuous rotation, and mouse-parallax drift.
 */
export function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 20;
      ty = (e.clientY / h - 0.5) * 14;
    };
    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", `${cx}px`);
      el.style.setProperty("--py", `${cy}px`);
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="relative aspect-square w-full max-w-[560px] [perspective:1400px]"
      style={
        {
          transform: "translate3d(var(--px,0),var(--py,0),0)",
          transition: "transform 0.1s linear",
        } as React.CSSProperties
      }
    >
      {/* Soft ground shadow */}
      <div className="absolute bottom-[8%] left-1/2 h-10 w-3/4 -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(10,30,80,0.28),transparent_70%)] blur-2xl" />

      {/* Floating device */}
      <div className="absolute inset-0 flex items-center justify-center animate-float">
        <div
          className="relative h-[68%] w-[86%] rounded-[36px] [transform-style:preserve-3d]"
          style={{ transform: "rotateX(14deg) rotateY(-18deg)" }}
        >
          {/* Chrome frame */}
          <div
            className="absolute inset-0 rounded-[36px]"
            style={{
              background:
                "linear-gradient(135deg, #ffffff 0%, #dbe6ff 30%, #a9c0ff 55%, #6c8bff 78%, #3a5cff 100%)",
              boxShadow:
                "0 40px 80px -30px rgba(10,50,180,0.5), 0 20px 40px -10px rgba(10,30,80,0.3), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.1)",
            }}
          />
          {/* Inner screen */}
          <div
            className="absolute inset-[6px] overflow-hidden rounded-[30px]"
            style={{
              background:
                "linear-gradient(160deg, #0a1230 0%, #0a5cff 45%, #78a6ff 100%)",
            }}
          >
            {/* UI mock */}
            <div className="absolute inset-0 p-6">
              <div className="mb-4 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-white/50" />
                <span className="h-2 w-2 rounded-full bg-white/40" />
                <span className="h-2 w-2 rounded-full bg-white/30" />
              </div>
              <div className="space-y-2">
                <div className="h-2.5 w-3/4 rounded-full bg-white/80" />
                <div className="h-2 w-1/2 rounded-full bg-white/50" />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="h-16 rounded-xl bg-white/15 backdrop-blur" />
                <div className="h-16 rounded-xl bg-white/25 backdrop-blur" />
                <div className="h-16 rounded-xl bg-white/15 backdrop-blur" />
              </div>
              <div className="mt-6 h-24 rounded-2xl bg-white/10 p-3 backdrop-blur">
                <svg viewBox="0 0 200 60" className="h-full w-full">
                  <defs>
                    <linearGradient id="g" x1="0" x2="1">
                      <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#fff" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="none"
                    stroke="url(#g)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="0,50 25,42 50,44 75,30 100,32 125,20 150,22 175,10 200,6"
                  />
                </svg>
              </div>
            </div>
            {/* Screen gloss */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_0%,transparent_35%,transparent_65%,rgba(255,255,255,0.15)_100%)]" />
          </div>
          {/* Rim highlight */}
          <div className="pointer-events-none absolute inset-0 rounded-[36px] ring-1 ring-white/70" />
        </div>
      </div>

      {/* Orbiting glass chip */}
      <div
        className="glass absolute right-[6%] top-[14%] rounded-2xl px-4 py-3 text-xs font-medium text-foreground/80 animate-float"
        style={{ animationDelay: "-2s" }}
      >
        ↑ 3.8× conversions
      </div>
      <div
        className="glass absolute bottom-[12%] left-[4%] rounded-2xl px-4 py-3 text-xs font-medium text-foreground/80 animate-float"
        style={{ animationDelay: "-4s" }}
      >
        ✦ Meta Ads live
      </div>

      {/* Ambient particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 14 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            style={{
              top: `${(i * 47) % 100}%`,
              left: `${(i * 83) % 100}%`,
              animation: `float-slow ${6 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${-i * 0.7}s`,
              opacity: 0.35 + (i % 4) * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
}