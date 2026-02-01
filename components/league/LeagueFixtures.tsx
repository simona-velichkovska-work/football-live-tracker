import TeamLogo from "../match/TeamLogo";

// components/league/LeagueFixtures.tsx
interface LeagueFixturesProps {
  fixtures: Array<{
    fixture: { id: number; date: string; status: { long: string } };
    teams: {
      home: { name: string; logo: string };
      away: { name: string; logo: string };
    };
    league: { name: string };
    score: { fulltime: { home: number | null; away: number | null } };
  }>;
}

export default function LeagueFixtures({ fixtures }: LeagueFixturesProps) {
  return (
    <div className="space-y-3">
      {fixtures.map((match) => {
        const matchScore =
          match.score.fulltime.home !== null &&
          match.score.fulltime.away !== null
            ? `${match.score.fulltime.home} - ${match.score.fulltime.away}`
            : new Date(match.fixture.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

        return (
          <div
            key={match.fixture.id}
            className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
          >
            {/* Home Team */}
            <div className="flex-1 flex items-center justify-end gap-2">
              <span className="text-sm font-medium truncate text-right">
                {match.teams.home.name}
              </span>
              <TeamLogo
                logo={match.teams.home.logo}
                name={match.teams.home.name}
                size={24}
              />
            </div>

            {/* Score */}
            <div className="w-20 text-center">
              <span className="text-sm text-[#818898]">{matchScore}</span>
            </div>

            {/* Away Team */}
            <div className="flex-1 flex items-center gap-2">
              <TeamLogo
                logo={match.teams.away.logo}
                name={match.teams.away.name}
                size={24}
              />
              <span className="text-sm font-medium truncate">
                {match.teams.away.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
