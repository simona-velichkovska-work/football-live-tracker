"use client";

import MatchCard from "@/components/match/MatchCard";
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
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <RefreshIndicator isFetching={isFetching} />
          <LastUpdated lastUpdated={lastUpdated} />
        </div>

        <AutoRefreshToggle
          enabled={!isPaused}
          onToggle={togglePause}
        />
      </div>

      <div className="space-y-4">
        {matches.length === 0 && (
          <p className="text-sm text-gray-500">
            No live matches right now.
          </p>
        )}

        {matches.map((match) => (
          <MatchCard
            key={match.fixture.id}
            {...match}
          />
        ))}
      </div>
    </section>
  );
}
