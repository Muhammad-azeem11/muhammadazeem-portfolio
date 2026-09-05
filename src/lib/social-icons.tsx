// src/lib/social-icons.tsx
// Inline SVG social and technology brand icons.

type IconProps = { size?: number; className?: string };

export function LinkedInIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function GitHubIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

export function InstagramIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ── COLORFUL TECHNOLOGY BRAND ICONS ──────────────────────────────────────────

export function N8nIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M2 8.5a3.5 3.5 0 0 1 5.95-2.48L9.5 7.58l1.55-1.56a3.5 3.5 0 1 1 4.95 4.95l-1.55 1.55h2.55a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1-2.47-1.02L12 16.03l-2.47 2.47A3.5 3.5 0 1 1 4.58 13.55l1.55-1.55H3.75A3.5 3.5 0 0 1 2 8.5z"
        fill="#EA4B71"
      />
      <circle cx="5.5" cy="8.5" r="1.3" fill="#ffffff" />
      <circle cx="16" cy="8.5" r="1.3" fill="#ffffff" />
      <circle cx="12" cy="13.5" r="1.3" fill="#ffffff" />
      <circle cx="17" cy="17" r="1.3" fill="#ffffff" />
      <circle cx="7" cy="17" r="1.3" fill="#ffffff" />
    </svg>
  );
}

export function OpenAIIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M22.28 9.87a5.98 5.98 0 0 0-.52-4.9 6.05 6.05 0 0 0-6.62-2.82A6 6 0 0 0 10.7.35a6.07 6.07 0 0 0-5.78 4.16 6.07 6.07 0 0 0-4.14 3 6.01 6.01 0 0 0 .74 7.12 5.98 5.98 0 0 0 .52 4.9 6.05 6.05 0 0 0 6.62 2.82A6 6 0 0 0 13.3 23.65a6.07 6.07 0 0 0 5.78-4.16 6.07 6.07 0 0 0 4.14-3 6.01 6.01 0 0 0-.94-6.62zm-9.03 12.3c-1.22 0-2.38-.4-3.32-1.07l.17-.1 3.86-2.23a.88.88 0 0 0 .44-.76v-5.46l1.64.95a.08.08 0 0 1 .04.07v4.44a4.42 4.42 0 0 1-2.83 4.16zm-7.7-3.42a4.4 4.4 0 0 1-.58-3.03l.17.1 3.86 2.23a.87.87 0 0 0 .88 0l4.73-2.73v1.9a.08.08 0 0 1-.03.07l-3.85 2.22a4.42 4.42 0 0 1-5.18-.76zm-1.8-8.28a4.43 4.43 0 0 1 2.25-2.05v4.63a.88.88 0 0 0 .44.76l4.73 2.73-1.64.95a.08.08 0 0 1-.08 0l-3.85-2.22a4.42 4.42 0 0 1-1.85-4.8zm14.73 2.37l-4.73-2.73 1.64-.95a.08.08 0 0 1 .08 0l3.85 2.22a4.42 4.42 0 0 1 1.85 4.8 4.43 4.43 0 0 1-2.25 2.05v-4.63a.88.88 0 0 0-.44-.76zm2.08-3.76l-.17-.1-3.86-2.23a.87.87 0 0 0-.88 0l-4.73 2.73v-1.9a.08.08 0 0 1 .03-.07l3.85-2.22a4.42 4.42 0 0 1 5.76 3.79zm-7.81 2.6l-2.15-1.24 2.15-1.24 2.15 1.24-2.15 1.24zm-4.3-7.5c1.22 0 2.38.4 3.32 1.07l-.17.1-3.86 2.23a.88.88 0 0 0-.44.76v5.46l-1.64-.95a.08.08 0 0 1-.04-.07V6.04a4.42 4.42 0 0 1 2.83-4.16z"
        fill="#10A37F"
      />
    </svg>
  );
}

export function MakeIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="makeGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
      </defs>
      <path
        d="M4.94 4.5h3.69l3.37 5.83 3.37-5.83h3.69L13.88 13.5l5.18 6H15.37l-3.37-5.83-3.37 5.83H4.94l5.18-6-5.18-6z"
        fill="url(#makeGradientIcon)"
      />
    </svg>
  );
}

