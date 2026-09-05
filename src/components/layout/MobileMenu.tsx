"use client";

// src/components/layout/MobileMenu.tsx
// Full-screen mobile navigation panel.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { primaryNav, ctaNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

type MobileMenuProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
};

export function MobileMenu({ id, isOpen, onClose, activeSection }: MobileMenuProps) {
  const pathname = usePathname();

  // Close on route change
  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-navy-950/50 backdrop-blur-sm z-[300] lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      {isOpen && (
        <motion.nav
          id={id}
          key="panel"
          role="navigation"
          aria-label="Mobile navigation"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed top-0 right-0 bottom-0 w-[min(320px,100vw)] bg-white z-[400] lg:hidden shadow-2xl flex flex-col"
        >
          {/* Panel Header */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-neutral-100">
            <span className="font-display font-bold text-navy-900">
              {siteConfig.name}
            </span>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-colors duration-200 text-navy-900 hover:bg-neutral-50 hover:text-accent-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-y-auto py-6 px-4">
            <ul className="space-y-1" role="list">
              {primaryNav.map((item, index) => {
                const isActive = (activeSection || pathname) === item.href;
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "relative flex items-center px-4 py-3 rounded-xl text-base font-medium",
                        "transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500",
                        isActive
                          ? "text-navy-900 bg-neutral-50/50"
                          : "text-navy-900 hover:bg-neutral-50 hover:text-accent-600"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="mobile-nav-indicator"
                          className="absolute left-0 top-2 bottom-2 w-1 bg-accent-500 rounded-r-full"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          aria-hidden="true"
                        />
                      )}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-4 pb-8 pt-4 border-t border-neutral-100">
            <Button asChild variant="primary" size="lg" className="w-full">
              <Link href={ctaNav.href} onClick={() => {
                import("@/lib/analytics").then(m => m.trackEvent("book_call_click"));
                onClose();
              }}>
                {ctaNav.label}
              </Link>
            </Button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
