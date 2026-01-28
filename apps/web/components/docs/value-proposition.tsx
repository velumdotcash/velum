import { cn } from '@/lib/utils/cn';

interface ValuePropositionProps {
  className?: string;
}

export function ValueProposition({ className }: ValuePropositionProps) {
  return (
    <div className={cn('relative py-12 mb-12', className)}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent rounded-2xl" />

      <div className="relative">
        {/* Tagline */}
        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-primary bg-primary/10 rounded-full border border-primary/20">
            Zero-Knowledge Privacy
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-center font-sentient text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 leading-tight">
          Financial Privacy<br />
          <span className="text-primary">Without Compromise</span>
        </h1>

        {/* Subheadline */}
        <p className="text-center text-foreground/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Send and receive crypto payments on Solana without revealing your wallet address.
          Fast, cheap, and completely private.
        </p>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-mono text-primary mb-1">&lt;1s</div>
            <div className="text-[10px] uppercase tracking-wider text-foreground/40">Confirmation</div>
          </div>
          <div className="text-center border-x border-border/30">
            <div className="text-2xl font-mono text-primary mb-1">$0.01</div>
            <div className="text-[10px] uppercase tracking-wider text-foreground/40">Avg Fee</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono text-primary mb-1">100%</div>
            <div className="text-[10px] uppercase tracking-wider text-foreground/40">Non-Custodial</div>
          </div>
        </div>
      </div>
    </div>
  );
}
