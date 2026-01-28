'use client';

import { cn } from '@/lib/utils/cn';

interface KeyDerivationDiagramProps {
  className?: string;
}

export function KeyDerivationDiagram({ className }: KeyDerivationDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30 overflow-x-auto', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        Key Derivation Hierarchy
      </div>

      <div className="min-w-[500px] flex flex-col items-center gap-0">
        {/* Root: Wallet */}
        <Node label="Wallet (Ed25519)" sublabel="signMessage()" variant="root" />
        <VerticalLine />

        {/* Signature */}
        <Node label="Signature" sublabel="64 bytes" variant="intermediate" />
        <VerticalLine />

        {/* Branch point */}
        <div className="flex items-start gap-0 w-full max-w-lg">
          {/* V1 branch */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="w-1/2 border-t border-r border-border/30 h-4" />
            </div>
            <Node label="V1 Key" sublabel="sig[0:31]" variant="key" size="sm" />
            <VerticalLine short />
            <Node label="UTXO Key V1" sublabel="SHA256 → BN254" variant="leaf" size="sm" />
          </div>

          {/* V2 branch */}
          <div className="flex-1 flex flex-col items-center">
            <div className="w-full flex justify-center">
              <div className="w-1/2 border-t border-l border-border/30 h-4" />
            </div>
            <Node label="V2 Key" sublabel="Keccak256(sig)" variant="key" size="sm" />
            <VerticalLine short />

            {/* V2 sub-branches */}
            <div className="flex items-start gap-0 w-full">
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <div className="w-1/2 border-t border-r border-border/30 h-3" />
                </div>
                <Node label="UTXO Key V2" sublabel="Keccak → BN254" variant="leaf" size="xs" />
                <div className="mt-1.5 text-[9px] text-foreground/30 font-mono text-center">
                  Poseidon → pubkey
                </div>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full flex justify-center">
                  <div className="w-1/2 border-t border-l border-border/30 h-3" />
                </div>
                <Node label="Asymmetric Key" sublabel="SHA256 → X25519" variant="accent" size="xs" />
                <div className="mt-1.5 text-[9px] text-foreground/30 font-mono text-center">
                  .publicKey / .secretKey
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 pt-4 border-t border-border/20 flex flex-wrap gap-5 justify-center">
        <LegendItem color="bg-foreground/60" label="Ownership (BN254)" />
        <LegendItem color="bg-primary" label="Encryption (X25519)" />
      </div>
    </div>
  );
}

function Node({ label, sublabel, variant, size = 'md' }: {
  label: string;
  sublabel: string;
  variant: 'root' | 'intermediate' | 'key' | 'leaf' | 'accent';
  size?: 'xs' | 'sm' | 'md';
}) {
  const variants = {
    root: 'border-foreground/30 bg-white/[0.04]',
    intermediate: 'border-border/30 bg-white/[0.02]',
    key: 'border-sky-400/30 bg-sky-400/[0.04]',
    leaf: 'border-foreground/20 bg-white/[0.02]',
    accent: 'border-primary/30 bg-primary/[0.04]',
  };

  const sizes = {
    xs: 'px-2.5 py-1.5',
    sm: 'px-3 py-2',
    md: 'px-4 py-2.5',
  };

  const textSizes = {
    xs: 'text-[10px]',
    sm: 'text-[11px]',
    md: 'text-xs',
  };

  return (
    <div className={cn('rounded-md border text-center', variants[variant], sizes[size])}>
      <div className={cn('font-mono text-foreground/80', textSizes[size])}>{label}</div>
      <div className={cn('text-foreground/40 mt-0.5', size === 'xs' ? 'text-[8px]' : 'text-[9px]')}>{sublabel}</div>
    </div>
  );
}

function VerticalLine({ short }: { short?: boolean }) {
  return (
    <div className={cn('w-px bg-border/30', short ? 'h-3' : 'h-5')} />
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={cn('w-2 h-2 rounded-full', color)} />
      <span className="text-[10px] text-foreground/40 font-mono">{label}</span>
    </div>
  );
}
