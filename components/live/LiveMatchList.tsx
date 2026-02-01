"use client";

import MatchList from "@/components/match/MatchList";
import RefreshIndicator from "./RefreshIndicator";
import AutoRefreshToggle from "./AutoRefreshToggle";
import LastUpdated from "./LastUpdated";
import { useLiveScores } from "@/hooks/useLiveScores";

export default function LiveMatchList() {
  const {
    matches,
    isFetching,
    lastUpdated,
    isPaused,
    togglePause,
    refetch,
    error,
  } = useLiveScores();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Live Controls Bar */}
      <div className="items-center mb-6 p-4 bg-[#272c3580]/20 rounded-lg">
        <div className="flex items-center gap-3">
          <AutoRefreshToggle enabled={!isPaused} onToggle={togglePause} disabled={isFetching}  />
          
          <RefreshIndicator isFetching={isFetching} />
          <LastUpdated lastUpdated={lastUpdated} />
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm">
          <div className="flex items-center justify-between gap-3">
            <span>{error}</span>
            <button
              onClick={refetch}
              className="rounded-md border border-border px-3 py-1"
              disabled={isFetching}
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!isFetching && !error && matches.length === 0 && (
        <div className="rounded-lg p-6 text-sm text-muted-foreground">
          No live matches right now.
        </div>
      )}

      {/* Matches */}
      {matches.length > 0 && (
        <MatchList matches={matches} groupByLeague={true} />
      )}
    </div>
  );
}
