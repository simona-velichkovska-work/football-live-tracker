// components/match/detail/events/EventsTimeline.tsx

import { MatchEvent } from "@/lib/types";
import EventItem from "./EventItem";

type EventsTimelineProps = {
  events: MatchEvent[];
};

export default function EventsTimeline({ events }: EventsTimelineProps) {
  // Defensive: API already sends ordered events, but never trust it
  const sortedEvents = [...events].sort((a, b) => {
    const aTime = a.time.elapsed ?? 0;
    const bTime = b.time.elapsed ?? 0;
    return aTime - bTime;
  });

  return (
    <div className="flex flex-col gap-3">
      {sortedEvents.map((event, index) => (
        <EventItem key={index} event={event} />
      ))}
    </div>
  );
}
