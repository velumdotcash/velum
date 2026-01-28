'use client';

import { cn } from '@/lib/utils/cn';

interface PrivacyFlowDiagramProps {
  className?: string;
}

export function PrivacyFlowDiagram({ className }: PrivacyFlowDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        Privacy-Preserving Paylink Flow
      </div>

      {/* Two zones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Visible Zone */}
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.02] p-4">
          <div className="text-[9px] uppercase tracking-widest text-amber-400/60 mb-4 text-center font-mono">
            Visible On-Chain
          </div>

          {/* Deposit TX */}
          <div className="rounded-md border border-border/30 bg-white/[0.02] p-3 mb-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground/50 mb-2">Deposit TX</div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-foreground/40">from:</span>
                <span className="text-amber-400/70">7xK..sender</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">amount:</span>
                <span className="text-amber-400/70">1.5 SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">to:</span>
                <span className="text-amber-400/70">shielded pool</span>
              </div>
            </div>
          </div>

          {/* Withdraw TX */}
          <div className="rounded-md border border-border/30 bg-white/[0.02] p-3">
            <div className="text-[10px] uppercase tracking-wider text-foreground/50 mb-2">Withdraw TX</div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-foreground/40">from:</span>
                <span className="text-amber-400/70">relayer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">amount:</span>
                <span className="text-amber-400/70">1.4 SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/40">to:</span>
                <span className="text-amber-400/70">Bx9..fresh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden Zone */}
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.02] p-4">
          <div className="text-[9px] uppercase tracking-widest text-emerald-400/60 mb-4 text-center font-mono">
            Hidden (ZK + Encryption)
          </div>

          {/* Connection breaker */}
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.03] px-4 py-2.5 text-center">
              <div className="text-xs text-emerald-400/80 font-mono">Who receives?</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">Identity protected</div>
            </div>

            {/* ZK Proof indicator */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-px bg-emerald-400/20" />
              <div className="w-8 h-8 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center">
                <span className="text-[9px] font-mono text-primary font-bold">ZK</span>
              </div>
              <div className="w-8 h-px bg-emerald-400/20" />
            </div>

            <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.03] px-4 py-2.5 text-center">
              <div className="text-xs text-emerald-400/80 font-mono">Which UTXO spent?</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">Link broken</div>
            </div>

            <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.03] px-4 py-2.5 text-center">
              <div className="text-xs text-emerald-400/80 font-mono">Pool balance?</div>
              <div className="text-[10px] text-foreground/30 mt-0.5">Encrypted</div>
            </div>
          </div>
        </div>
      </div>

      {/* Connection line label */}
      <div className="mt-5 flex items-center justify-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
        <span className="text-[10px] text-foreground/30 font-mono uppercase tracking-wider">
          Link between deposit & withdrawal broken by ZK proof
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border/30 to-transparent" />
      </div>
    </div>
  );
}
