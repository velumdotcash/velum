'use client';

import { cn } from '@/lib/utils/cn';

const hiddenItems = [
  'Sender wallet address',
  'Recipient wallet address',
  'Transaction amounts',
  'Transaction history',
  'Payment link memos',
];

const publicItems = [
  'Total pool value (aggregate)',
  'Network fees',
  'Transaction timestamps',
];

interface PrivacyShieldProps {
  className?: string;
}

export function PrivacyShield({ className }: PrivacyShieldProps) {
  return (
    <div className={cn('my-8 grid grid-cols-1 md:grid-cols-2 gap-3', className)}>
      {/* Hidden zone */}
      <div className="p-5 rounded-xl border border-emerald-400/30 bg-emerald-400/[0.03]">
        <div className="flex items-center gap-2 mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-emerald-400">
            <path d="M12 2L3 7v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider text-emerald-400/80 font-mono">
            Hidden
          </span>
        </div>

        <div className="space-y-2.5">
          {hiddenItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              <span className="text-[11px] text-foreground/60 font-mono">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Public zone */}
      <div className="p-5 rounded-xl border border-amber-400/30 bg-amber-400/[0.03]">
        <div className="flex items-center gap-2 mb-4">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-amber-400">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span className="text-[10px] uppercase tracking-wider text-amber-400/80 font-mono">
            Public
          </span>
        </div>

        <div className="space-y-2.5">
          {publicItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400/60" />
              <span className="text-[11px] text-foreground/60 font-mono">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
