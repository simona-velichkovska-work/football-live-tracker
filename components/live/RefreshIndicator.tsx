"use client";

export default function RefreshIndicator({
  isFetching,
}: {isFetching: boolean;}) {
  if (!isFetching) return null;

  return (
    <span
      className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"
      aria-label="Refreshing live data"
    />
  );
}
