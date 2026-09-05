"use client";

// src/components/layout/Header.tsx
// Site-wide header with transparent → solid scroll behavior and entrance animation.

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks/useScrollProgress";
import { primaryNav, ctaNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

function USAFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="USA Flag" role="img">
      <rect width="20" height="14" fill="#B22234" />
      <rect y="1.08" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="3.23" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="5.38" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="7.54" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="9.69" width="20" height="1.08" fill="#FFFFFF" />
      <rect y="11.85" width="20" height="1.08" fill="#FFFFFF" />
      <rect width="8" height="7.54" fill="#3C3B6E" />
      <g fill="#FFFFFF" opacity="0.95">
        <circle cx="1.6" cy="1.5" r="0.45" />
        <circle cx="3.2" cy="1.5" r="0.45" />
        <circle cx="4.8" cy="1.5" r="0.45" />
        <circle cx="6.4" cy="1.5" r="0.45" />
        <circle cx="2.4" cy="3.0" r="0.45" />
        <circle cx="4.0" cy="3.0" r="0.45" />
        <circle cx="5.6" cy="3.0" r="0.45" />
        <circle cx="1.6" cy="4.5" r="0.45" />
        <circle cx="3.2" cy="4.5" r="0.45" />
        <circle cx="4.8" cy="4.5" r="0.45" />
        <circle cx="6.4" cy="4.5" r="0.45" />
        <circle cx="2.4" cy="6.0" r="0.45" />
        <circle cx="4.0" cy="6.0" r="0.45" />
        <circle cx="5.6" cy="6.0" r="0.45" />
      </g>
    </svg>
  );
}

function UKFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="UK Flag" role="img">
      <rect width="20" height="14" fill="#012169" />
      <path d="M0 0 L20 14 M20 0 L0 14" stroke="#FFFFFF" strokeWidth="2.8" />
      <path d="M0 0 L10 7 M20 14 L10 7 M20 0 L10 7 M0 14 L10 7" stroke="#C8102E" strokeWidth="1.2" />
      <path d="M10 0 V14 M0 7 H20" stroke="#FFFFFF" strokeWidth="4.6" />
      <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

function CanadaFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="Canada Flag" role="img">
      <rect width="20" height="14" fill="#D80621" />
      <rect x="5" width="10" height="14" fill="#FFFFFF" />
      <path
        d="M10 2.2 L10.8 4.2 L12.6 3.6 L12 5.4 L13.8 6.2 L11.8 7.4 L12.4 8.8 L10.6 8.2 L10.4 11.2 L9.6 11.2 L9.4 8.2 L7.6 8.8 L8.2 7.4 L6.2 6.2 L8 5.4 L7.4 3.6 L9.2 4.2 Z"
        fill="#D80621"
      />
    </svg>
  );
}

function GermanyFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="Germany Flag" role="img">
      <rect width="20" height="4.67" fill="#000000" />
      <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
      <rect y="9.34" width="20" height="4.67" fill="#FFCE00" />
    </svg>
  );
}

function AustraliaFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="Australia Flag" role="img">
      <rect width="20" height="14" fill="#00008B" />
      <g>
        <rect width="10" height="7" fill="#012169" />
        <path d="M0 0 L10 7 M10 0 L0 7" stroke="#FFFFFF" strokeWidth="1.4" />
        <path d="M0 0 L5 3.5 M10 7 L5 3.5 M10 0 L5 3.5 M0 7 L5 3.5" stroke="#C8102E" strokeWidth="0.6" />
        <path d="M5 0 V7 M0 3.5 H10" stroke="#FFFFFF" strokeWidth="2.3" />
        <path d="M5 0 V7 M0 3.5 H10" stroke="#C8102E" strokeWidth="1.4" />
      </g>
      <circle cx="5" cy="10.5" r="1.3" fill="#FFFFFF" />
      <g fill="#FFFFFF">
        <circle cx="15" cy="2.8" r="0.6" />
        <circle cx="17.2" cy="5.4" r="0.6" />
        <circle cx="15" cy="11.2" r="0.6" />
        <circle cx="12.8" cy="6.2" r="0.6" />
        <circle cx="15.8" cy="7.8" r="0.4" />
      </g>
    </svg>
  );
}

function NetherlandsFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="Netherlands Flag" role="img">
      <rect width="20" height="4.67" fill="#AE1C28" />
      <rect y="4.67" width="20" height="4.67" fill="#FFFFFF" />
      <rect y="9.34" width="20" height="4.67" fill="#21468B" />
    </svg>
  );
}

