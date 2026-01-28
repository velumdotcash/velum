import { cn } from "@/lib/utils/cn";

interface CalloutProps {
  type?: "info" | "warning" | "tip";
  children?: React.ReactNode;
}

const icons = {
  info: "ℹ️",
  warning: "⚠️",
  tip: "💡",
};

const styles = {
  info: "bg-primary/5 border-primary",
  warning: "bg-warning/5 border-warning",
  tip: "bg-success/5 border-success",
};

export function Callout({ type = "info", children }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border-l-2 p-4",
        styles[type]
      )}
    >
      <span className="text-lg">{icons[type]}</span>
      <div className="font-mono text-sm text-foreground/80">{children}</div>
    </div>
  );
}
