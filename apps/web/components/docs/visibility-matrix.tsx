'use client';

import { cn } from '@/lib/utils/cn';

interface VisibilityMatrixProps {
  className?: string;
}

const data = [
  { item: 'Wallet Address', sender: 'own', observer: 'visible', recipient: 'never' },
  { item: 'Deposit Amount', sender: 'knows', observer: 'visible', recipient: 'decrypts' },
  { item: 'Withdraw Amount', sender: '—', observer: 'visible', recipient: 'knows' },
  { item: 'Sender ↔ Recipient Link', sender: 'knows', observer: 'hidden', recipient: 'knows' },
  { item: 'Recipient Wallet', sender: 'hidden', observer: 'hidden', recipient: 'own' },
  { item: 'Shielded Balance', sender: '—', observer: 'hidden', recipient: 'decrypts' },
];

const cellStyle = (value: string) => {
  switch (value) {
    case 'visible':
      return 'text-amber-400/90 bg-amber-400/5';
    case 'hidden':
    case 'never':
      return 'text-emerald-400/90 bg-emerald-400/5';
    case 'knows':
    case 'own':
    case 'decrypts':
      return 'text-sky-400/80 bg-sky-400/5';
    default:
      return 'text-foreground/30';
  }
};

const cellLabel = (value: string) => {
  switch (value) {
    case 'own': return 'Own';
    case 'visible': return 'Visible';
    case 'hidden': return 'Hidden';
    case 'never': return 'Never';
    case 'knows': return 'Knows';
    case 'decrypts': return 'Decrypts';
    default: return '—';
  }
};

export function VisibilityMatrix({ className }: VisibilityMatrixProps) {
  return (
    <div className={cn('my-10 overflow-hidden rounded-xl border border-border/30 bg-[#0a0a0a]', className)}>
      <div className="px-5 py-3 border-b border-border/20">
        <span className="text-[10px] uppercase tracking-wider text-foreground/40">
          Privacy Visibility Matrix
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/20">
              <th className="px-5 py-3 text-left text-[10px] uppercase tracking-wider text-foreground/40 font-normal">
                Data
              </th>
              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-foreground/40 font-normal">
                Sender
              </th>
              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-foreground/40 font-normal">
                Observer
              </th>
              <th className="px-4 py-3 text-center text-[10px] uppercase tracking-wider text-foreground/40 font-normal">
                Recipient
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border/10 last:border-0">
                <td className="px-5 py-3 text-foreground/70 font-mono text-xs whitespace-nowrap">
                  {row.item}
                </td>
                <td className={cn('px-4 py-3 text-center text-xs font-mono', cellStyle(row.sender))}>
                  <span className="inline-block px-2 py-0.5 rounded">
                    {cellLabel(row.sender)}
                  </span>
                </td>
                <td className={cn('px-4 py-3 text-center text-xs font-mono', cellStyle(row.observer))}>
                  <span className="inline-block px-2 py-0.5 rounded">
                    {cellLabel(row.observer)}
                  </span>
                </td>
                <td className={cn('px-4 py-3 text-center text-xs font-mono', cellStyle(row.recipient))}>
                  <span className="inline-block px-2 py-0.5 rounded">
                    {cellLabel(row.recipient)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-border/20 flex gap-4 flex-wrap">
        <span className="flex items-center gap-1.5 text-[10px] text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-emerald-400/60" /> Hidden (ZK protected)
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-amber-400/60" /> Visible on-chain
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-foreground/40">
          <span className="w-2 h-2 rounded-full bg-sky-400/60" /> Known to party
        </span>
      </div>
    </div>
  );
}
