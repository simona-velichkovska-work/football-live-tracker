// MatchList.tsx (Server Component)

import MatchCard from "./MatchCard";
import { Match } from "@/lib/types";
import Image from "next/image";

type MatchListProps = {
  matches: Match[];
  groupByLeague?: boolean;
};

export default function MatchList({
  matches,
  groupByLeague = true,
}: MatchListProps) {
  if (matches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No matches found
        </p>
      </div>
    );
  }

  if (!groupByLeague) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {matches.map((match) => (
          <MatchCard key={match.fixture.id} {...match} />
        ))}
      </div>
    );
  }

  const matchesByLeague = matches.reduce<Record<string, Match[]>>(
    (acc, match) => {
      const leagueId = match.league.id.toString();
      if (!acc[leagueId]) acc[leagueId] = [];
      acc[leagueId].push(match);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-12">
      {Object.values(matchesByLeague).map((leagueMatches) => (
        <section key={leagueMatches[0].league.id}>
          <header className="flex items-center gap-3 mb-6">
            {leagueMatches[0].league.logo && (
              <Image
                src={leagueMatches[0].league.logo}
                alt={leagueMatches[0].league.name}
                width={24}
                height={24}
                className="object-contain"
                unoptimized
              />
            )}
            <h2 className="text-lg font-semibold">
              {leagueMatches[0].league.name}
            </h2>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leagueMatches.map((match) => (
              <MatchCard
                key={match.fixture.id}
                {...match}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
