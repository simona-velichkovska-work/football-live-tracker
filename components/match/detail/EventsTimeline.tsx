// components/match/detail/events/EventsTimeline.tsx

import { MatchEvent } from "@/lib/types";
import EventItem from "./EventItem";

type EventsTimelineProps = {
  events: MatchEvent[];
};

export default function EventsTimeline({ events }: EventsTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const aElapsed = a.time.elapsed ?? 0;
    const bElapsed = b.time.elapsed ?? 0;

    if (aElapsed !== bElapsed) return aElapsed - bElapsed;

    return (a.time.extra ?? 0) - (b.time.extra ?? 0);
  });

  return (
    <div className="flex flex-col gap-3">
      {sortedEvents.map((event) => (
        <EventItem
          key={`${event.time.elapsed}-${event.time.extra}-${event.team?.id}-${event.type}`}
          event={event}
        />
      ))}
    </div>
  );
}
