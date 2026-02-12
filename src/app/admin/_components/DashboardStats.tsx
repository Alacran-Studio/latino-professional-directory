import Link from "next/link";

interface StatCard {
  label: string;
  value: number;
  href?: string;
}

interface DashboardStatsProps {
  stats: StatCard[];
}

const cardBase = "rounded-lg border border-border bg-card p-6";
const cardInteractive =
  "transition duration-300 ease-in-out hover:bg-cardHover shadow-lg shadow-gray-300 dark:shadow-gray-800 cursor-pointer";

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const isLinked = stat.href && stat.value > 0;

        const content = (
          <>
            <p className="text-sm text-secondary-foreground">{stat.label}</p>
            <p className="font-lexend mt-1 text-3xl font-semibold text-foreground">
              {stat.value}
            </p>
          </>
        );

        if (isLinked) {
          return (
            <Link
              key={stat.label}
              href={stat.href!}
              className={`${cardBase} ${cardInteractive}`}
            >
              {content}
            </Link>
          );
        }

        return (
          <div key={stat.label} className={cardBase}>
            {content}
          </div>
        );
      })}
    </div>
  );
}
