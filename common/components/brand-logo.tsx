/** Warung Analytics brand mark - a shopping bag + mini bar chart (store + analytics). */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="Warung Analytics">
      <defs>
        <linearGradient id="wa-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6366f1" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#wa-logo-grad)" />
      {/* bag handle */}
      <path d="M14 15a6 6 0 0 1 12 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      {/* bag body */}
      <rect x="11" y="15" width="18" height="15" rx="3.5" fill="#fff" />
      {/* mini bars */}
      <rect x="15" y="23" width="2.6" height="4" rx="1" fill="#4f46e5" />
      <rect x="18.7" y="20" width="2.6" height="7" rx="1" fill="#4f46e5" />
      <rect x="22.4" y="22" width="2.6" height="5" rx="1" fill="#6366f1" />
    </svg>
  );
}
