import type { Metadata } from "next";
import { generateMetadata as genMeta } from "@/config/seo";
import { Container } from "@/components/ui/Container";
import { CalendlyEmbed } from "@/components/sections/home/CalendlyEmbed";
import { CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerChildren } from "@/components/animations";
import * as motion from "framer-motion/client";

export const metadata: Metadata = genMeta({
  title: "Free Consultation",
  description: "Book a complimentary consultation to discuss your workflow, challenges, and opportunities for AI-powered automation.",
  alternates: { canonical: "/book" },
});

const discussionPoints = [
  "Your current business workflow",
  "Manual processes worth automating",
  "AI agent opportunities",
  "CRM and system integrations",
  "Potential automation roadmap",
];

export default function BookPage() {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 bg-navy-950 relative overflow-hidden">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-accent-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-400/5 blur-[100px]" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
          }} 
        />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Copy & Value Proposition */}
          <div className="flex flex-col pt-4 lg:pt-12">
            <FadeIn delay={0.1}>
              <span className="inline-flex items-center rounded-full bg-navy-900/50 border border-navy-800 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent-400 mb-6">
                Free Consultation
              </span>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h1 
                className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[1.1] tracking-tight mb-6"
                style={{ color: "#ffffff" }}
              >
                Let&apos;s Discuss What You Can <br className="hidden lg:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-300">Automate.</span>
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <p className="text-lg text-neutral-400 leading-relaxed mb-10">
                Book a complimentary consultation to discuss your workflow, challenges, and opportunities for AI-powered automation.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-navy-900/30 border border-navy-800/50 rounded-2xl p-6 lg:p-8 backdrop-blur-sm">
                <h3 
                  className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-navy-800 pb-4"
                  style={{ color: "#ffffff" }}
                >
                  What we can discuss:
                </h3>
                
                <StaggerChildren className="space-y-4">
                  {discussionPoints.map((point, i) => (
                    <motion.div 
                      key={i}
                      className="flex items-start gap-4"
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-accent-400 shrink-0 mt-0.5" />
                      <span className="text-neutral-300 font-medium">{point}</span>
                    </motion.div>
                  ))}
                </StaggerChildren>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Calendly Embed */}
          <FadeIn delay={0.3} className="relative w-full h-full min-h-[750px] lg:min-h-[800px]">
            {/* Elegant glow effect behind calendar */}
            <div className="absolute -inset-1 bg-gradient-to-b from-accent-500/20 to-navy-900/20 blur-2xl rounded-[2.5rem] opacity-50" />
            
            <div className="relative w-full h-full">
              <CalendlyEmbed />
            </div>
          </FadeIn>

        </div>
      </Container>
    </section>
  );
}
