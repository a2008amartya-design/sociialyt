import { useEffect, useRef, useState } from "react";

const CAL_LINK = "socialyt/30min";
const NS = "socialyt-30min";

declare global {
  interface Window {
    Cal?: any;
  }
}

export function CalEmbed({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;

    try {
      // Cal.com official embed initialiser
      (function (C: any, A: string, L: string) {
        const p = function (a: any, ar: any) {
          a.q.push(ar);
        };
        const d = C.document;
        C.Cal =
          C.Cal ||
          function () {
            const cal = C.Cal;
            // eslint-disable-next-line prefer-rest-params
            const ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () {
                // eslint-disable-next-line prefer-rest-params
                p(api, arguments);
              };
              const namespace = ar[1];
              (api as any).q = (api as any).q || [];
              if (typeof namespace === "string") {
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      window.Cal!("init", NS, { origin: "https://cal.com" });
      window.Cal!.ns[NS]("inline", {
        elementOrSelector: "#cal-booking-embed",
        config: { layout: "month_view" },
        calLink: CAL_LINK,
      });
      window.Cal!.ns[NS]("ui", {
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    } catch {
      setFailed(true);
      return;
    }

    // Detect success: an iframe gets injected by cal.com
    const start = Date.now();
    const interval = window.setInterval(() => {
      if (cancelled) return;
      if (containerRef.current?.querySelector("iframe")) {
        setLoaded(true);
        window.clearInterval(interval);
      } else if (Date.now() - start > 6000) {
        setFailed(true);
        window.clearInterval(interval);
      }
    }, 400);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div className={className}>
      {!loaded && (
        <div className="mb-4 rounded-2xl border border-border/60 bg-white/60 px-4 py-3 text-sm text-muted-foreground">
          {failed ? (
            <>
              Booking calendar unavailable — email us at{" "}
              <a
                className="font-medium text-[oklch(0.58_0.24_259)] underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sociialyt@gmail.com"
              >
                sociialyt@gmail.com
              </a>{" "}
              or use the form.
            </>
          ) : (
            <>Booking calendar loading — if it doesn't appear, email us at sociialyt@gmail.com or use the form below.</>
          )}
        </div>
      )}
      <div
        id="cal-booking-embed"
        ref={containerRef}
        style={{ width: "100%", minHeight: 700, overflow: "auto" }}
      />
    </div>
  );
}

export default CalEmbed;
