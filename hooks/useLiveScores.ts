"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getLiveMatches } from "@/lib/api";
import { Match } from "@/lib/types";

type UseLiveScoresOptions = {
  intervalMs?: number;
};

export function useLiveScores(options: UseLiveScoresOptions = {}) {
  const { intervalMs = 30_000 } = options;

  const [matches, setMatches] = useState<Match[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchMatches = useCallback(async () => {
    try {
      setIsFetching(true);
      setError(null);

      const res = await fetch("/api/live");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load live scores");
      }

      setMatches(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch live scores", err);
      setError(
        err instanceof Error ? err.message : "Failed to load live scores"
      );
      setMatches([]);
    } finally {
      setIsFetching(false);
    }
  }, []);

  const startPolling = useCallback(() => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(fetchMatches, intervalMs);
  }, [fetchMatches, intervalMs]);

  const stopPolling = useCallback(() => {
    if (!intervalRef.current) return;

    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const togglePause = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchMatches();
  }, [fetchMatches]);

  // Polling control + instant refresh on resume
  useEffect(() => {
    if (isPaused) {
      stopPolling();
      return;
    }

    // Fetch immediately when resuming
    fetchMatches();
    startPolling();

    return stopPolling;
  }, [isPaused, fetchMatches, startPolling, stopPolling]);

  return {
    matches,
    isFetching,
    lastUpdated,
    isPaused,
    togglePause,
    refetch: fetchMatches,
    error, // expose error
  };
}
