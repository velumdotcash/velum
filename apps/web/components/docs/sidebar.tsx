"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils/cn";
import { docsConfig, type NavGroup } from "@/lib/docs-config";

export function DocsSidebar() {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  // Open groups containing active page on mount
  useEffect(() => {
    const activeGroups = docsConfig.nav
      .filter((group) => group.items.some((item) => item.href === pathname))
      .map((group) => group.title);
    setOpenGroups(activeGroups);
  }, [pathname]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) =>
      prev.includes(title)
        ? prev.filter((t) => t !== title)
        : [...prev, title]
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-dvh w-60 border-r border-border bg-background/60 backdrop-blur-md pt-24 pb-8 lg:flex flex-col">
      <nav className="px-4 flex-1 overflow-y-auto">
        <Link
          href="/"
          className="flex items-center gap-2 mb-5 px-3 py-2 rounded-md text-sm font-mono text-foreground/50 hover:text-foreground hover:bg-foreground/5 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to App
        </Link>
        {docsConfig.nav.map((group) => (
          <SidebarGroup
            key={group.title}
            group={group}
            isOpen={openGroups.includes(group.title)}
            onToggle={() => toggleGroup(group.title)}
            pathname={pathname}
          />
        ))}
      </nav>
      <div className="px-6 pt-4 border-t border-border/50">
        <Image
          src="/velum-logo-raw-with-text.svg"
          alt="Velum"
          width={90}
          height={24}
          className="h-5 w-auto opacity-40"
        />
      </div>
    </aside>
  );
}

interface SidebarGroupProps {
  group: NavGroup;
  isOpen: boolean;
  onToggle: () => void;
  pathname: string;
}

function SidebarGroup({ group, isOpen, onToggle, pathname }: SidebarGroupProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-2 font-mono text-xs font-medium uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors"
      >
        {group.title}
        <svg
          className={cn(
            "h-4 w-4 transition-transform",
            isOpen && "rotate-90"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="mt-1 space-y-1">
          {group.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 font-mono text-sm transition-colors",
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-foreground/5 hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
