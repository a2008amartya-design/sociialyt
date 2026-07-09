import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border/60 bg-gradient-to-b from-transparent to-accent/40">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="text-2xl font-semibold tracking-tight">
              Socialyt
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              A full-stack growth partner — websites, ads, creatives, and organic
              social growth, all in one place.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground">Home</Link></li>
              <li><Link to="/services" className="hover:text-foreground">Services</Link></li>
              <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold">Reach us</h4>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=socialyt@gmail.com&su=${encodeURIComponent("Enquiry from Socialyt website")}&body=${encodeURIComponent("Hi Socialyt team,\n\nI'd like to know more about...")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" /> socialyt@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+918269703004" className="inline-flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-3.5 w-3.5" /> +91 82697 03004
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/sociialyt/?utm_source=ig_web_button_share_sheet"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-foreground"
                >
                  <Instagram className="h-3.5 w-3.5" /> @sociialyt
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> HQ in Delhi, IN
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <span>© 2026 Socialyt. All rights reserved.</span>
          <span className="text-[11px] opacity-60">
            Built by Ayushman, Amartya &amp; Yatharth — Co-Founders of Socialyt.
          </span>
        </div>
      </div>
    </footer>
  );
}