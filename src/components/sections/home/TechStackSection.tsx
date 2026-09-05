"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { 
  N8nIcon, 
  OpenAIIcon, 
  MakeIcon, 
  PythonIcon,
  DjangoIcon,
  PostgreSQLIcon,
  NodeJSIcon,
  NextJSIcon,
  RestApiIcon,
  GmailOAuthIcon,
  WebhooksIcon,
  DockerIcon,
  TwilioIcon
} from "@/lib/social-icons";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const VIEWPORT = { once: true, margin: "-10%" } as const;
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

const capabilityGroups = [
  {
    id: "automation",
    label: "Automation & AI",
    tagline: "Automate repetitive business work and build intelligent customer-facing systems.",
    tools: [
      { 
        name: "n8n", 
        description: "Workflow orchestration for business processes and system integrations.", 
        icon: N8nIcon,
        bgClass: "bg-rose-50/80 border-rose-100/80 group-hover:bg-rose-100/90"
      },
      { 
        name: "OpenAI", 
        description: "AI-powered intelligence for classification, extraction, generation, and decision-making.", 
        icon: OpenAIIcon,
        bgClass: "bg-emerald-50/80 border-emerald-100/80 group-hover:bg-emerald-100/90"
      },
      { 
        name: "Make", 
        description: "Visual automation and cross-platform system integration.", 
        icon: MakeIcon,
        bgClass: "bg-purple-50/80 border-purple-100/80 group-hover:bg-purple-100/90"
      },
      { 
        name: "Python", 
        description: "Custom automation logic, API integrations, and backend processing.", 
        icon: PythonIcon,
        bgClass: "bg-sky-50/80 border-sky-100/80 group-hover:bg-sky-100/90"
      },
    ],
  },
  {
    id: "backend",
    label: "Backend & Application Development",
    tagline: "Build reliable systems that securely manage business data, application logic, and automation infrastructure.",
    tools: [
      { 
        name: "Django", 
        description: "Secure backend applications and business systems.", 
        icon: DjangoIcon,
        bgClass: "bg-emerald-50/80 border-emerald-100/80 group-hover:bg-emerald-100/90"
      },
      { 
        name: "PostgreSQL", 
        description: "Structured and reliable business data storage.", 
        icon: PostgreSQLIcon,
        bgClass: "bg-blue-50/80 border-blue-100/80 group-hover:bg-blue-100/90"
      },
      { 
        name: "Node.js", 
        description: "Server-side applications and integrations.", 
        icon: NodeJSIcon,
        bgClass: "bg-green-50/80 border-green-100/80 group-hover:bg-green-100/90"
      },
      { 
        name: "Next.js", 
        description: "Modern full-stack web applications and client-facing platforms.", 
        icon: NextJSIcon,
        bgClass: "bg-neutral-100/80 border-neutral-200/80 group-hover:bg-neutral-200/90"
      },
    ],
  },
  {
    id: "integrations",
    label: "Integrations & Infrastructure",
    tagline: "Connect the systems businesses already use and deploy reliable production applications.",
    tools: [
      { 
        name: "REST APIs", 
        description: "Connect your existing business systems and third-party services.", 
        icon: RestApiIcon,
        bgClass: "bg-cyan-50/80 border-cyan-100/80 group-hover:bg-cyan-100/90"
      },
      { 
        name: "Gmail / OAuth", 
        description: "Secure email automation and account integration.", 
        icon: GmailOAuthIcon,
        bgClass: "bg-red-50/80 border-red-100/80 group-hover:bg-red-100/90"
      },
      { 
        name: "Webhooks", 
        description: "Real-time communication between connected systems.", 
        icon: WebhooksIcon,
        bgClass: "bg-amber-50/80 border-amber-100/80 group-hover:bg-amber-100/90"
      },
      { 
        name: "Docker", 
        description: "Consistent and portable application deployment.", 
        icon: DockerIcon,
        bgClass: "bg-sky-50/80 border-sky-100/80 group-hover:bg-sky-100/90"
      },
      { 
        name: "Twilio", 
        description: "Voice, SMS, and communication infrastructure for AI-powered interactions.", 
        icon: TwilioIcon,
        bgClass: "bg-rose-50/80 border-rose-100/80 group-hover:bg-rose-100/90"
      },
      { 
        name: "Make", 
        description: "Workflow automation and third-party application integration.", 
        icon: MakeIcon,
        bgClass: "bg-purple-50/80 border-purple-100/80 group-hover:bg-purple-100/90"
      },
    ],
  },
];

const highLevelArchitecture = [
  "BUSINESS PROBLEM",
  "AI & AUTOMATION",
  "INTEGRATIONS",
  "DATA & BACKEND",
  "BUSINESS SOLUTION"
];

const voiceAgentStack = [
  "CUSTOMER CALL",
  "TWILIO",
  "AI VOICE AGENT",
  "OPENAI",
  "VOICE ENGINE",
  "CUSTOMER RESPONSE",
  "FOLLOW-UP SMS"
];

