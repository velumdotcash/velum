interface StepsProps {
  children?: React.ReactNode;
}

export function Steps({ children }: StepsProps) {
  return (
    <div className="my-6 ml-4 border-l-2 border-border pl-6 [counter-reset:step]">
      {children}
    </div>
  );
}

interface StepProps {
  children?: React.ReactNode;
}

export function Step({ children }: StepProps) {
  return (
    <div className="relative mb-6 last:mb-0 [counter-increment:step]">
      <div className="absolute -left-[2.15rem] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-medium text-background before:content-[counter(step)]" />
      <div className="font-mono text-sm text-foreground/80">{children}</div>
    </div>
  );
}
