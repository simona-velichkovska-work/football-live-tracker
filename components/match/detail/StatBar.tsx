// components/match/detail/stats/StatBar.tsx

type StatBarProps = {
  label: string;
  homeValue: number | string | null;
  awayValue: number | string | null;
};

function normalize(value: number | string | null): number {
  if (value === null) return 0;
  if (typeof value === "string") {
    return Number(value.replace("%", "")) || 0;
  }
  return value;
}

export default function StatBar({
  label,
  homeValue,
  awayValue,
}: StatBarProps) {
  const home = normalize(homeValue);
  const away = normalize(awayValue);
  const total = home + away || 1;

  const homePercent = (home / total) * 100;
  const awayPercent = (away / total) * 100;

  const homeLeading = home >= away;

  return (
    <div className="space-y-2">
      {/* VALUES + LABEL */}
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground tabular-nums">
          {homeValue ?? 0}
        </span>

        <span className="text-muted-foreground text-xs uppercase tracking-wider">
          {label}
        </span>

        <span className="font-semibold text-foreground tabular-nums">
          {awayValue ?? 0}
        </span>
      </div>

      {/* BAR */}
      <div className="flex gap-1 h-2">
        <div
          className={`rounded-l-full transition-all bg-[#1acb6a] ${
            homeLeading ? "opacity-100" : "opacity-40"
          }`}
          style={{ width: `${homePercent}%` }}
        />
        <div
          className={`rounded-r-full transition-all bg-[#1acb6a] ${
            homeLeading ? "opacity-40" : "opacity-100"
          }`}
          style={{ width: `${awayPercent}%` }}
        />
      </div>
    </div>
  );
}
