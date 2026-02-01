// components/match/detail/stats/StatsComparison.tsx

import TeamLogo from "../TeamLogo";
import StatBar from "./StatBar";
import { MatchStatistic } from "@/lib/types";

type StatsComparisonProps = {
  stats: MatchStatistic[];
};

export default function StatsComparison({ stats }: StatsComparisonProps) {
  if (stats.length !== 2) return null;

  const [home, away] = stats;

  const statMap = new Map<
    string,
    { home: number | string | null; away: number | string | null }
  >();

  home.statistics.forEach((stat) => {
    statMap.set(stat.type, { home: stat.value, away: null });
  });

  away.statistics.forEach((stat) => {
    const existing = statMap.get(stat.type);
    if (existing) {
      existing.away = stat.value;
    } else {
      statMap.set(stat.type, { home: null, away: stat.value });
    }
  });

  return (
    <div className="match-card rounded-xl p-6 space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <TeamLogo name={home.team.name} logo={home.team.logo} />
          <span className="font-semibold text-foreground">
            {home.team.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-foreground">
            {away.team.name}
          </span>
          <TeamLogo name={away.team.name} logo={away.team.logo} />
        </div>
      </div>

      {/* STATS */}
      <div className="space-y-5">
        {[...statMap.entries()].map(([label, values]) => (
          <StatBar
            key={label}
            label={label}
            homeValue={values.home}
            awayValue={values.away}
          />
        ))}
      </div>
    </div>
  );
}
