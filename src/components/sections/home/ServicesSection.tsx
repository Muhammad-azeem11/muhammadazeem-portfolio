"use client";

// src/components/sections/home/ServicesSection.tsx
// Premium pricing and services menu for AI Automation Consultancy.

import { motion, useReducedMotion, type Variants } from "framer-motion";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const auditPackages = [
  {
    title: "Essential",
    price: "$199",
    category: "Discover",
    subconcept: "Find your biggest opportunities.",
    tagline: "Find Your Biggest Automation Opportunities",
    for: "For founders and small teams who know they are wasting time on manual work but aren't sure what should be automated first.",
    whyThisPlan: "Best if you're asking: “What should I automate?”",
    popular: false,
    features: [
      "Core workflow review",
      "Bottleneck & friction analysis",
      "3–5 high-impact automation opportunities",
      "AI opportunity assessment",
      "Recommended tools & platforms",
      "Quick-win action list",
      "Time & impact estimates",
      "Prioritized recommendations",
      "Executive audit summary",
      "30-minute strategy session"
    ],
    coreOutcome: "Leave with clarity on what to automate first — without committing to a large automation project.",
    bestFor: "Businesses exploring automation for the first time or looking for a focused second opinion before investing.",
    cta: "Start Your Audit"
  },
  {
    title: "Growth",
    price: "$499",
    category: "Prioritize",
    subconcept: "Know what to automate, why, and what to implement first.",
    tagline: "Turn Manual Processes Into an Automation Roadmap",
    for: "For growing businesses that already have multiple repetitive processes and need to know exactly where automation can create the greatest operational impact.",
    whyThisPlan: "Best if you're asking: “What should we automate first?”",
    popular: true,
    features: [
      "Deep-dive workflow analysis",
      "8–12 high-value automation opportunities",
      "AI use-case feasibility assessment",
      "Sales, ops & lead flow review",
      "API & system integration review",
      "Tool-stack audit & gap analysis",
      "Technical feasibility review",
      "Impact vs. effort matrix",
      "ROI & time-savings forecast",
      "Opportunity scoring framework",
      "Prioritized automation roadmap",
      "Step-by-step rollout sequence",
      "Implementation specifications",
      "60-minute strategy session"
    ],
    coreOutcome: "Leave with a clear, prioritized roadmap showing what to automate, why it matters, what tools are required, and what should be implemented first.",
    bestFor: "Growing businesses with multiple manual workflows that are ready to move beyond isolated quick wins and build a structured automation system.",
    cta: "Build My Roadmap"
  },
  {
    title: "Strategic",
    price: "$999",
    category: "Transform",
    subconcept: "Build the strategy for scaling automation across the business.",
    tagline: "Design Your AI & Automation Strategy",
    for: "For established businesses that want to systematically redesign how their operations work across teams, systems, and customer touchpoints.",
    whyThisPlan: "Best if you're asking: “How should we transform our operations?”",
    popular: false,
    features: [
      "Full enterprise process audit",
      "Cross-department workflow mapping",
      "15+ transformation opportunities",
      "Autonomous AI agent blueprint",
      "Advanced bottleneck & data flow analysis",
      "End-to-end customer journey automation",
      "API & system integration architecture",
      "Modern tech-stack recommendations",
      "Complexity & scalability risk matrix",
      "ROI & business impact model",
      "Security & dependency assessment",
      "Full automation system architecture",
      "Multi-phase transformation roadmap",
      "Detailed implementation playbook",
      "Phased delivery timeline & milestones",
      "Long-term scaling strategy",
      "90-minute strategy workshop"
    ],
    coreOutcome: "Leave with a comprehensive AI and automation strategy that can guide your business's automation initiatives over the coming months.",
    bestFor: "Established businesses considering multiple automation initiatives or a broader AI transformation across departments.",
    cta: "Plan My Transformation"
  }
];

