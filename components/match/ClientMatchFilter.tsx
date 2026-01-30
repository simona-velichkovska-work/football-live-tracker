// components/ClientHomePage.tsx
"use client"

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import FilterBar from "@/components/filters/FilterBar";
import MatchList from "@/components/match/MatchList";
import { League, Match, MatchStatus } from "@/lib/types";
import { FilteredMatchesByQuery, getMatchCategory } from "@/lib/utils";

export default function ClientMatchFilter({ matches }: { matches: Match[] }) {
  const searchParams = useSearchParams();

  const displayToday = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Extract available leagues - add null check
  const availableLeagues: League[] = useMemo(() => {
    if (!matches || !Array.isArray(matches)) return [];
    
    const leagueMap = new Map<string, League>();
    matches.forEach((match: Match) => {
      const leagueId = match.league.id.toString();
      if (!leagueMap.has(leagueId)) {
        leagueMap.set(leagueId, {
          id: leagueId,
          name: match.league.name,
          logo: match.league.logo
        });
      }
    });
    return Array.from(leagueMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }, [matches]);

  // Read filters from URL (client-side, no server re-render)
  const query = searchParams.get('query')?.toLowerCase() || "";
  const status = (searchParams.get('status') as MatchStatus | "all") || "all";
  const leagues = searchParams.get('leagues')?.split(',').filter(Boolean) || [];

  // Client-side filtering (instant) - add null check
  const filteredMatches = useMemo(() => {
    if (!matches || !Array.isArray(matches)) return [];
    
    // 1. Filter by search query
    const queryFiltered = FilteredMatchesByQuery(matches, query);

    // 2. Filter by match status
    const statusFiltered = queryFiltered.filter((match: Match) => {
      if (status === "all") return true;
      return getMatchCategory(match) === status;
    });

    // 3. Filter by selected leagues
    return statusFiltered.filter((match: Match) => {
      if (leagues.length === 0) return true;
      return leagues.includes(match.league.id.toString());
    });
  }, [matches, query, status, leagues]);

    // Debug logging
  console.log("Total matches:", matches?.length || 0);
  console.log("Filtered matches:", filteredMatches?.length || 0);
  console.log("Query:", query);
  console.log("Status:", status);
  console.log("Leagues:", leagues);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⚽</span>
            <h1 className="text-3xl font-bold text-foreground">Football Matches</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">{displayToday}</span>
          </div>
        </div>
      </header>

      {/* Filter Bar - still uses URL params */}
      <FilterBar availableLeagues={availableLeagues} />

      {/* Matches */}
      <MatchList matches={filteredMatches} />
    </div>
  );
}