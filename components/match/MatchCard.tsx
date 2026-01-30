// MatchCard.tsx (Server Component)

import Link from "next/link";
import { Match } from "@/lib/types";
import TeamLogo from "./TeamLogo";
import MatchHeader from "./MatchHeader";

export default function MatchCard({
  fixture,
  league,
  teams,
  goals,
}: Match) {
  const matchDate = new Date(fixture.date).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Link
      href={`/match/${fixture.id}`}
      className="block max-w-md rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-md transition hover:bg-gray-750"
    >
      {/* League */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-700">
        {league.logo && (
          <TeamLogo
            logo={league.logo}
            name={league.name}
            size={28}
          />
        )}
        <span className="text-sm font-semibold italic text-white">
          {league.name}
        </span>
      </div>

      {/* Match Header (teams, score, status) */}
      <div className="p-4">
        <MatchHeader
          fixture={fixture}
          teams={teams}
          goals={goals}
        />
      </div>

      {/* Date */}
      <div className="px-4 pb-3 text-xs text-gray-400">
        {matchDate}
      </div>
    </Link>
  );
}