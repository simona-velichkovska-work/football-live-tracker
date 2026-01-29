// MatchList.tsx (Server Component, responsive)
import React from 'react';
import MatchCard from './MatchCard';
import { Match, MatchStatus } from '@/lib/types';
import { FilteredMatchesByQuery, getMatchCategory } from '@/lib/utils';
import Image from 'next/image';

export default function MatchList(
  { matches, 
    query, 
    status,
    leagues}: 
  { matches: Match[]; 
    query: string; 
    status: MatchStatus | "all"; 
    leagues?: string[];
  }) {
  
    // Group matches by league ID
  const queryFiltered = FilteredMatchesByQuery(matches, query);
  
  // Then filter by status category
  const statusFiltered = queryFiltered.filter((match) => {
    if (status === 'all') return true;
    const category = getMatchCategory(match);
    return category === status;
  });

  // Filter by multiple leagues
  const filteredMatches = statusFiltered.filter((match) => {
    if (!leagues || leagues.length === 0) return true;
    return leagues.includes(match.league.id.toString());
  });

    // Check if no matches found
  if (filteredMatches.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No matches found</p>
          <p className="text-sm text-muted-foreground mt-2">
            Try adjusting your filters
          </p>
        </div>
      </div>
    );
  }
  // Group matches by league
  const matchesByLeague = filteredMatches.reduce<Record<string, Match[]>>((acc, match) => {
    const leagueId = match.league.id.toString();
    if (!acc[leagueId]) acc[leagueId] = [];
    acc[leagueId].push(match);
    return acc;
  }, {});

  return (
    <div className="space-y-12">
      {Object.values(matchesByLeague).map((leagueMatches) => (
        <div key={leagueMatches[0].league.id}>
          {/* League Header */}
          <div className="flex items-center mb-6 space-x-3">
            {leagueMatches[0].league.logo && (
              <Image
                src={leagueMatches[0].league.logo}
                alt={leagueMatches[0].league.name}
                width={24}
                height={24}
                className="object-contain"
                unoptimized // API images might not be optimizable
              />
            )}
            <h2 className="text-lg font-semibold">{leagueMatches[0].league.name}</h2>
          </div>

          {/* Match Cards - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leagueMatches.map((match) => (
              <MatchCard key={match.fixture.id} {...match} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
