"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Briefcase, MapPin, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ExperienceSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-16 lg:py-20 bg-neutral-50 border-t border-neutral-100">
      <Container size="sm">
        <motion.div
          className="text-center mb-10"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h2 className="text-3xl font-display font-extrabold text-navy-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-neutral-600">
            Applying technical architecture to real business operations.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
          initial={shouldReduce ? { opacity: 1 } : { opacity: 0, y: 30 }}
          whileInView={shouldReduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ delay: shouldReduce ? 0 : 0.1, duration: 0.6, ease: EASE }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-navy-50 flex items-center justify-center border border-navy-100 shrink-0">
                <Briefcase className="text-navy-900" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900">Wilsden</h3>
                <div className="flex items-center gap-2 text-sm text-neutral-500 mt-1">
                  <MapPin size={14} />
                  <span>United Kingdom</span>
                </div>
              </div>
            </div>
            <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 ring-1 ring-inset ring-green-600/20 w-fit">
              Current
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-100 space-y-6">
            <p className="text-neutral-600 leading-relaxed">
              I am currently working with Wilsden, a UK-based company, where my primary focus is automating their core business tasks. By analyzing their existing workflows, I identify operational bottlenecks and design robust technical solutions to replace manual processes, saving the team valuable time and reducing human error.
            </p>

            {/* ── Engagement Proof ────────────────────────────────────────── */}
            <div className="rounded-2xl bg-neutral-50/80 border border-neutral-200/80 p-5 sm:p-6 transition-all duration-300 hover:border-neutral-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-500" aria-hidden="true" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-accent-700">
                      Engagement Proof
                    </p>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-navy-900 mt-1">
                    Technical Partner — Wilsden
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Official engagement confirmation
                  </p>
                </div>

                <a
                  href="/images/wilsden.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-600 hover:text-accent-700 transition-colors group/link self-start sm:self-auto"
                >
                  <span>View Engagement Proof</span>
                  <ExternalLink size={13} className="transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              </div>

              {/* Document Preview */}
              <a
                href="/images/wilsden.png"
                target="_blank"
                rel="noopener noreferrer"
                className="group/img relative block w-full rounded-xl overflow-hidden border border-neutral-200/90 bg-white shadow-sm hover:shadow-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
                aria-label="View official engagement proof document"
              >
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-100">
                  <Image
                    src="/images/wilsden.png"
                    alt="Official Wilsden Engagement Confirmation Document"
                    fill
                    sizes="(max-width: 768px) 100vw, 600px"
                    className="object-cover object-top transition-transform duration-500 group-hover/img:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-navy-900 text-xs font-bold shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                      <ExternalLink size={14} className="text-accent-600" />
                      View Full Document
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
