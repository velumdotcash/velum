'use client';

import { cn } from '@/lib/utils/cn';

const steps = [
  {
    title: 'Create',
    description: 'Generate a shielded payment link from your wallet',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 9v6M9 12h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Share',
    description: 'Send the link or QR code — no address exposed',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <circle cx="6" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="18" cy="17" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8.5 11l7-3M8.5 13l7 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Receive',
    description: 'Funds arrive privately in your shielded account',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M12 3v14M7 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5 20h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

interface PaymentFlowDiagramProps {
  className?: string;
}

export function PaymentFlowDiagram({ className }: PaymentFlowDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center font-mono">
        Payment Flow
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-4 md:gap-0">
        {steps.map((step, i) => (
          <div key={step.title} className="contents">
            {/* Step card */}
            <div className="flex flex-col items-center text-center px-4 py-5 rounded-lg border border-primary/20 bg-primary/[0.03]">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                {step.icon}
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-foreground/80 mb-1.5">
                {step.title}
              </div>
              <div className="text-[11px] text-foreground/40 leading-relaxed max-w-[160px]">
                {step.description}
              </div>
            </div>

            {/* Arrow connector (not after last) */}
            {i < steps.length - 1 && (
              <div className="hidden md:flex items-center justify-center px-2">
                <svg viewBox="0 0 24 12" fill="none" className="w-6 h-3 text-primary/40">
                  <path d="M0 6h20M16 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