const workflowPackages = [
  {
    title: "Simple",
    price: "From $750",
    for: "For businesses that want to automate a specific repetitive process or connect a small number of tools.",
    popular: false,
    features: [
      "1–2 system/API integrations",
      "Workflow design and implementation",
      "Data transfer and synchronization",
      "Basic business logic",
      "Testing and validation",
      "Deployment and handover"
    ]
  },
  {
    title: "Multi-System",
    price: "From $1,500",
    for: "For businesses that need multiple systems, APIs, and business processes working together.",
    popular: true,
    features: [
      "3–5 system/API integrations",
      "Multi-step workflow architecture",
      "CRM and database integrations",
      "Cross-platform data synchronization",
      "Conditional business logic",
      "Error handling and testing",
      "Deployment and documentation"
    ]
  },
  {
    title: "Advanced AI",
    price: "From $3,000",
    for: "For businesses with complex processes that require AI, multiple integrations, and intelligent decision-making.",
    popular: false,
    features: [
      "Complex multi-system integrations",
      "Advanced API architecture",
      "AI-powered workflows",
      "AI agents and automated decision-making",
      "Human approval workflows where required",
      "Advanced business logic",
      "Monitoring and error handling",
      "Testing, optimization, and deployment"
    ]
  }
];

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ServicesSection() {
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
    <section id="services" className="bg-white py-16 lg:py-24" aria-labelledby="services-heading">
      <Container>
        
        {/* ── Section Header ───────────────────────────────────────────────────── */}
        <motion.div
          className="text-center mb-14 space-y-4 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
              Services & Pricing
            </p>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
          </motion.div>
          <motion.h2
            id="services-heading"
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 leading-[1.1] tracking-tight"
          >
            Invest in Systems That Scale.
          </motion.h2>
        </motion.div>

        {/* ── 01: Automation Audit ─────────────────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12 text-center md:text-left max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[11px] font-bold uppercase tracking-widest mb-3 border border-accent-100">
              Business Automation & AI Audit
            </div>
            <h3 className="text-3xl md:text-4xl font-display font-extrabold text-navy-900 leading-tight mb-4">
              Choose the level of automation strategy your business needs.
            </h3>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
              From identifying your first automation opportunities to building a company-wide AI and automation roadmap, each audit is designed to give you practical recommendations you can actually act on.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {auditPackages.map((pkg) => (
              <motion.div
                key={pkg.title}
                variants={itemVariants}
                className={cn(
                  "relative flex flex-col p-8 sm:p-10 rounded-[2rem] border transition-all duration-300",
                  pkg.popular 
                    ? "bg-navy-950 text-white border-navy-800 shadow-2xl lg:-translate-y-4 ring-2 ring-accent-500/30" 
                    : "bg-white text-navy-900 border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-xl"
                )}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <span className="bg-accent-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg border border-accent-400/30">
                      Most Popular
                    </span>
                  </div>
                )}
                
                {/* Progression Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border",
                    pkg.popular
                      ? "bg-accent-500/20 text-accent-400 border-accent-500/30"
                      : "bg-neutral-100 text-navy-900 border-neutral-200"
                  )}>
                    {pkg.category}
                  </span>
                  <span className={cn("text-xs font-medium italic", pkg.popular ? "text-neutral-400" : "text-neutral-500")}>
                    {pkg.subconcept}
                  </span>
                </div>

                <h4 className="text-2xl font-display font-extrabold mb-1" style={pkg.popular ? { color: "#ffffff" } : {}}>
                  {pkg.title}
                </h4>
                <p className={cn("text-xs font-bold mb-6", pkg.popular ? "text-accent-400" : "text-accent-600")}>
                  {pkg.tagline}
                </p>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className={cn("text-4xl sm:text-5xl font-display font-extrabold tracking-tight", pkg.popular ? "text-white" : "text-navy-900")}>
                    {pkg.price}
                  </span>
                  <span className={cn("text-xs font-semibold uppercase tracking-wider", pkg.popular ? "text-neutral-400" : "text-neutral-500")}>
                    / one-time audit
                  </span>
                </div>
                
                <p className={cn("text-xs leading-relaxed mb-6", pkg.popular ? "text-neutral-300" : "text-neutral-600")}>
                  {pkg.for}
                </p>

                {/* "Why this plan?" micro-label */}
                <div className={cn(
                  "p-3.5 rounded-2xl mb-8 text-xs leading-relaxed border",
                  pkg.popular
                    ? "bg-white/5 border-white/10 text-neutral-200"
                    : "bg-neutral-50 border-neutral-200/80 text-navy-950 font-medium"
                )}>
                  <span className={cn("font-bold block text-[10px] uppercase tracking-wider mb-1", pkg.popular ? "text-accent-400" : "text-accent-600")}>
                    Why this plan?
                  </span>
                  {pkg.whyThisPlan}
                </div>
                
                {/* Feature List */}
                <div className="flex-1 space-y-3.5 mb-8">
                  <p className={cn("text-[11px] font-bold uppercase tracking-wider mb-4", pkg.popular ? "text-neutral-400" : "text-neutral-500")}>
                    What you&apos;ll get
                  </p>
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <Check size={15} className={cn("mt-0.5 shrink-0", pkg.popular ? "text-accent-400" : "text-accent-600")} />
                      <span className={cn("text-xs leading-relaxed", pkg.popular ? "text-neutral-300" : "text-neutral-700")}>
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Core Outcome */}
                <div className={cn(
                  "p-4 rounded-2xl border text-xs leading-relaxed mb-4",
                  pkg.popular
                    ? "bg-accent-500/10 border-accent-500/20 text-neutral-200"
                    : "bg-accent-50/50 border-accent-100 text-navy-950"
                )}>
                  <span className="font-bold block text-accent-600 mb-1 uppercase text-[10px] tracking-wider">
                    Core Outcome
                  </span>
                  {pkg.coreOutcome}
                </div>

                {/* Best For */}
                <div className="text-xs leading-relaxed mb-8 pt-1">
                  <span className="font-bold text-neutral-400 text-[11px] uppercase tracking-wider block mb-1">Best for</span>
                  <p className={cn("text-xs leading-relaxed", pkg.popular ? "text-neutral-400" : "text-neutral-600")}>
                    {pkg.bestFor}
                  </p>
                </div>
                
                <Button 
                  asChild 
                  variant={pkg.popular ? "primary" : "outline"} 
                  className={cn(
                    "w-full justify-center h-12 rounded-xl font-bold text-sm tracking-wide transition-all duration-300",
                    pkg.popular 
                      ? "bg-accent-600 hover:bg-accent-500 border-0 text-white shadow-lg shadow-accent-600/25 hover:shadow-accent-600/40 hover:-translate-y-0.5" 
                      : "border-navy-200 text-navy-900 hover:bg-navy-900 hover:text-white hover:border-navy-900"
                  )}
                >
                  <Link href="/book">{pkg.cta}</Link>
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 02: Workflow Automation ──────────────────────────────────────────── */}
        <motion.div
          className="mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10 text-center md:text-left">
            <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">02 — Workflow Automation</h3>
            <p className="text-neutral-500">Connect your tools. Automate your operations.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {workflowPackages.map((pkg, i) => (
              <motion.div
                key={pkg.title}
                variants={itemVariants}
                className={cn(
                  "relative flex flex-col p-8 rounded-[2rem] border transition-all duration-300",
                  pkg.popular 
                    ? "bg-navy-950 text-white border-navy-800 shadow-xl md:-translate-y-4" 
                    : "bg-neutral-50 text-navy-900 border-neutral-200 hover:border-navy-300 hover:shadow-lg"
                )}
              >
                {pkg.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent-500 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <h4 className="text-xl font-bold mb-2" style={pkg.popular ? { color: "#ffffff" } : {}}>{pkg.title}</h4>
                <div className="mb-6">
                  <span className={cn("text-4xl font-display font-extrabold", pkg.popular ? "text-white" : "text-navy-900")}>
                    {pkg.price}
                  </span>
                </div>
                
                <p className={cn("text-sm font-medium mb-8 min-h-[60px]", pkg.popular ? "text-neutral-400" : "text-neutral-600")}>
                  {pkg.for}
                </p>
                
                <div className="flex-1 space-y-4 mb-10">
                  {pkg.features.map(feat => (
                    <div key={feat} className="flex items-start gap-3">
                      <Check size={16} className={cn("mt-0.5 shrink-0", pkg.popular ? "text-accent-400" : "text-navy-900")} />
                      <span className={cn("text-sm", pkg.popular ? "text-neutral-300" : "text-neutral-700")}>{feat}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  asChild 
                  variant={pkg.popular ? "primary" : "outline"} 
                  className={cn("w-full justify-center", pkg.popular ? "bg-accent-600 hover:bg-accent-500 border-0 text-white" : "border-navy-200 hover:bg-navy-50")}
                >
                  <Link href={siteConfig.cta.primary.href}>Get a Free Consultation</Link>
                </Button>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 text-center px-4">
            <p className="text-sm font-medium text-neutral-500 max-w-3xl mx-auto leading-relaxed">
              Every workflow is custom-scoped. Final pricing depends on the systems and APIs being connected, integration complexity, workflow logic, AI requirements, and overall implementation scope.
            </p>
          </motion.div>
        </motion.div>

        {/* ── 03 & 04: Dedicated Partners ──────────────────────────────────────── */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          {/* Technical Partner */}
          <motion.div variants={itemVariants} className="flex flex-col bg-neutral-50 rounded-[2rem] p-8 md:p-10 border border-neutral-200 hover:border-navy-300 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">03 — Technical Developer Partner</h3>
            <div className="mb-6">
              <span className="text-4xl font-display font-extrabold text-navy-900">$2,499</span>
              <span className="text-neutral-500 font-medium ml-2">/ month</span>
            </div>
            
            <p className="text-sm font-medium text-neutral-600 mb-2">
              Your ongoing technical partner for AI, automation, and product development.
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              For startups and growing businesses that need reliable technical expertise without the cost of hiring a full-time developer.
            </p>

            <div className="flex-1 space-y-4 mb-10">
              {[
                "Build and improve AI-powered systems",
                "Design and maintain intelligent automations",
                "Integrate APIs, CRMs, databases, and business tools",
                "Develop internal tools and operational systems",
                "Build and optimize AI agents",
                "Solve technical bottlenecks and integration challenges",
                "Continuously improve existing workflows",
                "Provide ongoing technical strategy and execution"
              ].map(feat => (
                <div key={feat} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-navy-900" />
                  <span className="text-sm text-neutral-700">{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center mb-6">
                <p className="text-sm font-bold text-navy-900">Flexible. Ongoing. Built around your priorities.</p>
              </div>
              <Button asChild variant="outline" className="w-full justify-center border-navy-200 hover:bg-navy-50">
                <Link href={siteConfig.cta.primary.href}>Get a Free Consultation</Link>
              </Button>
            </div>
          </motion.div>

          {/* SaaS Development */}
          <motion.div variants={itemVariants} className="flex flex-col bg-neutral-50 rounded-[2rem] p-8 md:p-10 border border-neutral-200 hover:border-navy-300 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-display font-bold text-navy-900 mb-2">04 — SaaS Product Development</h3>
            <div className="mb-6">
              <span className="text-neutral-500 font-medium mr-2">Starting at</span>
              <span className="text-4xl font-display font-extrabold text-navy-900">$10,000</span>
            </div>
            
            <p className="text-sm font-medium text-neutral-600 mb-2">
              Turn your idea, workflow, or business process into a scalable SaaS product.
            </p>
            <p className="text-sm text-neutral-500 mb-8">
              For founders and businesses ready to transform an idea or proven business process into a production-ready software product.
            </p>

            <div className="flex-1 space-y-4 mb-10">
              {[
                "Product architecture and technical planning",
                "Modern web application development",
                "Scalable backend and database architecture",
                "Authentication and user management",
                "API and third-party integrations",
                "AI-powered functionality",
                "Payments and subscription systems",
                "Testing, deployment, and production launch"
              ].map(feat => (
                <div key={feat} className="flex items-start gap-3">
                  <Check size={16} className="mt-0.5 shrink-0 text-navy-900" />
                  <span className="text-sm text-neutral-700">{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="bg-white border border-neutral-200 rounded-xl p-4 text-center mb-6">
                <p className="text-sm font-bold text-navy-900">Typical engagement: 8–16 weeks</p>
              </div>
              <Button asChild variant="outline" className="w-full justify-center border-navy-200 hover:bg-navy-50">
                <Link href={siteConfig.cta.primary.href}>Get a Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Closing CTA ──────────────────────────────────────────────────────── */}
        <motion.div
          className="text-center max-w-2xl mx-auto p-8 rounded-[2rem] bg-navy-50 border border-navy-100"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <motion.h4 variants={itemVariants} className="text-xl font-bold text-navy-900 mb-3">
            Not sure what you need?
          </motion.h4>
          <motion.p variants={itemVariants} className="text-neutral-600 mb-8">
            Start with an Automation Audit. I&apos;ll identify the highest-value opportunities and recommend the right path forward.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild variant="primary" size="lg" className="bg-accent-600 hover:bg-accent-500 text-white border-0 shadow-lg group">
              <Link href={siteConfig.cta.primary.href}>
                Free Consultation
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

      </Container>
    </section>
  );
}