export function TechStackSection() {
  const shouldReduce = useReducedMotion();

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: shouldReduce ? 0 : 0.6, ease: EASE } },
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduce ? 0 : 0.1 } },
  };

  return (
    <section className="bg-white py-16 lg:py-24 relative border-t border-neutral-100" aria-labelledby="tech-heading">
      <Container>
        
        <motion.div
          className="text-center mb-14 max-w-3xl mx-auto space-y-5"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUpVariants}
        >
          <div className="inline-flex items-center justify-center gap-3 sm:gap-4 mb-2">
            <span className="w-8 sm:w-14 h-px bg-gradient-to-r from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
            <p className="text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-accent-600">
              Technology & Capabilities
            </p>
            <span className="w-8 sm:w-14 h-px bg-gradient-to-l from-transparent via-accent-500/80 to-accent-500" aria-hidden="true" />
          </div>
          <h2
            id="tech-heading"
            className="text-4xl md:text-5xl font-display font-extrabold text-navy-900 leading-[1.1] tracking-tight"
          >
            Technology That Gets Things Done
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 leading-relaxed font-medium">
            Technology is selected based on the business problem. Every tool is chosen to create secure, reliable, and scalable solutions — not simply because it is popular.
          </p>
        </motion.div>

        <motion.div 
          className="mb-14 relative py-6 px-4 sm:px-12 bg-neutral-50 rounded-[2rem] border border-neutral-100 shadow-sm overflow-x-auto no-scrollbar"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={containerVariants}
        >
          <div className="flex items-center justify-between min-w-[800px] gap-4 relative z-10">
            {highLevelArchitecture.map((step, i) => (
              <React.Fragment key={step}>
                <motion.div 
                  variants={fadeUpVariants}
                  className={cn(
                    "flex-shrink-0 px-6 py-4 rounded-xl font-semibold text-sm tracking-wider uppercase border",
                    i === 0 || i === highLevelArchitecture.length - 1
                      ? "bg-navy-900 text-white border-navy-800 shadow-lg"
                      : "bg-white text-navy-900 border-neutral-200 shadow-sm"
                  )}
                >
                  {step}
                </motion.div>
                {i !== highLevelArchitecture.length - 1 && (
                  <motion.div variants={fadeUpVariants} className="flex-1 h-px bg-neutral-300 relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 text-neutral-400">
                      <ArrowRight size={16} />
                    </div>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>

        <div className="space-y-16 mb-16">
          {capabilityGroups.map((group, groupIndex) => (
            <motion.div 
              key={group.id}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              variants={fadeUpVariants}
            >
              <div className="mb-10 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-full bg-accent-50 text-accent-600 flex items-center justify-center font-bold text-sm">
                    {groupIndex + 1}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-navy-900">
                    {group.label}
                  </h3>
                </div>
                <p className="text-lg text-neutral-600 max-w-2xl md:pl-12">
                  {group.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:pl-12">
                {group.tools.map((tool) => (
                  <div 
                    key={tool.name}
                    className="group bg-white rounded-2xl p-6 border border-neutral-200 hover:border-navy-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-400 to-accent-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    
                    <div className={cn(
                      "w-12 h-12 rounded-xl border flex items-center justify-center mb-6 transition-all duration-300 shadow-sm group-hover:scale-105 group-hover:shadow",
                      tool.bgClass || "bg-neutral-50 border-neutral-100 group-hover:bg-accent-50"
                    )}>
                      <tool.icon size={26} className="transition-transform duration-300 group-hover:scale-110 shrink-0" />
                    </div>
                    
                    <h4 className="text-lg font-bold text-navy-900 mb-2">{tool.name}</h4>
                    <p className="text-sm text-neutral-600 leading-relaxed flex-1">
                      {tool.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-navy-900 rounded-[2.5rem] p-8 md:p-12 border border-navy-800 shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          variants={fadeUpVariants}
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
          
          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-3">
                Architecture in Action: AI Voice Agent
              </h3>
              <p className="text-neutral-400 max-w-2xl mx-auto">
                A look at how independent technologies are orchestrated into a single, seamless conversational AI system.
              </p>
            </div>

            <div className="hidden lg:flex items-center justify-between gap-2 mb-12">
              {voiceAgentStack.map((node, i) => (
                <React.Fragment key={node}>
                  <div className={cn(
                    "px-4 py-3 rounded-lg text-[10px] font-bold tracking-wider text-center flex-1 border shadow-sm",
                    i === 0 || i === voiceAgentStack.length - 1 || i === voiceAgentStack.length - 2
                      ? "bg-white text-navy-900 border-white"
                      : "bg-navy-800 text-white border-navy-700"
                  )}>
                    {node}
                  </div>
                  {i !== voiceAgentStack.length - 1 && (
                    <div className="text-accent-500 flex-shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-col lg:hidden items-center gap-2 mb-12">
              {voiceAgentStack.map((node, i) => (
                <React.Fragment key={node}>
                  <div className={cn(
                    "px-6 py-3 w-full max-w-xs rounded-lg text-xs font-bold tracking-wider text-center border shadow-sm",
                    i === 0 || i === voiceAgentStack.length - 1 || i === voiceAgentStack.length - 2
                      ? "bg-white text-navy-900 border-white"
                      : "bg-navy-800 text-white border-navy-700"
                  )}>
                    {node}
                  </div>
                  {i !== voiceAgentStack.length - 1 && (
                    <div className="text-accent-500 py-1">
                      <ArrowDown size={16} />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-neutral-400 tracking-wider">
              <span className="flex items-center gap-2 bg-navy-800/50 px-4 py-2 rounded-full border border-navy-700 text-neutral-300">
                <PythonIcon size={16} /> Python
              </span>
              <span className="flex items-center gap-2 bg-navy-800/50 px-4 py-2 rounded-full border border-navy-700 text-neutral-300">
                <MakeIcon size={16} /> Make
              </span>
              <span className="flex items-center gap-2 bg-navy-800/50 px-4 py-2 rounded-full border border-navy-700 text-neutral-300">
                <RestApiIcon size={16} /> APIs
              </span>
            </div>
          </div>
        </motion.div>

      </Container>
    </section>
  );
}
