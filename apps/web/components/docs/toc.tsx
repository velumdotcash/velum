"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Extract headings from the page
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3")
    );
    const items: TocItem[] = elements.map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }));
    setHeadings(items);

    // Setup intersection observer for scroll spy
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-80px 0px -80% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <aside className="fixed right-0 top-0 z-40 hidden h-dvh w-52 border-l border-border bg-background/60 backdrop-blur-md pt-24 pb-8 overflow-y-auto xl:block">
      <nav className="px-4">
        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-wider text-foreground/60">
          On this page
        </p>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={cn(
                  "block font-mono text-sm transition-colors",
                  heading.level === 3 && "pl-3",
                  activeId === heading.id
                    ? "text-primary"
                    : "text-foreground/50 hover:text-foreground"
                )}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
