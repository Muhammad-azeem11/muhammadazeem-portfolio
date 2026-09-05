/**
 * src/lib/analytics.ts
 * 
 * Lightweight conversion tracking architecture.
 * This prepares the application for future analytics platforms 
 * (like PostHog, Google Analytics, Plausible) without sending data anywhere yet.
 */

export type EventName = 
  | "book_call_click"
  | "whatsapp_click"
  | "email_click"
  | "contact_form_submit"
  | "resume_download"
  | "view_case_studies_click";

export function trackEvent(eventName: EventName, properties?: Record<string, string | number | boolean>) {
  // Check if we are in the browser to avoid server-side execution errors
  if (typeof window !== "undefined") {
    // TODO: Initialize analytics provider here (e.g. posthog.capture, window.gtag)
    
    // For now, log in development to verify the architecture is working
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] Tracked Event: ${eventName}`, properties || {});
    }
  }
}
