import { cn } from '@/lib/utils/cn';
import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group relative p-6 rounded-xl',
        'bg-gradient-to-br from-white/[0.03] to-transparent',
        'border border-border/30 hover:border-primary/30',
        'transition-all duration-300',
        className
      )}
    >
      {/* Icon container */}
      <div className="w-12 h-12 mb-4 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-sm font-mono uppercase tracking-wider text-foreground mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-foreground/60 leading-relaxed">
        {description}
      </p>

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-primary/50" />
      </div>
    </div>
  );
}
