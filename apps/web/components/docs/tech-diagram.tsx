import { cn } from '@/lib/utils/cn';

interface TechDiagramProps {
  className?: string;
}

export function TechDiagram({ className }: TechDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        Transaction Flow
      </div>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        {/* Sender */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-white/5 border border-border/50 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-foreground/40">Sender</span>
        </div>

        {/* Arrow */}
        <svg className="w-8 h-8 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        {/* ZK Proof */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-16 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-2">
            <span className="text-xs font-mono text-primary">ZK</span>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-foreground/40">Proof</span>
        </div>

        {/* Arrow */}
        <svg className="w-8 h-8 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        {/* Shielded Pool */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-16 rounded-lg bg-success/10 border border-success/30 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-foreground/40">Shielded</span>
        </div>

        {/* Arrow */}
        <svg className="w-8 h-8 text-foreground/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>

        {/* Recipient */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-lg bg-white/5 border border-border/50 flex items-center justify-center mb-2">
            <svg className="w-6 h-6 text-foreground/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <span className="text-[10px] uppercase tracking-wider text-foreground/40">Recipient</span>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-foreground/40">
        No public link between sender and recipient wallets
      </div>
    </div>
  );
}
