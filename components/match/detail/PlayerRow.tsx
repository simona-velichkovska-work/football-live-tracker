// components/match/detail/lineups/PlayerRow.tsx
import { LineupPlayer } from "@/lib/types";

type PlayerRowProps = {
  player: LineupPlayer;
  fallbackNumber: number;
  dimmed?: boolean;
};

function getPosStyle(pos: string) {
  switch (pos) {
    case "G":
      return "bg-[#e7b008]/20 text-[#e7b008]";
    case "D":
      return "bg-blue-500/20 text-blue-400";
    case "M":
      return "bg-[#1acb6a]/20 text-[#1acb6a]";
    case "F":
      return "bg-[#dc2828]/20 text-[#dc2828]";
    default:
      return "bg-[#272c35] text-muted-foreground";
  }
}

export default function PlayerRow({
  player,
  fallbackNumber,
  dimmed = false,
}: PlayerRowProps) {
  return (
    <div
      className={`flex items-center gap-3 py-2.5 px-3 rounded-lg transition-colors hover:bg-[#272c35]/50 ${
        dimmed ? "opacity-75" : ""
      }`}
    >
      {/* NUMBER */}
      <div className="w-8 h-8 rounded-full bg-[#272c35] flex items-center justify-center text-sm font-bold tabular-nums">
        {player.player.number ?? fallbackNumber}
      </div>

      {/* NAME */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-foreground truncate">
          {player.player.name}
        </div>
      </div>

      {/* POSITION BADGE */}
      <div
        className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${getPosStyle(
          player.player.pos
        )}`}
      >
        {player.player.pos === "G"
          ? "GK"
          : player.player.pos === "D"
          ? "DEF"
          : player.player.pos === "M"
          ? "MID"
          : "FWD"}
      </div>
    </div>
  );
}
