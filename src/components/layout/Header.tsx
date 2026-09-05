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

              {/* Four Flags Only — Clean, small, evenly spaced, no box/capsule/border */}
              <div
                className="flex items-center gap-1.5 select-none pl-1"
                aria-label="USA, UK, Canada, Germany"
                title="USA, UK, Canada, Germany"
              >
                <span role="img" aria-label="USA" className="text-sm sm:text-base leading-none">🇺🇸</span>
                <span role="img" aria-label="UK" className="text-sm sm:text-base leading-none">🇬🇧</span>
                <span role="img" aria-label="Canada" className="text-sm sm:text-base leading-none">🇨🇦</span>
                <span role="img" aria-label="Germany" className="text-sm sm:text-base leading-none">🇩🇪</span>
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
