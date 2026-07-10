import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Instagram, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GlassCard } from "@/components/site/GlassCard";
import { Reveal } from "@/components/site/Reveal";
import { CalEmbed } from "@/components/cal-embed";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Socialyt" },
      { name: "description", content: "Start a conversation with Socialyt. Email, phone, or DM us on Instagram." },
      { property: "og:title", content: "Contact — Socialyt" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState<"message" | "call">("message");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "#book-a-call") {
      setTab("call");
      // Scroll after paint
      requestAnimationFrame(() => {
        document.getElementById("book-a-call")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Enquiry from Socialyt website");
    const body = encodeURIComponent(
      `Hi Socialyt team,\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    );
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=sociialyt@gmail.com&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold tracking-tight md:text-7xl">
            Let's start a <span className="text-gradient-brand">conversation.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Tell us a little about your business and where you'd like to be. We
            reply within one working day.
          </p>
        </Reveal>

        <div id="book-a-call" className="mt-16 space-y-6">
          <Reveal delay={100}>
            <GlassCard strong className="p-8 md:p-10">
              <div className="mb-6 inline-flex rounded-full border border-border/60 bg-white/60 p-1 text-sm">
                <button
                  type="button"
                  onClick={() => setTab("message")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${
                    tab === "message"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <MessageSquare className="h-4 w-4" /> Send a message
                </button>
                <button
                  type="button"
                  onClick={() => setTab("call")}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-medium transition ${
                    tab === "call"
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" /> Book a call
                </button>
              </div>

              {tab === "message" ? (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Name
                    </label>
                    <input
                      required
                      maxLength={100}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-base outline-none transition focus:border-[oklch(0.58_0.24_259)] focus:bg-white"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      maxLength={255}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-base outline-none transition focus:border-[oklch(0.58_0.24_259)] focus:bg-white"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      maxLength={2000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mt-2 w-full rounded-2xl border border-border/60 bg-white/70 px-4 py-3 text-base outline-none transition focus:border-[oklch(0.58_0.24_259)] focus:bg-white"
                      placeholder="What are you looking to grow?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:scale-[1.03]"
                  >
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              ) : (
                <CalEmbed />
              )}
            </GlassCard>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <GlassCard className="h-full p-8 md:p-10">
              <h3 className="text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Contact Info
              </h3>
              <ul className="mt-6 space-y-5 text-sm">
                <li>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=sociialyt@gmail.com&su=${encodeURIComponent("Enquiry from Socialyt website")}&body=${encodeURIComponent("Hi Socialyt team,\n\nI'd like to know more about...")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 hover:text-[oklch(0.58_0.24_259)]"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Email</span>
                      <span className="font-medium">sociialyt@gmail.com</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a href="tel:+918269703004" className="group flex items-start gap-3 hover:text-[oklch(0.58_0.24_259)]">
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Phone</span>
                      <span className="font-medium">+91 82697 03004</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/sociialyt/?utm_source=ig_web_button_share_sheet"
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-start gap-3 hover:text-[oklch(0.58_0.24_259)]"
                  >
                    <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                      <Instagram className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-xs text-muted-foreground">Instagram</span>
                      <span className="font-medium">@sociialyt</span>
                    </span>
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[oklch(0.58_0.24_259)]/10 text-[oklch(0.58_0.24_259)]">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <span>
                    <span className="block text-xs text-muted-foreground">Location</span>
                    <span className="font-medium">HQ in Delhi, IN</span>
                  </span>
                </li>
              </ul>
            </GlassCard>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}