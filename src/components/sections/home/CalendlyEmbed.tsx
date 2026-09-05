"use client";

import { InlineWidget } from "react-calendly";
import { siteConfig } from "@/config/site";

export function CalendlyEmbed() {
  return (
    <div className="w-full h-full min-h-[750px] rounded-[2rem] overflow-hidden shadow-2xl shadow-navy-950/50 border border-navy-800 bg-white">
      <InlineWidget
        url={siteConfig.cta.primary.calendlyUrl}
        styles={{
          height: "100%",
          minHeight: "750px",
          width: "100%",
        }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "0066ff",
          textColor: "0f2040",
        }}
      />
    </div>
  );
}
