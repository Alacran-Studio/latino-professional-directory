export function SectionHeading({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-lexend text-base font-semibold uppercase tracking-wide text-foreground">
        {children}
      </h2>
      {action}
    </div>
  );
}
