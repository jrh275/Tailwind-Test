// src/components/StatsBar.tsx

interface Stat {
  name: string;
  value: string;
  change: string;
  changeType: "positive" | "negative";
}

interface StatsBarProps {
  stats: Stat[];
}

function classNames(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="px-4 pt-3 sm:px-6 lg:px-8">
      <dl className="grid grid-cols-1 overflow-hidden rounded-lg border border-base-cloudy bg-base-white sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat, i) => (
          <div
            key={`${stat.name}-${i}`}
            className="relative flex flex-col justify-center px-4 py-4 sm:px-6"
          >
            {(i === 1 || i === 3) && (
              <div className="absolute right-0 top-1/2 h-2/3 w-px -translate-y-1/2 bg-base-cloudy" />
            )}
            <dt className="text-12-16 font-medium text-typography-foggy">
              {stat.name}
            </dt>
            <dd className="text-xl font-semibold text-typography-midnight">
              {stat.value}
            </dd>
            <dd
              className={classNames(
                stat.changeType === "negative"
                  ? "text-contextual-cardinal"
                  : "text-contextual-spruce",
                "text-12-16 font-medium"
              )}
            >
              {stat.change}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// Usage example:
/*
const stats = [
  { name: 'Current Rent', value: '$405,091.00', change: '+4.75%', changeType: 'positive' as const },
  { name: 'Next Month', value: '$12,787.00', change: '+54.02%', changeType: 'negative' as const },
  { name: 'Current Occupancy', value: '$245,988.00', change: '-1.39%', changeType: 'positive' as const },
  { name: 'Next Month', value: '$30,156.00', change: '+10.18%', changeType: 'negative' as const },
  { name: 'Total Leases', value: '$30,156.00', change: '+10.18%', changeType: 'negative' as const },
]

<StatsBar stats={stats} />
*/
