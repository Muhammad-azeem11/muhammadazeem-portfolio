// src/components/layout/Footer.tsx
// Site footer — updated with real social links (LinkedIn, GitHub, Instagram, WhatsApp).

import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { footerNav } from "@/config/navigation";
import { Container } from "@/components/ui/Container";
import {
  LinkedInIcon,
  GitHubIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/lib/social-icons";

export function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      Icon: LinkedInIcon,
      href: siteConfig.social.linkedin,
      label: "LinkedIn",
    },
    {
      Icon: GitHubIcon,
      href: siteConfig.social.github,
      label: "GitHub",
    },
    {
      Icon: InstagramIcon,
      href: siteConfig.social.instagram,
      label: "Instagram",
    },
    {
      Icon: WhatsAppIcon,
      href: siteConfig.social.whatsapp,
      label: "WhatsApp",
    },
    {
      Icon: Mail,
      href: `mailto:${siteConfig.social.email}`,
      label: "Email",
      isLucide: true,
    },
  ] as const;

  return (
    <footer
      className="bg-navy-950 text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      <Container className="pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10">
          {/* ── Brand column ──────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-2">
              <span
                className="flex items-center justify-center w-9 h-9 bg-white text-navy-900 rounded-xl font-bold text-sm"
                aria-hidden="true"
              >
                MA
              </span>
              <span className="font-display font-bold text-lg text-white">
                {siteConfig.name}
              </span>
            </div>

            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              AI Automation Engineer helping international
              business owners reduce operational costs through intelligent
              workflow automation.
            </p>

            {/* Social icons */}
            <nav aria-label="Social media links">
              <ul className="flex items-center gap-2" role="list">
                {socialLinks.map(({ Icon, href, label }) => (
                  <li key={label}>
                    <a
                      href={href}
                      aria-label={label}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-center justify-center w-9 h-9 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      <Icon size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── Nav groups ────────────────────────────────────────── */}
          {footerNav.map((group) => (
            <div key={group.label}>
              <h3 
                className="text-xs font-semibold uppercase tracking-widest mb-4 text-white"
                style={{ color: "#ffffff" }}
              >
                {group.label}
              </h3>
              <ul className="space-y-3" role="list">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      target={item.external ? "_blank" : undefined}
                      rel={
                        item.external ? "noopener noreferrer" : undefined
                      }
                      className="text-sm text-slate-300 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Legal bar ─────────────────────────────────────────── */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms", href: "/terms" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