export function PythonIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M11.91 0c-1.95 0-3.69.25-4.96.72-2.22.82-2.8 2.06-2.8 3.91v2.87h7.9v1.07H4.11C2.23 8.57.5 9.77.5 12.83c0 2.97 1.48 4.3 3.65 4.3h2.36v-3.08c0-2.3 1.95-4.3 4.3-4.3h6.87V7.5c0-1.89-1.57-3.41-3.45-3.87-1.32-.32-2.32-.38-3.32-.38v.75zm-2.07 2.1c.56 0 1.02.46 1.02 1.02 0 .57-.46 1.03-1.02 1.03s-1.03-.46-1.03-1.03c0-.56.47-1.02 1.03-1.02z"
        fill="#3776AB"
      />
      <path
        d="M12.09 24c1.95 0 3.69-.25 4.96-.72 2.22-.82 2.8-2.06 2.8-3.91v-2.87h-7.9v-1.07h7.94c1.88 0 3.61-1.2 3.61-4.26 0-2.97-1.48-4.3-3.65-4.3h-2.36v3.08c0 2.3-1.95 4.3-4.3 4.3H6.32v2.25c0 1.89 1.57 3.41 3.45 3.87 1.32.32 2.32.38 3.32.38v-.75zm2.07-2.1c-.56 0-1.02-.46-1.02-1.02 0-.57.46-1.03 1.02-1.03s1.03.46 1.03 1.03c0 .56-.47 1.02-1.03 1.02z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function DjangoIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="6" fill="#0C4B33" />
      <path
        d="M13.2 5.5h2.1v8.3c0 2.5-1.2 3.8-3.7 3.8-1 0-1.8-.2-2.3-.4l.4-1.7c.4.2 1 .3 1.6.3 1.3 0 1.9-.6 1.9-1.9V5.5zm-5.6 6c1.1 0 1.9.9 1.9 2.2 0 1.3-.8 2.2-1.9 2.2-1.1 0-1.9-.9-1.9-2.2 0-1.3.8-2.2 1.9-2.2zm1.9-3.8h2.1v9.6H9.5v-1.1c-.5.8-1.3 1.3-2.4 1.3-2 0-3.5-1.6-3.5-3.9 0-2.3 1.5-4 3.5-4 1 0 1.9.5 2.4 1.3V7.7z"
        fill="#ffffff"
      />
    </svg>
  );
}

export function PostgreSQLIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="6" fill="#336791" />
      <path
        d="M17.5 13.2c-.3-.2-.8-.4-1.3-.4-.8 0-1.5.4-1.9 1-.4-.6-1.1-1-1.9-1-.5 0-1 .2-1.3.4-.3-.4-.8-.7-1.4-.7-.9 0-1.6.7-1.6 1.6v3.2c0 .9.7 1.6 1.6 1.6.5 0 1-.2 1.3-.6.3.2.7.4 1.2.4.8 0 1.5-.4 1.9-1 .4.6 1.1 1 1.9 1 .5 0 .9-.2 1.2-.4.3.4.8.6 1.3.6.9 0 1.6-.7 1.6-1.6v-3.2c0-.9-.7-1.6-1.6-1.6-.5 0-1 .2-1.3.5z"
        fill="#ffffff"
        opacity="0.9"
      />
      <path
        d="M8.2 6.5C7 7.5 6 9.5 6 12c0 2.5 1 4.5 2.2 5.5.3-.5.8-.8 1.4-.8h.8V7.3h-.8c-.6 0-1.1-.3-1.4-.8z"
        fill="#82B1FF"
      />
      <circle cx="12" cy="9.5" r="2.5" fill="#ffffff" />
    </svg>
  );
}

export function NodeJSIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12 1.5l9.5 5.5v10L12 22.5 2.5 17V7L12 1.5z"
        fill="#339933"
      />
      <path
        d="M12 3.8l7.5 4.3v8.8L12 21.2 4.5 16.9V8.1L12 3.8z"
        fill="#539E43"
      />
      <path
        d="M12 7.2l4.8 2.8v5.5L12 18.3l-4.8-2.8v-5.5L12 7.2z"
        fill="#ffffff"
        opacity="0.95"
      />
      <path
        d="M12 9.5l2.8 1.6v3.2L12 15.9l-2.8-1.6v-3.2L12 9.5z"
        fill="#339933"
      />
    </svg>
  );
}

