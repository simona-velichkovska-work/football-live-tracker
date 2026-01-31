import TeamLogo from "./TeamLogo";
import MatchStatus from "./MatchStatus";
import ScoreDisplay from "./ScoreDisplay";
import { Fixture } from "@/lib/types";

type MatchHeaderProps = {
  fixture: Fixture;
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};

export default function MatchHeader({
  fixture,
  teams,
  goals,
}: MatchHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <MatchStatus status={fixture.status} />

      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex items-center gap-2 min-w-0">
          <TeamLogo
            logo={teams.home.logo}
            name={teams.home.name}
          />
          <span
            className="text-sm font-medium truncate max-w-20"
            title={teams.home.name}
          >
            {teams.home.name}
          </span>
        </div>

        {/* Score */}
        <ScoreDisplay
          home={goals.home}
          away={goals.away}
        />

        {/* Away team */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="text-sm font-medium truncate max-w-20 text-right"
            title={teams.away.name}
          >
            {teams.away.name}
          </span>
          <TeamLogo
            logo={teams.away.logo}
            name={teams.away.name}
          />
        </div>
      </div>
    </div>
  );
}
