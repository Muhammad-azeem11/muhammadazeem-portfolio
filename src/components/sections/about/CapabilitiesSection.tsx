"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Bot, Server, Database, Webhook, Container as DockerIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    category: "AI & Automation",
    icon: Bot,
    items: ["n8n", "OpenAI API", "AI Agents"],
    description: "Designing intelligent agents and automated workflows that connect business systems and eliminate repetitive manual processes.",
    highlight: true,
  },
  {
    category: "Backend & Systems",
    icon: Server,
    items: ["Python", "Django", "Node.js", "Next.js"],
    description: "Building reliable backend systems and APIs that power automation workflows and business applications.",
  },
  {
    category: "Data & Databases",
    icon: Database,
    items: ["PostgreSQL", "SQL"],
    description: "Designing reliable data systems for scalable storage, retrieval, and business automation.",
  },
  {
    category: "Integrations",
    icon: Webhook,
    items: ["REST APIs", "Gmail", "OAuth"],
    description: "Connecting third-party platforms and business tools through secure APIs and authentication workflows.",
  },
  {
    category: "Infrastructure",
    icon: DockerIcon,
    items: ["Docker", "Git", "GitHub"],
    description: "Building consistent and reliable development and deployment environments.",
  },
];

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function CapabilitiesSection() {
  const shouldReduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } },
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <Container>
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-display font-extrabold text-navy-900 mb-6"
          >
            Technical Capabilities
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-neutral-600 max-w-2xl mx-auto"
          >
            I choose technology according to the problem that needs to be solved. These are the tools I rely on to build production-ready automation systems.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          {capabilities.map((group) => {
            const isHighlight = group.highlight;
            return (
            <motion.div
              key={group.category}
              variants={itemVariants}
              className={cn(
                "rounded-3xl p-8 transition-all duration-500 relative overflow-hidden group",
                isHighlight 
                  ? "bg-navy-950 md:col-span-2 shadow-xl border border-navy-800" 
                  : "bg-neutral-50 border border-neutral-100 hover:border-navy-200 hover:bg-neutral-100/50 hover:shadow-lg"
              )}
            >
              {isHighlight && (
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-500/10 blur-[100px] rounded-full pointer-events-none transition-opacity duration-700 opacity-40 group-hover:opacity-70" />
              )}
              
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-colors duration-500",
                  isHighlight 
                    ? "bg-accent-500/20 text-accent-400 border border-accent-500/20" 
                    : "bg-white text-navy-900 border border-neutral-200 group-hover:bg-navy-900 group-hover:text-white"
                )}>
                  <group.icon size={24} />
                </div>
                <h3 
                  className={cn(
                    "font-display font-extrabold text-xl",
                    isHighlight ? "" : "text-navy-900"
                  )}
                  style={isHighlight ? { color: "#ffffff" } : {}}
                >
                  {group.category}
                </h3>
              </div>
              
              <p 
                className={cn(
                  "text-sm mb-10 leading-relaxed relative z-10",
                  isHighlight ? "text-base font-medium" : "text-neutral-600"
                )}
                style={isHighlight ? { color: "#cbd5e1" } : {}}
              >
                {group.description}
              </p>

              <div className="flex flex-wrap gap-2.5 relative z-10">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={cn(
                      "px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl border shadow-sm transition-colors",
                      isHighlight
                        ? "bg-white/5 text-white border-white/10 backdrop-blur-sm"
                        : "bg-white text-navy-900 border-neutral-200"
                    )}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          )})}
        </motion.div>
      </Container>
    </section>
  );
}
