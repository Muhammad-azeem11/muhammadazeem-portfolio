// src/components/ui/CountryFlag.tsx
// Pure vector SVG country flags consistent with Header.tsx (renders crisply on Windows, macOS, iOS, Android)

import React from "react";
import { cn } from "@/lib/utils";

export type SupportedCountryCode =
  | "US"
  | "GB"
  | "UK"
  | "CA"
  | "DE"
  | "AU"
  | "NL"
  | "SA"
  | "AE"
  | "FR"
  | "IE"
  | "CH"
  | "SG"
  | string;

export const COUNTRIES_LIST = [
  { code: "US", name: "United States", shortName: "USA", emoji: "🇺🇸" },
  { code: "GB", name: "United Kingdom", shortName: "UK", emoji: "🇬🇧" },
  { code: "CA", name: "Canada", shortName: "Canada", emoji: "🇨🇦" },
  { code: "DE", name: "Germany", shortName: "Germany", emoji: "🇩🇪" },
  { code: "AU", name: "Australia", shortName: "Australia", emoji: "🇦🇺" },
  { code: "NL", name: "Netherlands", shortName: "Netherlands", emoji: "🇳🇱" },
  { code: "SA", name: "Saudi Arabia", shortName: "Saudi Arabia", emoji: "🇸🇦" },
  { code: "AE", name: "United Arab Emirates", shortName: "UAE", emoji: "🇦🇪" },
  { code: "IE", name: "Ireland", shortName: "Ireland", emoji: "🇮🇪" },
  { code: "FR", name: "France", shortName: "France", emoji: "🇫🇷" },
  { code: "CH", name: "Switzerland", shortName: "Switzerland", emoji: "🇨🇭" },
  { code: "SG", name: "Singapore", shortName: "Singapore", emoji: "🇸🇬" },
] as const;

export function resolveCountryCode(countryOrCode: string): string {
  const normalized = (countryOrCode || "").trim().toUpperCase();
  if (normalized === "USA" || normalized === "US" || normalized === "UNITED STATES") return "US";
  if (normalized === "UK" || normalized === "GB" || normalized === "UNITED KINGDOM" || normalized === "ENGLAND") return "GB";
  if (normalized === "CA" || normalized === "CANADA") return "CA";
  if (normalized === "DE" || normalized === "GERMANY") return "DE";
  if (normalized === "AU" || normalized === "AUSTRALIA") return "AU";
  if (normalized === "NL" || normalized === "NETHERLANDS") return "NL";
  if (normalized === "SA" || normalized === "SAUDI ARABIA" || normalized === "KSA") return "SA";
  if (normalized === "AE" || normalized === "UAE" || normalized === "UNITED ARAB EMIRATES") return "AE";
  if (normalized === "IE" || normalized === "IRELAND") return "IE";
  if (normalized === "FR" || normalized === "FRANCE") return "FR";
  if (normalized === "CH" || normalized === "SWITZERLAND") return "CH";
  if (normalized === "SG" || normalized === "SINGAPORE") return "SG";
  return normalized.slice(0, 2) || "US";
}

