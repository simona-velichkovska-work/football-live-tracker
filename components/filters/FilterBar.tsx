// components/filters/FilterBar.tsx
"use client";

import React from "react";
import TeamSearch from "./TeamSearch";
import StatusFilter from "./StatusFilter";
import LeagueFilter from "./LeagueFilter";
import { League, MatchStatus } from "@/lib/types";

type FiltersState = {
  query: string;
  status: MatchStatus | "all";
  leagues: string[];
};

type FilterBarProps = {
  availableLeagues: League[];
  filters: FiltersState;
  onChange: React.Dispatch<React.SetStateAction<FiltersState>>;
};

export default function FilterBar({
  availableLeagues,
  filters,
  onChange,
}: FilterBarProps) {


  const handleStatusChange = (status: MatchStatus | "all") => {
    onChange((prev) => ({ ...prev, status }));
  };

  const handleQueryChange = (query: string) => {
    onChange((prev) => ({ ...prev, query }));
  };

  const handleLeaguesChange = (leagues: string[]) => {
    onChange((prev) => ({ ...prev, leagues }));
  };


  return (
    <div className="glass-effect py-4 mb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <StatusFilter value={filters.status} onChange={handleStatusChange} />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:ml-auto">
            <LeagueFilter
              availableLeagues={availableLeagues}
              value={filters.leagues}
              onChange={handleLeaguesChange}
            />

            <TeamSearch value={filters.query} onChange={handleQueryChange} />

          </div>
        </div>
      </div>
    </div>
  );
}
