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
  } = useLiveScores();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Live Controls Bar */}
      <div className="flex items-center justify-between mb-6 p-4 bg-secondary/20 rounded-lg border border-border">
        <div className="flex items-center gap-3">
          <RefreshIndicator isFetching={isFetching} />
          <LastUpdated lastUpdated={lastUpdated} />
        </div>

        <AutoRefreshToggle
          enabled={!isPaused}
          onToggle={togglePause}
        />
      </div>

      {/* Reuse MatchList component */}
      <MatchList matches={matches} groupByLeague={true} />
    </div>
  );
}