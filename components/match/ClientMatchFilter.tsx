// components/match/ClientMatchFilter.tsx
"use client";

import { useMemo, useState } from "react";
import FilterBar from "@/components/filters/FilterBar";
import MatchList from "@/components/match/MatchList";
import { League, Match, MatchStatus } from "@/lib/types";
import { FilteredMatchesByQuery, getMatchCategory } from "@/lib/utils";

type FiltersState = {
  query: string;
  status: MatchStatus | "all";
  leagues: string[];
};

export default function ClientMatchFilter({ matches }: { matches: Match[] }) {
  /* -------------------- Filters (local state) -------------------- */
  const [filters, setFilters] = useState<FiltersState>({
    query: "",
    status: "all",
    leagues: [],
  });

  /* -------------------- Today label -------------------- */
  const displayToday = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  /* -------------------- Available leagues -------------------- */
  const availableLeagues: League[] = useMemo(() => {
    if (!Array.isArray(matches)) return [];

    const leagueMap = new Map<string, League>();

    for (const match of matches) {
      const id = match.league.id.toString();
      if (!leagueMap.has(id)) {
        leagueMap.set(id, {
          id,
          name: match.league.name,
          logo: match.league.logo,
        });
      }
    }

    return Array.from(leagueMap.values()).sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }, [matches]);

  /* -------------------- Client-side filtering -------------------- */
  const filteredMatches = useMemo(() => {
    if (!Array.isArray(matches)) return [];

    let result = FilteredMatchesByQuery(matches, filters.query);

    if (filters.status !== "all") {
      result = result.filter(
        (match) => getMatchCategory(match) === filters.status
      );
    }

    if (filters.leagues.length > 0) {
      result = result.filter((match) =>
        filters.leagues.includes(match.league.id.toString())
      );
    }

    return result;
  }, [matches, filters]);

  /* -------------------- Render -------------------- */
  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-6">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground">
            Today's Matches
          </h1>
          <p className="text-sm text-muted-foreground">{displayToday}</p>
        </div>
      </header>

      {/* Filters */}
      <FilterBar
        availableLeagues={availableLeagues}
        filters={filters}
        onChange={setFilters}
      />

      {/* Matches */}
      <MatchList matches={filteredMatches} />
    </div>
  );
}
