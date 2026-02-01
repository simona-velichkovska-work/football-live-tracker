// components/match/detail/events/EventItem.tsx

import { MatchEvent } from "@/lib/types";

type EventItemProps = {
  event: MatchEvent;
};

function formatMinute(elapsed: number | null, extra: number | null) {
  if (!elapsed) return "";
  return extra ? `${elapsed}+${extra}'` : `${elapsed}'`;
}

function getEventIcon(event: MatchEvent) {
  if (event.type === "Goal") return "⚽";

  if (event.type === "Card") {
    if (event.detail === "Yellow Card") return "🟨";
    if (event.detail === "Red Card") return "🟥";
    return "🟨";
  }

  if (event.type === "subst") return "🔁";

  return "•";
}

export default function EventItem({ event }: EventItemProps) {
  const minute = formatMinute(event.time.elapsed, event.time.extra);
  const icon = getEventIcon(event);

  return (
    <div className="flex items-start gap-3 text-sm">
      {/* MINUTE */}
      <div className="w-12 text-right text-gray-400 font-medium">
        {minute}
      </div>

      {/* ICON */}
      <div className="w-6 text-center">{icon}</div>

      {/* DETAILS */}
      <div className="flex flex-col text-gray-200">
        <span className="font-medium">
          {event.player?.name ?? "Unknown player"}
        </span>

        {event.assist?.name && (
          <span className="text-xs text-gray-400">
            Assist: {event.assist.name}
          </span>
        )}

        <span className="text-xs text-gray-500">
          {event.team.name}
        </span>
      </div>
    </div>
  );
}
