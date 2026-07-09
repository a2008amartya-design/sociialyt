import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import logoUrl from "@/assets/socialyt-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3 transition-all duration-500",
          scrolled
            ? "glass-strong mx-4 md:mx-auto"
            : "bg-transparent border border-transparent",
        )}
      >
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Socialyt
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.instagram.com/sociialyt/?utm_source=ig_web_button_share_sheet"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="hidden rounded-full p-2 text-muted-foreground transition hover:bg-white/60 hover:text-foreground md:inline-flex"
          >
            <Instagram className="h-4 w-4" />
          </a>
          <Link
            to="/contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:scale-[1.03] md:inline-flex"
          >
            Get in Touch
          </Link>
          <button
            className="md:hidden rounded-full p-2 text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="glass-strong mx-4 mt-2 rounded-3xl p-6 md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-base"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.instagram.com/sociialyt/?utm_source=ig_web_button_share_sheet"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-base"
            >
              <Instagram className="h-4 w-4" /> @sociialyt
            </a>
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}