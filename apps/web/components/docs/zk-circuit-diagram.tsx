'use client';

import { cn } from '@/lib/utils/cn';

interface ZKCircuitDiagramProps {
  className?: string;
}

export function ZKCircuitDiagram({ className }: ZKCircuitDiagramProps) {
  return (
    <div className={cn('my-10 p-6 bg-[#0a0a0a] rounded-xl border border-border/30', className)}>
      <div className="text-[10px] uppercase tracking-wider text-foreground/40 mb-6 text-center">
        ZK Circuit: transaction2 (Groth16)
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Public Inputs */}
        <div className="rounded-lg border border-amber-400/20 bg-amber-400/[0.02] p-4">
          <div className="text-[9px] uppercase tracking-widest text-amber-400/60 mb-3 font-mono">
            Public Inputs (On-Chain)
          </div>
          <div className="space-y-1.5">
            <InputRow label="root" desc="Current Merkle root" />
            <InputRow label="publicAmount" desc="Net deposit/withdraw" />
            <InputRow label="extDataHash" desc="External data commitment" />
            <InputRow label="inputNullifier[2]" desc="Anti-double-spend" />
            <InputRow label="outputCommitment[2]" desc="New UTXO hashes" />
          </div>
        </div>

        {/* Private Inputs */}
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.02] p-4">
          <div className="text-[9px] uppercase tracking-widest text-emerald-400/60 mb-3 font-mono">
            Private Inputs (Never Revealed)
          </div>
          <div className="space-y-1.5">
            <InputRow label="inAmount[2]" desc="Input UTXO amounts" variant="private" />
            <InputRow label="inBlinding[2]" desc="Input blinding factors" variant="private" />
            <InputRow label="inPrivateKey[2]" desc="Owner private keys" variant="private" />
            <InputRow label="inPathElements[2][26]" desc="Merkle proof paths" variant="private" />
            <InputRow label="outAmount[2]" desc="Output UTXO amounts" variant="private" />
            <InputRow label="outBlinding[2]" desc="Output blinding factors" variant="private" />
            <InputRow label="outPubkey[2]" desc="Output owner pubkeys" variant="private" />
          </div>
        </div>
      </div>

      {/* Constraints */}
      <div className="border-t border-border/20 pt-4">
        <div className="text-[9px] uppercase tracking-widest text-foreground/40 mb-3 font-mono text-center">
          Verified Constraints
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Constraint
            number={1}
            title="Ownership"
            formula="nullifier == Poseidon(commitment, index, Sign(...))"
            desc="Proves knowledge of private key"
          />
          <Constraint
            number={2}
            title="Existence"
            formula="MerklePath(commitment, path) == root"
            desc="UTXO exists in the tree"
          />
          <Constraint
            number={3}
            title="Balance"
            formula="sum(inAmount) + publicAmount == sum(outAmount)"
            desc="No funds created from nothing"
          />
          <Constraint
            number={4}
            title="Commitment Validity"
            formula="outCommitment == Poseidon(amt, pub, blind, mint)"
            desc="New UTXOs are well-formed"
          />
        </div>
      </div>
    </div>
  );
}

function InputRow({ label, desc, variant = 'public' }: {
  label: string;
  desc: string;
  variant?: 'public' | 'private';
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className={cn(
        'text-[11px] font-mono',
        variant === 'public' ? 'text-amber-400/70' : 'text-emerald-400/70'
      )}>
        {label}
      </span>
      <span className="text-[9px] text-foreground/30 text-right">{desc}</span>
    </div>
  );
}

function Constraint({ number, title, formula, desc }: {
  number: number;
  title: string;
  formula: string;
  desc: string;
}) {
  return (
    <div className="rounded-md border border-border/20 bg-white/[0.02] p-3">
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-4 h-4 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-[9px] font-mono text-primary font-bold">
          {number}
        </span>
        <span className="text-[11px] text-foreground/70 font-mono">{title}</span>
      </div>
      <div className="text-[9px] font-mono text-foreground/40 mb-1 break-all">{formula}</div>
      <div className="text-[9px] text-foreground/30">{desc}</div>
    </div>
  );
}
