interface StatCard {
  label: string;
  value: number;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-lg border border-border bg-card p-6"
        >
          <p className="text-sm text-secondary-foreground">{stat.label}</p>
          <p className="font-lexend mt-1 text-3xl font-semibold text-foreground">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
