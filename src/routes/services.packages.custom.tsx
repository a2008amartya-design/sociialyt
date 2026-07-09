import { createFileRoute } from "@tanstack/react-router";
import {
  Globe,
  Palette,
  Megaphone,
  Users,
  Rocket,
  Sparkles,
  CalendarDays,
  MousePointerClick,
  PhoneCall,
} from "lucide-react";
import { PackageDetail } from "@/components/site/PackageDetail";

export const Route = createFileRoute("/services/packages/custom")({
  head: () => ({
    meta: [
      { title: "Custom — Socialyt Packages" },
      { name: "description", content: "A solution built specifically for your business." },
      { property: "og:title", content: "Custom — Socialyt Packages" },
      { property: "og:url", content: "/services/packages/custom" },
    ],
    links: [{ rel: "canonical", href: "/services/packages/custom" }],
  }),
  component: () => (
    <PackageDetail
      name="Custom"
      tagline="A solution built specifically for your business. You choose exactly what you need."
      includes={[
        { icon: Globe, label: "Website Development", blurb: "Custom-built sites shaped around how your customers actually behave." },
        { icon: Palette, label: "Branding", blurb: "A visual identity that feels considered from logo to last pixel." },
        { icon: Megaphone, label: "Advertisement Design", blurb: "Creatives designed for the platform they'll run on, not recycled." },
        { icon: Users, label: "Social Media Management", blurb: "A steady, on-brand presence handled end-to-end by our team." },
        { icon: Rocket, label: "Meta Ads", blurb: "Facebook and Instagram campaigns run like a real growth desk." },
        { icon: Sparkles, label: "Organic Growth", blurb: "Compounding reach built through content people actually want." },
        { icon: CalendarDays, label: "Monthly Content", blurb: "A reliable drumbeat of posts, planned around your calendar." },
        { icon: MousePointerClick, label: "Landing Pages", blurb: "Focused pages built around one clear action per campaign." },
        { icon: PhoneCall, label: "Strategy Calls", blurb: "Regular check-ins to steer the work toward what's working." },
      ]}
      bestFor="Businesses with unique requirements."
      ctaLabel="Build your custom plan"
    />
  ),
});