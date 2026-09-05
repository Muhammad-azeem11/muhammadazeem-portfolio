// src/app/(marketing)/case-studies/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { generateMetadata as genMeta } from "@/config/seo";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/cms/case-studies";
import { Container, Section } from "@/components/ui/Container";
import { WorkflowDiagram } from "@/components/ui/WorkflowDiagram";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const caseStudies = await getCaseStudies();
  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) return {};

  return genMeta({
    title: `${study.title} | Case Study`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  const allStudies = await getCaseStudies();
  const currentIndex = allStudies.findIndex(s => s.slug === slug);
  const displayIndex = currentIndex !== -1 ? currentIndex + 1 : 1;

  if (!study) {
    notFound();
  }

  const isWilsden = study.slug === "wilsden-business-automation";

  // Dedicated demo links mapping
  const DEMO_LINKS: Record<string, string> = {
    "ai-document-processing-data-extraction": "https://youtu.be/toV23JEnABY",
    "ai-voice-receptionist-demo": "https://youtu.be/qS7_dj50Bw4",
    "ai-client-onboarding-demo": "https://youtu.be/o3E7dOJOkE8",
    "intelligent-email-document-automation": "https://youtu.be/toV23JEnABY",
    "ai-voice-agent": "https://youtu.be/qS7_dj50Bw4",
    "ai-client-onboarding-automation": "https://youtu.be/o3E7dOJOkE8",
  };

  const demoUrl = study.videoUrl || DEMO_LINKS[study.slug] || "";

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.summary,
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <article className="bg-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <header className="relative pt-32 pb-16 lg:pt-36 lg:pb-20 overflow-hidden bg-white border-b border-neutral-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] opacity-30 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, #f8fafc 0%, transparent 70%)' }} />
        
        <Container size="sm" className="relative z-10">
          <div className="mb-12">
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-navy-900 transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-50 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" />
              </div>
              Back to Projects
            </Link>
          </div>

          <div className="space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
                PROJECT 0{displayIndex}
              </span>
              <span className="w-8 h-px bg-neutral-200" />
              <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-navy-50 text-navy-900 border border-navy-100 rounded-md">
                {study.category}
              </span>
              {study.projectType && (
                <span className={cn(
                  "px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest border rounded-md flex items-center gap-2",
                  isWilsden 
                    ? "bg-accent-50 text-accent-700 border-accent-200" 
                    : "bg-green-50 text-green-700 border-green-200"
                )}>
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    isWilsden ? "bg-accent-500 animate-pulse" : "bg-green-500"
                  )} />
                  {study.projectType}
                </span>
              )}
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-display font-extrabold text-navy-900 leading-[1.05] tracking-tight">
              {study.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed font-medium max-w-3xl">
              {study.summary}
            </p>

            {demoUrl && (
              <div className="pt-2 flex items-center gap-4 flex-wrap">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-red-600 hover:bg-red-700 text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg shadow-red-600/25 hover:shadow-red-600/40 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Play size={16} className="fill-white" />
                  Watch Demo
                  <ArrowUpRight size={16} />
                </a>
              </div>
            )}
          </div>
        </Container>
      </header>

      {/* ── EDITORIAL CONTENT ─────────────────────────────────────────────────── */}
      <Section background="white" className="py-16 lg:py-20">
        <Container size="sm">
          <div className="space-y-16 lg:space-y-20">
            
            {/* THE CHALLENGE */}
            <section className="group">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0 md:w-48">
                  The Challenge
                </h2>
                <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
              </div>
              <div className="md:pl-[15rem]">
                <p className="text-xl md:text-2xl text-navy-900 leading-relaxed font-medium">
                  {study.problem}
                </p>
              </div>
            </section>

            {/* THE SOLUTION */}
            <section className="group">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500 shrink-0 md:w-48">
                  The Solution
                </h2>
                <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
              </div>
              <div className="md:pl-[15rem]">
                <p className="text-xl md:text-2xl text-navy-900 leading-relaxed font-medium">
                  {study.solution}
                </p>
              </div>
            </section>

            {/* VIDEO DEMONSTRATION */}
            {demoUrl && (() => {
              const ytMatch = demoUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
              const embedUrl = ytMatch && ytMatch[1] ? `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` : null;
              return (
                <section id="video-demo" className="group scroll-mt-32">
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-accent-500 shrink-0 md:w-48">
                      Demo Video
                    </h2>
                    <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
                  </div>
                  <div className="md:pl-[15rem] space-y-6">
                    {embedUrl ? (
                      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-neutral-200 shadow-xl bg-navy-950">
                        <iframe
                          src={embedUrl}
                          title={`${study.title} Demonstration`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      </div>
                    ) : null}
                    <div>
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                      >
                        <Play size={14} className="fill-white" />
                        Watch on YouTube
                        <ArrowUpRight size={16} />
                      </a>
                    </div>
                  </div>
                </section>
              );
            })()}

            {/* HOW IT WORKS (Animated Workflow) */}
            {study.architecture && study.architecture.length > 0 && (
              <section className="w-full">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-16">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0 md:w-48">
                    How It Works
                  </h2>
                  <div className="h-px bg-neutral-100 flex-1" />
                </div>
                <div className="bg-neutral-50 border border-neutral-100 rounded-[2.5rem] p-8 md:p-16">
                  <WorkflowDiagram steps={study.architecture} />
                </div>
              </section>
            )}

            {/* MY ROLE */}
            {study.myRole && (
              <section className="group">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0 md:w-48">
                    My Role
                  </h2>
                  <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
                </div>
                <div className="md:pl-[15rem]">
                  <p className="text-lg text-neutral-600 leading-relaxed">
                    {study.myRole}
                  </p>
                </div>
              </section>
            )}

            {/* TECHNOLOGY */}
            <section className="group">
              <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0 md:w-48">
                  Technology
                </h2>
                <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
              </div>
              <div className="md:pl-[15rem]">
                <div className="flex flex-wrap gap-3">
                  {study.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-white border border-neutral-200 shadow-sm text-navy-900 font-bold text-sm tracking-wide rounded-lg hover:border-accent-300 hover:shadow-md transition-all">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* BUSINESS VALUE */}
            {study.businessValue && (
              <section className="group">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 mb-8">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-400 shrink-0 md:w-48">
                    Business Value
                  </h2>
                  <div className="h-px bg-neutral-100 flex-1 group-hover:bg-accent-200 transition-colors duration-500" />
                </div>
                <div className="md:pl-[15rem]">
                  <p className="text-lg text-neutral-600 leading-relaxed font-medium">
                    {study.businessValue}
                  </p>
                </div>
              </section>
            )}

            {/* CONFIDENTIALITY NOTE */}
            {study.confidentiality && (
              <section>
                <div className="bg-neutral-50/50 border border-neutral-100 rounded-3xl p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500" />
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 mb-4">
                    Confidentiality Notice
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed max-w-3xl">
                    {study.confidentiality}
                  </p>
                </div>
              </section>
            )}

          </div>
        </Container>
      </Section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────────────── */}
      <Section className="pt-8 pb-16 lg:pb-20">
        <Container size="sm">
          <div 
            className="rounded-[3rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl group border border-navy-800"
            style={{ backgroundColor: "#020817" }} // navy-950
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent-500/20 via-transparent to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              <h2 
                className="text-4xl md:text-5xl font-display font-extrabold leading-tight"
                style={{ color: "#ffffff" }}
              >
                Have a similar workflow<br/>to automate?
              </h2>
              
              <p 
                className="text-lg max-w-lg mx-auto font-medium"
                style={{ color: "#94a3b8" }} // neutral-400
              >
                Book a meeting to discuss your workflow, requirements, and the right automation approach.
              </p>
              
              <Link 
                href={siteConfig.cta.primary.href}
                className="inline-flex items-center gap-4 bg-accent-600 text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-accent-500 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 group/btn mt-4 hover:-translate-y-1"
                target={siteConfig.cta.primary.href.startsWith("http") ? "_blank" : undefined}
                rel={siteConfig.cta.primary.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Discuss a Similar Project
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover/btn:bg-white/30 transition-colors">
                  <ArrowUpRight size={16} className="text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </article>
  );
}
