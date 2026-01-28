'use client';

import { cn } from '@/lib/utils/cn';
import { useState } from 'react';

interface Issue {
  title: string;
  solution: string;
}

const issues: Issue[] = [
  {
    title: 'Insufficient Balance',
    solution: 'Ensure you have enough of the requested token plus SOL for fees.',
  },
  {
    title: 'Transaction Failed',
    solution: 'Retry with a higher priority fee. Network congestion can cause temporary failures.',
  },
  {
    title: 'Wallet Not Connected',
    solution: 'Refresh the page and reconnect your wallet. Verify you are on the correct network.',
  },
];

interface TroubleshootingCardsProps {
  className?: string;
}

export function TroubleshootingCards({ className }: TroubleshootingCardsProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={cn('my-8 space-y-2', className)}>
      {issues.map((issue, i) => {
        const isOpen = open === i;
        return (
          <button
            key={issue.title}
            onClick={() => setOpen(isOpen ? null : i)}
            className={cn(
              'w-full text-left p-4 rounded-xl border transition-all duration-200',
              isOpen
                ? 'border-primary/30 bg-primary/[0.03]'
                : 'border-border/30 bg-[#0a0a0a] hover:border-border/50'
            )}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-foreground/70">{issue.title}</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                className={cn(
                  'w-3.5 h-3.5 text-foreground/30 transition-transform duration-200',
                  isOpen && 'rotate-180'
                )}
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {isOpen && (
              <div className="mt-3 pt-3 border-t border-border/20 text-[11px] text-foreground/50 leading-relaxed">
                {issue.solution}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
