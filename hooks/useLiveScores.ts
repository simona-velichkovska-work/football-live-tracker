"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getLiveMatches } from "@/lib/api";
import { Match } from "@/lib/types";

type UseLiveScoresOptions = {
  intervalMs?: number;
};

export function useLiveScores(
  options: UseLiveScoresOptions = {}
) {
  const { intervalMs = 30_000 } = options;

  const [matches, setMatches] = useState<Match[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isPaused, setIsPaused] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      setIsFetching(true);
      const data = await getLiveMatches();
      setMatches(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch live scores", error);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(
      fetchMatches,
      intervalMs
    );
  }, [fetchMatches, intervalMs]);

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Polling control
  useEffect(() => {
    if (isPaused) {
      stopPolling();
    } else {
      startPolling();
    }

    return stopPolling;
  }, [isPaused, startPolling, stopPolling]);

  return {
    matches,
    isFetching,
    lastUpdated,
    isPaused,
    togglePause,
    refetch: fetchMatches,
  };
}
