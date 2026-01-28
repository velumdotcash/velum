'use client';

import { cn } from '@/lib/utils/cn';

interface TokenCardProps {
  symbol: string;
  name: string;
  type: string;
  decimals: number | string;
  color: string;
  icon: React.ReactNode;
}

const tokens: TokenCardProps[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    type: 'Native',
    decimals: 9,
    color: 'from-violet-500/20 to-violet-500/5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M5.26 16.46a.6.6 0 0 1 .42-.17h14.94a.3.3 0 0 1 .21.51l-3.1 3.03a.6.6 0 0 1-.42.17H2.37a.3.3 0 0 1-.21-.51l3.1-3.03Z" fill="currentColor" />
        <path d="M5.26 4.17A.61.61 0 0 1 5.68 4h14.94a.3.3 0 0 1 .21.51l-3.1 3.03a.6.6 0 0 1-.42.17H2.37a.3.3 0 0 1-.21-.51l3.1-3.03Z" fill="currentColor" />
        <path d="M18.73 10.27a.6.6 0 0 0-.42-.17H3.37a.3.3 0 0 0-.21.51l3.1 3.03a.6.6 0 0 0 .42.17h14.94a.3.3 0 0 0 .21-.51l-3.1-3.03Z" fill="currentColor" />
      </svg>
    ),
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    type: 'Stablecoin',
    decimals: 6,
    color: 'from-blue-500/20 to-blue-500/5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14.5 9.5c0-1.1-.9-2-2.5-2s-2.5.9-2.5 2 .9 2 2.5 2 2.5.9 2.5 2-.9 2-2.5 2-2.5-.9-2.5-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 6v1.5M12 16.5V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    type: 'Stablecoin',
    decimals: 6,
    color: 'from-emerald-500/20 to-emerald-500/5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 4v4M8 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 12c3.3 0 6-.7 6-1.5S15.3 9 12 9s-6 .7-6 1.5S8.7 12 12 12Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 12v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    symbol: 'ANY',
    name: 'Flexible',
    type: 'Sender picks',
    decimals: '--',
    color: 'from-primary/20 to-primary/5',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
      </svg>
    ),
  },
];

interface TokenCardsProps {
  className?: string;
}

export function TokenCards({ className }: TokenCardsProps) {
  return (
    <div className={cn('my-8', className)}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {tokens.map((token) => (
          <div
            key={token.symbol}
            className={cn(
              'group relative p-4 rounded-xl',
              'bg-gradient-to-br',
              token.color,
              'border border-border/30 hover:border-border/60',
              'transition-all duration-200'
            )}
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-foreground/[0.06] flex items-center justify-center text-foreground/70 mb-3 group-hover:text-foreground/90 transition-colors">
              {token.icon}
            </div>

            {/* Symbol */}
            <div className="text-sm font-mono font-medium text-foreground/90 mb-0.5">
              {token.symbol}
            </div>

            {/* Name */}
            <div className="text-[10px] text-foreground/40 mb-2">
              {token.name}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-2 mt-auto">
              <span className="text-[9px] uppercase tracking-wider text-foreground/30 font-mono">
                {token.type}
              </span>
              <span className="text-[9px] text-foreground/20">|</span>
              <span className="text-[9px] text-foreground/30 font-mono">
                {token.decimals}d
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