export function NextJSIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="11" fill="#090D16" stroke="#2563EB" strokeWidth="1.2" />
      <path
        d="M16.5 7.5v9M7.5 7.5v9l8.65-9"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 13.2l-3.8 3.3"
        stroke="#38BDF8"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function RestApiIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="restApiGrad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#0284C7" />
          <stop offset="1" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="3.5" fill="url(#restApiGrad)" />
      <circle cx="4.5" cy="7.5" r="2.5" fill="#0EA5E9" />
      <circle cx="4.5" cy="16.5" r="2.5" fill="#0EA5E9" />
      <circle cx="19.5" cy="7.5" r="2.5" fill="#2563EB" />
      <circle cx="19.5" cy="16.5" r="2.5" fill="#2563EB" />
      <path d="M6.8 8.6L9 10.2M6.8 15.4L9 13.8M17.2 8.6L15 10.2M17.2 15.4L15 13.8" stroke="#0284C7" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function GmailOAuthIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M2.5 6.5C2.5 5.4 3.4 4.5 4.5 4.5h2.25v6.75L2.5 8.25V6.5z" fill="#4285F4" />
      <path d="M21.5 6.5C21.5 5.4 20.6 4.5 19.5 4.5h-2.25v6.75l4.25-3V6.5z" fill="#34A853" />
      <path d="M17.25 4.5L12 8.5 6.75 4.5H4.5l7.5 5.5 7.5-5.5h-2.25z" fill="#EA4335" />
      <path d="M2.5 8.25V18.5c0 1.1.9 2 2 2h2.25v-9.25L2.5 8.25z" fill="#4285F4" />
      <path d="M21.5 8.25V18.5c0 1.1-.9 2-2 2h-2.25v-9.25l4.25-3z" fill="#34A853" />
      <path d="M6.75 11.25V20.5h10.5V11.25L12 14.5l-5.25-3.25z" fill="#FBBC04" opacity="0.95" />
      <path d="M6.75 4.5v6.75L12 14.5l5.25-3.25V4.5L12 8.5 6.75 4.5z" fill="#EA4335" />
    </svg>
  );
}

export function WebhooksIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="hookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>
      <circle cx="6" cy="6" r="3.2" fill="#F59E0B" />
      <circle cx="18" cy="6" r="3.2" fill="#EA580C" />
      <circle cx="12" cy="18" r="3.2" fill="url(#hookGradient)" />
      <path
        d="M6 9.5v2a2.5 2.5 0 0 0 2.5 2.5h7a2.5 2.5 0 0 0 2.5-2.5v-2"
        stroke="url(#hookGradient)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7l1.5 3h-3L12 7z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function DockerIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="5.5" y="7.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="8" y="7.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="10.5" y="7.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="8" y="5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="10.5" y="5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="13" y="7.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="13" y="5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <rect x="15.5" y="7.5" width="2" height="2" rx="0.3" fill="#2496ED" />
      <path
        d="M22.5 10.5c-.35-.25-.9-.35-1.5-.2-.2-.55-.65-1-1.2-1.25l-.4-.2-.25.4c-.3.5-.45 1.1-.4 1.7-.6.35-1.55.55-2.65.55H2.5c-.3 1.25.1 2.65 1.15 3.75 1.35 1.45 3.3 2.25 5.5 2.25 4.3 0 7.8-2.65 8.95-6.5.65.05 1.35-.1 1.95-.5.8-.55 1.45-1.4 1.75-2.2l.2-.55-.5-.25z"
        fill="#2496ED"
      />
      <circle cx="5" cy="13.5" r="0.6" fill="#ffffff" />
    </svg>
  );
}

export function TwilioIcon({ size = 24, className }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <circle cx="12" cy="12" r="10.5" fill="#F22F46" />
      <circle cx="8.5" cy="8.5" r="2" fill="#ffffff" />
      <circle cx="15.5" cy="8.5" r="2" fill="#ffffff" />
      <circle cx="8.5" cy="15.5" r="2" fill="#ffffff" />
      <circle cx="15.5" cy="15.5" r="2" fill="#ffffff" />
    </svg>
  );
}

