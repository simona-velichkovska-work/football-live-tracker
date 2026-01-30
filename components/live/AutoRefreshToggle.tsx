"use client";

export default function AutoRefreshToggle({
  enabled,
  onToggle,
}: {
    enabled: boolean;
    onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded border px-3 py-1 text-sm hover:bg-gray-100"
    >
      {enabled ? "Pause live updates" : "Resume live updates"}
    </button>
  );
}
