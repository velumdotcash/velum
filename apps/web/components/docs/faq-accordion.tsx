'use client';

import { useState, ReactNode, useId } from 'react';
import { cn } from '@/lib/utils/cn';

interface FAQItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function FAQItem({ question, children, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = useId();

  return (
    <div className="border-b border-border/30 last:border-b-0">
      <button
        id={`faq-trigger-${id}`}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${id}`}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className="text-sm font-mono uppercase tracking-wider text-foreground group-hover:text-primary transition-colors">
          {question}
        </span>
        <svg
          className={cn(
            'w-4 h-4 text-foreground/40 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={`faq-content-${id}`}
        role="region"
        aria-labelledby={`faq-trigger-${id}`}
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'
        )}
      >
        <div className="text-sm text-foreground/60 leading-relaxed pl-0">
          {children}
        </div>
      </div>
    </div>
  );
}

interface FAQSectionProps {
  title: string;
  children: ReactNode;
}

export function FAQSection({ title, children }: FAQSectionProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 bg-primary rounded-full" />
        <h2 className="text-xs font-mono uppercase tracking-[0.2em] text-foreground/70">
          {title}
        </h2>
      </div>
      <div className="bg-white/[0.02] rounded-xl border border-border/20 px-6">
        {children}
      </div>
    </div>
  );
}
