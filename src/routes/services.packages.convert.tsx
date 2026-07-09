import { createFileRoute } from "@tanstack/react-router";
import { Globe, Link as LinkIcon, Megaphone, PenLine, Target } from "lucide-react";
import { PackageDetail } from "@/components/site/PackageDetail";

export const Route = createFileRoute("/services/packages/convert")({
  head: () => ({
    meta: [
      { title: "Convert — Socialyt Packages" },
      { name: "description", content: "Built to turn attention into customers." },
      { property: "og:title", content: "Convert — Socialyt Packages" },
      { property: "og:url", content: "/services/packages/convert" },
    ],
    links: [{ rel: "canonical", href: "/services/packages/convert" }],
  }),
  component: () => (
    <PackageDetail
      name="Convert"
      tagline="Built to turn attention into customers."
      includes={[
        { icon: Globe, label: "Premium Business Website", blurb: "A polished site that reflects your brand from the first click." },
        { icon: LinkIcon, label: "Free Domain (1 Year)", blurb: "Your name, your web address, fully set up for you." },
        { icon: Megaphone, label: "1–2 High-End Advertisement Creatives", blurb: "Scroll-stopping ad visuals built to convert, not just decorate." },
        { icon: PenLine, label: "Professional Ad Copy", blurb: "Words that turn a passing glance into a click." },
        { icon: Target, label: "Conversion-Focused Design", blurb: "Every layout choice engineered to move the visitor forward." },
      ]}
      optional="Scale Engine (Meta Ads Management)"
      perfectFor="Businesses launching products or running promotions."
      ctaLabel="Start Converting"
    />
  ),
});