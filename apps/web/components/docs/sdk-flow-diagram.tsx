'use client';

import { cn } from '@/lib/utils/cn';

interface SDKFlowDiagramProps {
  className?: string;
}

const steps = [
  {
    phase: 'Recipient',
    color: 'primary' as const,
    items: [
      { label: 'Connect wallet', detail: 'Wallet-Adapter Constructor (#1)' },
      { label: 'Derive keys', detail: 'Key Retrieval (#5)' },
      { label: 'Share public keys', detail: 'BN254 + X25519 pubkeys' },
    ],
  },
  {
    phase: 'Sender',
    color: 'amber' as const,
    items: [
      { label: 'Fetch recipient keys', detail: 'From paylink API' },
      { label: 'Create UTXO', detail: 'Pubkey-Only Mode (#3)' },
      { label: 'Encrypt note', detail: 'Asymmetric V3 (#2)' },
      { label: 'Deposit', detail: 'Third-Party Deposit (#4)' },
    ],
  },
  {
    phase: 'Recipient (scan)',
    color: 'emerald' as const,
    items: [
      { label: 'Check recipientIdHash', detail: 'Early Termination (#6)' },
      { label: 'Decrypt V3 note', detail: 'Asymmetric Decryption (#2)' },
      { label: 'Withdraw to fresh addr', detail: 'Standard SDK withdraw' },
    ],
  },
];

const colorMap = {
  primary: {
    border: 'border-primary/30',
    bg: 'bg-primary/[0.03]',
    text: 'text-primary/80',
    dot: 'bg-primary/60',
    line: 'bg-primary/20',
  },
  amber: {
    border: 'border-amber-400/30',
    bg: 'bg-amber-400/[0.03]',
    text: 'text-amber-400/80',
    dot: 'bg-amber-400/60',
    line: 'bg-amber-400/20',
  },
  emerald: {
    border: 'border-emerald-400/30',
    bg: 'bg-emerald-400/[0.03]',
    text: 'text-emerald-400/80',
    dot: 'bg-emerald-400/60',
    line: 'bg-emerald-400/20',
  },
};

export function SDKFlowDiagram({ className }: SDKFlowDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        How SDK Modifications Enable the Paylink Flow
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((phase, pi) => {
          const colors = colorMap[phase.color];
          return (
            <div key={pi} className={cn('rounded-lg border p-4', colors.border, colors.bg)}>
              <div className={cn('text-[9px] uppercase tracking-widest mb-4 font-mono', colors.text)}>
                {phase.phase}
              </div>
              <div className="space-y-3">
                {phase.items.map((item, ii) => (
                  <div key={ii} className="flex gap-2.5">
                    <div className="flex flex-col items-center pt-1.5">
                      <div className={cn('w-1.5 h-1.5 rounded-full', colors.dot)} />
                      {ii < phase.items.length - 1 && (
                        <div className={cn('w-px flex-1 mt-1', colors.line)} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] text-foreground/70 font-mono">{item.label}</div>
                      <div className="text-[9px] text-foreground/30 mt-0.5">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modifications legend */}
      <div className="mt-5 pt-4 border-t border-border/20">
        <div className="text-[9px] text-foreground/30 text-center font-mono">
          Numbers (#N) reference SDK modification numbers from the fork
        </div>
      </div>
    </div>
  );
}
