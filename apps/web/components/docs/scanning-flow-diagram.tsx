'use client';

import { cn } from '@/lib/utils/cn';

interface ScanningFlowDiagramProps {
  className?: string;
}

export function ScanningFlowDiagram({ className }: ScanningFlowDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        UTXO Scanning with Early Termination
      </div>

      <div className="flex flex-col items-center gap-0">
        {/* Start: Encrypted output */}
        <div className="rounded-md border border-border/30 bg-white/[0.03] px-5 py-2.5 text-center">
          <div className="text-xs font-mono text-foreground/70">Encrypted Output</div>
          <div className="text-[10px] text-foreground/30 mt-0.5 font-mono">
            [version][schema][recipientIdHash][payload...]
          </div>
        </div>

        <div className="w-px h-4 bg-border/30" />

        {/* Hash check */}
        <div className="rounded-md border border-sky-400/30 bg-sky-400/[0.04] px-5 py-2.5 text-center">
          <div className="text-xs font-mono text-sky-400/80">Compare recipientIdHash</div>
          <div className="text-[10px] text-foreground/30 mt-0.5">
            SHA256(myPubKey)[0:8] vs stored[9:17]
          </div>
        </div>

        <div className="w-px h-3 bg-border/30" />

        {/* Decision */}
        <div className="flex items-start gap-8 w-full max-w-md justify-center">
          {/* No match branch */}
          <div className="flex flex-col items-center">
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider mb-2">No Match</div>
            <div className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.03] px-4 py-2 text-center">
              <div className="text-[11px] font-mono text-emerald-400/80">SKIP</div>
              <div className="text-[9px] text-foreground/30 mt-0.5">O(1) — 8-byte compare</div>
            </div>
            <div className="mt-2 text-[9px] text-foreground/20 font-mono">~99.99% of outputs</div>
          </div>

          {/* Match branch */}
          <div className="flex flex-col items-center">
            <div className="text-[9px] text-foreground/30 uppercase tracking-wider mb-2">Match</div>
            <div className="rounded-md border border-amber-400/20 bg-amber-400/[0.03] px-4 py-2 text-center">
              <div className="text-[11px] font-mono text-amber-400/80">Attempt Decrypt</div>
              <div className="text-[9px] text-foreground/30 mt-0.5">Expensive crypto op</div>
            </div>

            <div className="w-px h-3 bg-border/30" />

            {/* Decrypt result */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="rounded-md border border-primary/20 bg-primary/[0.03] px-3 py-1.5 text-center">
                  <div className="text-[10px] font-mono text-primary/80">Success</div>
                </div>
                <div className="text-[9px] text-foreground/20 mt-1">Found UTXO</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-md border border-border/20 bg-white/[0.02] px-3 py-1.5 text-center">
                  <div className="text-[10px] font-mono text-foreground/40">Failure</div>
                </div>
                <div className="text-[9px] text-foreground/20 mt-1">False pos. (1/2^64)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance comparison */}
      <div className="mt-8 pt-4 border-t border-border/20 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-md border border-border/20 bg-white/[0.02] p-3">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 mb-1.5">Without Early Termination</div>
          <div className="font-mono text-[11px] text-foreground/60">
            50,000 UTXOs x decrypt = <span className="text-amber-400/80">~30s</span>
          </div>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/[0.02] p-3">
          <div className="text-[9px] uppercase tracking-wider text-foreground/30 mb-1.5">With Early Termination</div>
          <div className="font-mono text-[11px] text-foreground/60">
            50,000 x compare + 5 x decrypt = <span className="text-primary/90">~0.5s</span>
          </div>
        </div>
      </div>
    </div>
  );
}
