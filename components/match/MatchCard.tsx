// MatchCard.tsx (Server Component)
import React from 'react';
import { Match } from '@/lib/types';
import TeamLogo from '../ui/TeamLogo';

//Single Match Card Component to display match details like teams, score, league, and date
export default function MatchCard({ fixture, league, teams, goals }: Match) {
  const matchDate = new Date(fixture.date).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-md bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-200 m-5">
      {/* League */}
      <div className="flex items-center p-3 border-b border-gray-200">
        {league.logo && (
          <TeamLogo logo={league.logo} name={league.name} size={40} />
        )}
        <span className="text-sm font-semibold text-white italic p-2">{league.name}</span>
      </div>

      {/* Teams & Score */}
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-2">
          <TeamLogo logo={teams.home.logo} name={teams.home.name} size={40} />
          <span className="font-medium">{teams.home.name}</span>
        </div>

        <div className="text-lg font-bold">
          {goals.home !== null && goals.away !== null ? `${goals.home} - ${goals.away}` : 'vs'}
        </div>

        <div className="flex items-center space-x-2">
          <span className="font-medium">{teams.away.name}</span>
          <TeamLogo logo={teams.away.logo} name={teams.away.name} size={40} />
        </div>
      </div>

      {/* Date */}
      <div className="px-4 pb-3 text-sm text-gray-500">{matchDate}</div>
    </div>
  );
}
