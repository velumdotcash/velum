'use client';

import { useState, useMemo, type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import plaintext from 'highlight.js/lib/languages/plaintext';
import 'highlight.js/styles/github-dark.min.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('bash', bash);
hljs.registerLanguage('plaintext', plaintext);

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

// Normalize children from MDX to a string
function normalizeChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(normalizeChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return normalizeChildren((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return String(children ?? '');
}

export function CodeBlock({
  children,
  language = 'plaintext',
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const code = normalizeChildren(children);

  const highlightedHtml = useMemo(() => {
    const lang = hljs.getLanguage(language) ? language : 'plaintext';
    return hljs.highlight(code.trim(), { language: lang }).value;
  }, [code, language]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const lines = code.trim().split('\n');

  return (
    <div className={cn('group relative my-6', className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0a0a0a] border border-border/50 border-b-0 rounded-t-lg">
        <div className="flex items-center gap-3">
          {/* Traffic lights decoration */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {filename && (
            <span className="text-xs text-foreground/40 font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-primary/70 font-mono">
            {language}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            aria-label={copied ? 'Copied!' : 'Copy code'}
          >
            {copied ? (
              <svg className="w-4 h-4 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-foreground/40 hover:text-foreground/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto bg-[#0a0a0a] border border-border/50 border-t-0 rounded-b-lg">
        <pre className="p-4 text-sm font-mono">
          {showLineNumbers ? (
            <code className="text-foreground/90">
              {highlightedHtml.split('\n').map((line, i) => (
                <div key={i} className="flex">
                  <span className="w-8 pr-4 text-foreground/20 select-none text-right shrink-0">
                    {i + 1}
                  </span>
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </div>
              ))}
            </code>
          ) : (
            <code
              className="text-foreground/90 hljs"
              dangerouslySetInnerHTML={{ __html: highlightedHtml }}
            />
          )}
        </pre>

        {/* Subtle glow effect on hover */}
        <div className="absolute inset-0 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-t from-primary/5 to-transparent" />
      </div>
    </div>
  );
}
