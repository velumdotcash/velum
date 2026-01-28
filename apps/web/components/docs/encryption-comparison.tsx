'use client';

import { cn } from '@/lib/utils/cn';

interface EncryptionComparisonProps {
  className?: string;
}

const schemes = [
  {
    version: 'V1',
    label: 'Legacy',
    algorithm: 'AES-128-CTR + HMAC',
    type: 'Symmetric',
    keySource: 'sig[0:31] (31 bytes)',
    authEncryption: false,
    forwardSecrecy: false,
    useCase: 'Legacy deposits',
    status: 'deprecated' as const,
  },
  {
    version: 'V2',
    label: 'Current Symmetric',
    algorithm: 'AES-256-GCM',
    type: 'Symmetric',
    keySource: 'Keccak256(sig) (32 bytes)',
    authEncryption: true,
    forwardSecrecy: false,
    useCase: 'Self-deposits',
    status: 'active' as const,
  },
  {
    version: 'V3',
    label: 'Asymmetric',
    algorithm: 'NaCl Box (X25519 + XSalsa20-Poly1305)',
    type: 'Asymmetric',
    keySource: 'X25519 keypair (32+32 bytes)',
    authEncryption: true,
    forwardSecrecy: true,
    useCase: 'Paylink deposits',
    status: 'active' as const,
  },
];

export function EncryptionComparison({ className }: EncryptionComparisonProps) {
  return (
    <div className={cn('my-10 grid grid-cols-1 md:grid-cols-3 gap-3', className)}>
      {schemes.map((scheme) => (
        <div
          key={scheme.version}
          className={cn(
            'rounded-xl border p-4 relative overflow-hidden',
            scheme.version === 'V3'
              ? 'border-primary/30 bg-primary/[0.02]'
              : scheme.status === 'deprecated'
                ? 'border-border/20 bg-white/[0.01] opacity-60'
                : 'border-border/30 bg-[#0a0a0a]'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className={cn(
                'text-sm font-mono font-bold',
                scheme.version === 'V3' ? 'text-primary' : 'text-foreground/70'
              )}>
                {scheme.version}
              </span>
              <span className="text-[10px] text-foreground/40">{scheme.label}</span>
            </div>
            {scheme.status === 'deprecated' && (
              <span className="text-[9px] uppercase tracking-wider text-amber-400/60 border border-amber-400/20 px-1.5 py-0.5 rounded">
                Legacy
              </span>
            )}
            {scheme.version === 'V3' && (
              <span className="text-[9px] uppercase tracking-wider text-primary/80 border border-primary/30 px-1.5 py-0.5 rounded">
                Paylink
              </span>
            )}
          </div>

          {/* Properties */}
          <div className="space-y-2.5">
            <Property label="Type" value={scheme.type} />
            <Property label="Algorithm" value={scheme.algorithm} mono />
            <Property label="Key" value={scheme.keySource} mono />
            <Property label="Use Case" value={scheme.useCase} />

            {/* Boolean flags */}
            <div className="flex gap-3 pt-1">
              <BooleanBadge label="Auth Enc" value={scheme.authEncryption} />
              <BooleanBadge label="Fwd Sec" value={scheme.forwardSecrecy} />
            </div>
          </div>

          {/* Actors */}
          <div className="mt-3 pt-3 border-t border-border/20">
            <div className="flex justify-between text-[10px]">
              <span className="text-foreground/40">Encrypts:</span>
              <span className="text-foreground/60 font-mono">
                {scheme.type === 'Symmetric' ? 'Depositor' : 'Sender'}
              </span>
            </div>
            <div className="flex justify-between text-[10px] mt-1">
              <span className="text-foreground/40">Decrypts:</span>
              <span className="text-foreground/60 font-mono">
                {scheme.type === 'Symmetric' ? 'Depositor' : 'Recipient'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Property({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-wider text-foreground/30 mb-0.5">{label}</div>
      <div className={cn('text-[11px] text-foreground/70', mono && 'font-mono')}>{value}</div>
    </div>
  );
}

function BooleanBadge({ label, value }: { label: string; value: boolean }) {
  return (
    <span className={cn(
      'text-[9px] font-mono px-2 py-0.5 rounded',
      value
        ? 'text-emerald-400/80 bg-emerald-400/[0.06]'
        : 'text-foreground/30 bg-white/[0.02]'
    )}>
      {label}: {value ? 'Yes' : 'No'}
    </span>
  );
}
