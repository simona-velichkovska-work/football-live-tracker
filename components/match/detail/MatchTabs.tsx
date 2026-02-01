"use client";

import Tabs from "@/components/ui/Tabs";
import TabPanel from "@/components/ui/TabPanel";
import EmptyState from "@/components/ui/EmptyState";
import EventsTimeline from "./EventsTimeline";

import { MatchEvent, TeamLineup, MatchStatistic } from "@/lib/types";
import LineupDisplay from "./LineupDisplay";
import { Stats } from "fs";
import StatsComparison from "./StatsComparison";

type MatchTabsProps = {
  events: MatchEvent[];
  lineups: TeamLineup[];
  statistics: MatchStatistic[];
};

export default function MatchTabs({
  events,
  lineups,
  statistics,
}: MatchTabsProps) {
  const tabs = [
    { id: "events", label: "Events" },
    { id: "lineups", label: "Lineups" },
    { id: "stats", label: "Stats" },
  ];

  return (
    <Tabs tabs={tabs}>
      {/* EVENTS TAB */}
      <TabPanel tabId="events">
        {events.length === 0 ? (
          <EmptyState title="No events yet" message="Nothing has happened in this match yet." />
        ) : (
          <div className="text-gray-400">
            <EventsTimeline events={events} />
          </div>
        )}
      </TabPanel>

      {/* LINEUPS TAB */}
      <TabPanel tabId="lineups">
        {lineups.length === 0 ? (
          <EmptyState title="No lineups available" message="Lineups are available between 20 and 40 minutes before the match starts." />
        ) : (
          <LineupDisplay lineups={lineups} />
        )}
      </TabPanel>

      {/* STATS TAB */}
      <TabPanel tabId="stats">
        {statistics.length === 0 ? (
          <EmptyState title="Statistics not available" message="Statistics become available after the match has started." />
        ) : (
          <StatsComparison stats={statistics} />
        )}
      </TabPanel>
    </Tabs>
  );
}
