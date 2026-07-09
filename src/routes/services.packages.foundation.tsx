import { createFileRoute } from "@tanstack/react-router";
import { Globe, Link as LinkIcon, Sparkles, Smartphone, MessageCircle } from "lucide-react";
import { PackageDetail } from "@/components/site/PackageDetail";

export const Route = createFileRoute("/services/packages/foundation")({
  head: () => ({
    meta: [
      { title: "Foundation — Socialyt Packages" },
      { name: "description", content: "Everything your business needs to exist professionally online." },
      { property: "og:title", content: "Foundation — Socialyt Packages" },
      { property: "og:url", content: "/services/packages/foundation" },
    ],
    links: [{ rel: "canonical", href: "/services/packages/foundation" }],
  }),
  component: () => (
    <PackageDetail
      name="Foundation"
      tagline="Everything your business needs to exist professionally online."
      includes={[
        { icon: Globe, label: "Premium Business Website", blurb: "A polished site that reflects your brand from the first click." },
        { icon: LinkIcon, label: "Free Domain (1 Year)", blurb: "Your name, your web address, fully set up for you." },
        { icon: Sparkles, label: "Organic Social Growth & Engagement", blurb: "Steady, on-brand growth without paid shortcuts." },
        { icon: Smartphone, label: "Mobile Optimization", blurb: "Looks and loads flawlessly on every device your customers use." },
        { icon: MessageCircle, label: "Contact Forms & WhatsApp Integration", blurb: "Let visitors reach you in one tap, no friction." },
      ]}
      perfectFor="Businesses starting their online presence."
      ctaLabel="Get Started"
    />
  ),
});