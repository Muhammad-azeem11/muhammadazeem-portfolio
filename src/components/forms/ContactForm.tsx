"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitContactForm, type ContactState } from "@/app/actions/contact";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const initialState: ContactState = {
  status: "idle",
  message: "",
};

const serviceOptions = [
  "Business Automation & AI Audit",
  "Workflow Automation",
  "Technical Developer Partner",
  "SaaS Product Development",
  "Other / Custom Inquiry",
];

const investmentOptions = [
  "Business Automation & AI Audit ($199 – $999)",
  "Workflow Automation (From $750 – $3,000+)",
  "Technical Developer Partner ($2,499/month)",
  "SaaS Product Development (Starting at $10,000)",
  "Not sure yet / Flexible",
];

const nextStepOptions = [
  "Book a Free Consultation",
  "Discuss by Email",
  "Just exploring",
];

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      size="xl"
      className="group w-full sm:w-auto bg-navy-900 hover:bg-navy-950 text-white rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-navy-900/15 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2 flex items-center justify-center gap-3 px-8 h-13"
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-accent-400" aria-hidden="true" />
          <span>Submitting Inquiry...</span>
        </>
      ) : (
        <>
          <span>Send Message & Inquire</span>
          <ArrowRight className="h-4 w-4 text-accent-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
        </>
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [selectedNextStep, setSelectedNextStep] = useState("");

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
      trackEvent("contact_form_submit", { status: "success" });
    } else if (state.status === "error") {
      trackEvent("contact_form_submit", { status: "error" });
    }
  }, [state.status]);

  if (state.status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="bg-white border border-neutral-200/90 rounded-[2rem] p-8 md:p-12 text-center shadow-xl shadow-navy-950/5 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-500 to-accent-600" />
        
        <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
          <CheckCircle2 className="text-emerald-600 w-10 h-10" />
        </div>
        
        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 mb-3">
          Inquiry Received Successfully
        </h3>
        
        <p className="text-base sm:text-lg text-neutral-600 mb-8 max-w-md mx-auto leading-relaxed">
          {state.message || "Thank you! I will review your workflow details and respond within 24 hours."}
        </p>
        
        {state.preferredNextStep === "Book a Free Consultation" ? (
          <div className="space-y-4 max-w-sm mx-auto">
            <Button
              asChild
              size="xl"
              className="w-full bg-accent-600 hover:bg-accent-500 text-white rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm shadow-xl shadow-accent-600/20 hover:-translate-y-0.5 transition-all"
            >
              <Link href={siteConfig.cta.primary.href}>
                Select a Time on Calendly <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <p className="text-xs text-neutral-500">Fastest way to get direct feedback on your project.</p>
          </div>
        ) : (
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="rounded-full px-8 h-12 border-navy-200 hover:bg-navy-900 hover:text-white transition-all"
          >
            Send Another Inquiry
          </Button>
        )}
      </motion.div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200/90 rounded-[2rem] p-7 sm:p-10 lg:p-12 shadow-2xl shadow-navy-950/5 relative overflow-hidden">
      {/* Top accent gradient bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-500 via-accent-400 to-accent-600" />
      
      <div className="mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-50 text-accent-700 text-[11px] font-bold uppercase tracking-widest mb-3 border border-accent-100/80">
          <Sparkles size={13} className="text-accent-600" aria-hidden="true" />
          Direct Inquiry
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 mb-3 tracking-tight">
          Let&apos;s Build Something That Matters.
        </h2>
        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
          Tell me about your business, current workflows, and what you&apos;re looking to automate or build. I&apos;ll get back to you with actionable insights.
        </p>
      </div>

      <AnimatePresence>
        {state.status === "error" && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 p-4.5 bg-rose-50/90 border border-rose-200 rounded-2xl flex gap-3 text-rose-800 text-sm shadow-xs"
          >
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-rose-600" aria-hidden="true" />
            <p className="leading-relaxed font-medium">{state.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <form ref={formRef} action={formAction} className="space-y-6 sm:space-y-7">
        
        {/* Name & Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
              Full Name <span className="text-accent-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-invalid={!!state.errors?.name}
              className="w-full h-13 px-4.5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium placeholder:text-neutral-400 placeholder:font-normal"
              placeholder="e.g. John Doe"
            />
            {state.errors?.name && (
              <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
              Work Email <span className="text-accent-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-invalid={!!state.errors?.email}
              className="w-full h-13 px-4.5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium placeholder:text-neutral-400 placeholder:font-normal"
              placeholder="e.g. john@company.com"
            />
            {state.errors?.email && (
              <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.email[0]}</p>
            )}
          </div>
        </div>

        {/* Company */}
        <div className="space-y-2">
          <label htmlFor="company" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
            Company / Organization <span className="text-accent-500">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            aria-invalid={!!state.errors?.company}
            className="w-full h-13 px-4.5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium placeholder:text-neutral-400 placeholder:font-normal"
            placeholder="e.g. Acme Corporation"
          />
          {state.errors?.company && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.company[0]}</p>
          )}
        </div>

        {/* Service */}
        <div className="space-y-2">
          <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
            Primary Service Needed <span className="text-accent-500">*</span>
          </label>
          <div className="relative group">
            <select
              id="service"
              name="service"
              required
              aria-invalid={!!state.errors?.service}
              className="w-full h-13 px-4.5 pr-11 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-neutral-400">Select a service option...</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt} className="text-navy-900 py-1.5">{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-navy-900 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
          {state.errors?.service && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.service[0]}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
            Project / Business Details <span className="text-accent-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            aria-invalid={!!state.errors?.message}
            className="w-full p-4.5 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium placeholder:text-neutral-400 placeholder:font-normal resize-y"
            placeholder="Briefly describe your current manual bottlenecks, workflows, or technical goals..."
          />
          {state.errors?.message && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.message[0]}</p>
          )}
        </div>

        {/* Investment */}
        <div className="space-y-2">
          <label htmlFor="budget" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
            Estimated Investment / Budget Range <span className="text-accent-500">*</span>
          </label>
          <div className="relative group">
            <select
              id="budget"
              name="budget"
              required
              aria-invalid={!!state.errors?.budget}
              className="w-full h-13 px-4.5 pr-11 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium appearance-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled className="text-neutral-400">Select an estimated investment range...</option>
              {investmentOptions.map((opt) => (
                <option key={opt} value={opt} className="text-navy-900 py-1.5">{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-navy-900 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
          {state.errors?.budget && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.budget[0]}</p>
          )}
        </div>

        {/* Next Step */}
        <div className="space-y-2">
          <label htmlFor="nextStep" className="block text-xs font-bold uppercase tracking-wider text-navy-900">
            Preferred Next Step <span className="text-accent-500">*</span>
          </label>
          <div className="relative group">
            <select
              id="nextStep"
              name="nextStep"
              required
              value={selectedNextStep}
              onChange={(e) => setSelectedNextStep(e.target.value)}
              aria-invalid={!!state.errors?.nextStep}
              className="w-full h-13 px-4.5 pr-11 rounded-xl border border-neutral-200 bg-neutral-50/60 hover:bg-neutral-50/90 hover:border-neutral-300 focus:bg-white focus:border-accent-500 focus:ring-4 focus:ring-accent-500/10 transition-all duration-200 outline-none text-navy-900 text-sm sm:text-base font-medium appearance-none cursor-pointer"
            >
              <option value="" disabled className="text-neutral-400">How would you like to proceed?</option>
              {nextStepOptions.map((opt) => (
                <option key={opt} value={opt} className="text-navy-900 py-1.5">{opt}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 group-hover:text-navy-900 transition-colors">
              <ChevronDown size={18} />
            </div>
          </div>
          {state.errors?.nextStep && (
            <p className="text-xs text-rose-600 font-semibold mt-1">{state.errors.nextStep[0]}</p>
          )}
        </div>

        <div className="pt-3 sm:pt-4">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