export function CountryFlag({
  code,
  country,
  className,
}: {
  code?: string;
  country?: string;
  className?: string;
}) {
  const resolved = resolveCountryCode(code || country || "US");
  const baseClass = cn(
    "w-[18px] h-[12.6px] inline-block shrink-0 rounded-[2px] overflow-hidden shadow-xs border border-black/15",
    className
  );

  switch (resolved) {
    case "US":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="USA Flag" role="img">
          <rect width="20" height="14" fill="#B22234" />
          <rect y="1.08" width="20" height="1.08" fill="#FFFFFF" />
          <rect y="3.23" width="20" height="1.08" fill="#FFFFFF" />
          <rect y="5.38" width="20" height="1.08" fill="#FFFFFF" />
          <rect y="7.54" width="20" height="1.08" fill="#FFFFFF" />
          <rect y="9.69" width="20" height="1.08" fill="#FFFFFF" />
          <rect y="11.85" width="20" height="1.08" fill="#FFFFFF" />
          <rect width="8" height="7.54" fill="#3C3B6E" />
          <g fill="#FFFFFF" opacity="0.95">
            <circle cx="1.6" cy="1.5" r="0.45" />
            <circle cx="3.2" cy="1.5" r="0.45" />
            <circle cx="4.8" cy="1.5" r="0.45" />
            <circle cx="6.4" cy="1.5" r="0.45" />
            <circle cx="2.4" cy="3.0" r="0.45" />
            <circle cx="4.0" cy="3.0" r="0.45" />
            <circle cx="5.6" cy="3.0" r="0.45" />
            <circle cx="1.6" cy="4.5" r="0.45" />
            <circle cx="3.2" cy="4.5" r="0.45" />
            <circle cx="4.8" cy="4.5" r="0.45" />
            <circle cx="6.4" cy="4.5" r="0.45" />
            <circle cx="2.4" cy="6.0" r="0.45" />
            <circle cx="4.0" cy="6.0" r="0.45" />
            <circle cx="5.6" cy="6.0" r="0.45" />
          </g>
        </svg>
      );

    case "GB":
    case "UK":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="UK Flag" role="img">
          <rect width="20" height="14" fill="#012169" />
          <path d="M0 0 L20 14 M20 0 L0 14" stroke="#FFFFFF" strokeWidth="2.8" />
          <path d="M0 0 L10 7 M20 14 L10 7 M20 0 L10 7 M0 14 L10 7" stroke="#C8102E" strokeWidth="1.2" />
          <path d="M10 0 V14 M0 7 H20" stroke="#FFFFFF" strokeWidth="4.6" />
          <path d="M10 0 V14 M0 7 H20" stroke="#C8102E" strokeWidth="2.8" />
        </svg>
      );

    case "CA":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Canada Flag" role="img">
          <rect width="20" height="14" fill="#D80621" />
          <rect x="5" width="10" height="14" fill="#FFFFFF" />
          <path
            d="M10 2.2 L10.8 4.2 L12.6 3.6 L12 5.4 L13.8 6.2 L11.8 7.4 L12.4 8.8 L10.6 8.2 L10.4 11.2 L9.6 11.2 L9.4 8.2 L7.6 8.8 L8.2 7.4 L6.2 6.2 L8 5.4 L7.4 3.6 L9.2 4.2 Z"
            fill="#D80621"
          />
        </svg>
      );

    case "DE":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Germany Flag" role="img">
          <rect width="20" height="4.67" fill="#000000" />
          <rect y="4.67" width="20" height="4.67" fill="#DD0000" />
          <rect y="9.34" width="20" height="4.67" fill="#FFCE00" />
        </svg>
      );

    case "AU":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Australia Flag" role="img">
          <rect width="20" height="14" fill="#00008B" />
          <g>
            <rect width="10" height="7" fill="#012169" />
            <path d="M0 0 L10 7 M10 0 L0 7" stroke="#FFFFFF" strokeWidth="1.4" />
            <path d="M0 0 L5 3.5 M10 7 L5 3.5 M10 0 L5 3.5 M0 7 L5 3.5" stroke="#C8102E" strokeWidth="0.6" />
            <path d="M5 0 V7 M0 3.5 H10" stroke="#FFFFFF" strokeWidth="2.3" />
            <path d="M5 0 V7 M0 3.5 H10" stroke="#C8102E" strokeWidth="1.4" />
          </g>
          <circle cx="5" cy="10.5" r="1.3" fill="#FFFFFF" />
          <g fill="#FFFFFF">
            <circle cx="15" cy="2.8" r="0.6" />
            <circle cx="17.2" cy="5.4" r="0.6" />
            <circle cx="15" cy="11.2" r="0.6" />
            <circle cx="12.8" cy="6.2" r="0.6" />
            <circle cx="15.8" cy="7.8" r="0.4" />
          </g>
        </svg>
      );

    case "NL":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Netherlands Flag" role="img">
          <rect width="20" height="4.67" fill="#AE1C28" />
          <rect y="4.67" width="20" height="4.67" fill="#FFFFFF" />
          <rect y="9.34" width="20" height="4.67" fill="#21468B" />
        </svg>
      );

    case "SA":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Saudi Arabia Flag" role="img">
          <rect width="20" height="14" fill="#006C35" />
          <path
            d="M4 5 H16 M5 4 C5.6 4 6 4.8 6.6 4.8 C7.2 4.8 7.6 4 8.2 4 C8.8 4 9.2 4.8 9.8 4.8 C10.4 4.8 10.8 4 11.4 4 C12 4 12.4 4.8 13 4.8 C13.6 4.8 14 4.2 14.6 4.2"
            stroke="#FFFFFF"
            strokeWidth="0.85"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M15.5 8.2 H5.8 L5.2 8.6 L5.8 9 H15.5 M5.8 7.8 V9.4 M4.6 8.6 H5.2"
            stroke="#FFFFFF"
            strokeWidth="0.75"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      );

    case "AE":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="UAE Flag" role="img">
          <rect x="5" width="15" height="4.67" fill="#00732F" />
          <rect x="5" y="4.67" width="15" height="4.67" fill="#FFFFFF" />
          <rect x="5" y="9.34" width="15" height="4.67" fill="#000000" />
          <rect width="5" height="14" fill="#FF0000" />
        </svg>
      );

    case "IE":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="Ireland Flag" role="img">
          <rect width="6.67" height="14" fill="#169B62" />
          <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
          <rect x="13.33" width="6.67" height="14" fill="#FF883E" />
        </svg>
      );

    case "FR":
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label="France Flag" role="img">
          <rect width="6.67" height="14" fill="#002395" />
          <rect x="6.67" width="6.67" height="14" fill="#FFFFFF" />
          <rect x="13.33" width="6.67" height="14" fill="#ED2939" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 20 14" className={baseClass} aria-label={`${country || resolved} Flag`} role="img">
          <rect width="20" height="14" fill="#0f2040" />
          <circle cx="10" cy="7" r="4.5" stroke="#4d8ff0" strokeWidth="1" fill="none" />
          <path d="M5.5 7 H14.5 M10 2.5 V11.5" stroke="#4d8ff0" strokeWidth="0.8" />
        </svg>
      );
  }
}
