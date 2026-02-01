"use client";
import Button from "../ui/Button";

export default function AutoRefreshToggle({
  enabled,
  onToggle,
  disabled = false,
}: {
  enabled: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={enabled}
      className="rounded px-3 py-1 text-sm hover:bg-gray-100 disabled:opacity-60"
    >
      {enabled ? "Pause live updates" : "Resume live updates"}
    </Button>
  );
}