function SaudiArabiaFlag() {
  return (
    <svg viewBox="0 0 20 14" className="w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15" aria-label="Saudi Arabia Flag" role="img">
      <rect width="20" height="14" fill="#006C35" />
      <path
        d="M4 5 H16 M5 4 C5.6 4 6 4.8 6.6 4.8 C7.2 4.8 7.6 4 8.2 4 C8.8 4 9.2 4.8 9.8 4.8 C10.4 4.8 10.8 4 11.4 4 C12 4 12.4 4.8 13 4.8 C13.6 4.8 14 4.2 14.6 4.2"
        stroke="#FFFFFF"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M15.5 8.2 H5.8 L5.2 8.6 L5.8 9 H15.5 M5.8 7.8 V9.4 M4.6 8.6 H5.2"
        stroke="#FFFFFF"
        strokeWidth="0.75"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Header() {
  const pathname = usePathname();
  const scrolled = useScrolled(60);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const shouldReduce = useReducedMotion();

  // Pages with dark hero backgrounds at the top
  const isDarkHero = pathname === "/" || pathname === "/about";
  const isDarkHeader = !scrolled && isDarkHero;

  // Scroll Spy Logic
  useEffect(() => {
    // Only run scroll spy on the homepage where all sections exist
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const handleScroll = () => {
      // Map nav items to their corresponding section IDs on the homepage
      const sections = primaryNav.map(item => {
        const id = item.href === "/" ? "home" : item.href.replace("/", "");
        return { href: item.href, element: document.getElementById(id) };
      }).filter(s => s.element);

      if (sections.length === 0) return;

      let currentActive = "/"; // Default to home
      
      for (const section of sections) {
        const rect = section.element!.getBoundingClientRect();
        // If the top of the section is anywhere above the middle of the screen
        // or if it takes up the majority of the screen
        if (rect.top <= window.innerHeight / 2.5) {
          currentActive = section.href;
        }
      }
      
      setActiveSection(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const scaleX = shouldReduce ? scrollYProgress : smoothProgress;

  return (
    <>
      {/* ── Scroll Progress Bar ───────────────────────────────── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent-500 z-[201] origin-left"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[200]",
          "border-b transition-all duration-500 ease-elegant",
          scrolled 
            ? "bg-white/85 backdrop-blur-xl border-neutral-200/50 shadow-sm py-0" 
            : "bg-transparent border-transparent py-2"
        )}
        role="banner"
      >
        <div className="mx-auto max-w-screen-xl px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between h-18">
            {/* ── Brand / Name & Four Flag Icons ───────────────── */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              <Link
                href="/"
                className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-lg"
                aria-label={`${siteConfig.name} — Home`}
              >
                <div 
                  className={cn(
                    "relative w-9 h-9 rounded-full overflow-hidden border shadow-sm transition-transform duration-300 group-hover:scale-105",
                    isDarkHeader ? "border-white/20" : "border-navy-900/10"
                  )}
                >
                  <Image
                    src="/images/azeempic.jpg"
                    alt="Muhammad Azeem"
                    fill
                    sizes="36px"
                    className="object-cover object-top"
                  />
                </div>
                <span className={cn(
                  "font-display font-bold text-lg tracking-tight transition-colors duration-200",
                  isDarkHeader ? "text-white" : "text-navy-900"
                )}>
                  {siteConfig.name}
                </span>
              </Link>

              {/* Seven Flags Only — Clean vector symbols in exact order (USA -> UK -> Canada -> Germany -> Australia -> Netherlands -> Saudi Arabia) */}
              <div
                className="flex items-center gap-1.5 select-none pl-1.5"
                aria-label="USA, UK, Canada, Germany, Australia, Netherlands, Saudi Arabia"
                title="USA, UK, Canada, Germany, Australia, Netherlands, Saudi Arabia"
              >
                <USAFlag />
                <UKFlag />
                <CanadaFlag />
                <GermanyFlag />
                <AustraliaFlag />
                <NetherlandsFlag />
                <SaudiArabiaFlag />
              </div>
            </div>

            {/* ── Desktop Navigation ───────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {primaryNav.map((item) => {
                const isActive = activeSection === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50",
                      isDarkHeader
                        ? isActive
                          ? "text-white font-semibold"
                          : "text-neutral-300 hover:text-white hover:bg-white/10"
                        : isActive
                          ? "text-navy-900 font-semibold"
                          : "text-neutral-600 hover:text-navy-900 hover:bg-neutral-50"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className={cn(
                          "absolute bottom-1 left-4 right-4 h-[2px] rounded-full",
                          isDarkHeader ? "bg-accent-400" : "bg-accent-500"
                        )}
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        aria-hidden="true"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA ──────────────────────────────────── */}
            <div className="hidden lg:flex items-center gap-4">
              <Button
                asChild
                size="md"
                variant={isDarkHeader ? "inverse" : "primary"}
                className="transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Link href={ctaNav.href} onClick={() => {
                  import("@/lib/analytics").then(m => m.trackEvent("book_call_click"));
                }}>
                  {ctaNav.label}
                </Link>
              </Button>
            </div>

            {/* ── Mobile Menu Toggle ───────────────────────────── */}
            <button
              type="button"
              className={cn(
                "lg:hidden flex items-center justify-center w-10 h-10 rounded-xl",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                isDarkHeader
                  ? "text-white hover:bg-white/10 hover:text-white"
                  : "text-navy-900 hover:bg-neutral-50 hover:text-accent-600"
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Panel ─────────────────────────────────────── */}
      <MobileMenu
        id="mobile-menu"
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
