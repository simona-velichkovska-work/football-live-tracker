"use client";

export default function RefreshIndicator({
  isFetching,
}: {
  isFetching: boolean;
}) {
  if (!isFetching) return null;

  return (
    <span
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2"
    >
      <span
        className="inline-block h-3 w-3 animate-pulse rounded-full bg-green-500"
        aria-hidden="true"
      />
      <span className="sr-only">Refreshing live data</span>
    </span>
  );
}
