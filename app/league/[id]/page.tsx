import {
  STANDINGS_FIXTURES_SEASON,
} from "@/lib/constants";
import { getLeagueStandings, getLeagueFixtures } from "@/lib/api";
import StandingsTable from "@/components/league/StandingsTable";
import LeagueFixtures from "@/components/league/LeagueFixtures";
import Tabs from "@/components/ui/Tabs";
import TabPanel from "@/components/ui/TabPanel";
import TeamLogo from "@/components/match/TeamLogo";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function LeaguePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const leagueId = Number(id);

  if (!Number.isFinite(leagueId)) notFound();

  const season = STANDINGS_FIXTURES_SEASON;

  let league = null;
  let standings = [];
  let fixtures = [];
  let error: string | null = null;

  try {
    [{ league, standings }, fixtures] = await Promise.all([
      getLeagueStandings(leagueId, season),
      getLeagueFixtures(leagueId, season),
    ]);
  } catch (e) {
    error = (e as Error).message;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const leagueMeta = fixtures?.[0]?.league ?? league;

  const tabs = [
    { id: "standings", label: "Standings" },
    { id: "fixtures", label: "Fixtures" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:underline transition-colors"
      >
        &lt;- Back to home
      </Link>

      {/* League Header */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1d222a] shadow-sm border-gray-800 border">
        <TeamLogo
          logo={leagueMeta?.logo}
          name={leagueMeta?.name ?? `League ${leagueId}`}
          size={48}
        />
        <div className="flex-1">
          <h1 className="text-xl font-bold">{leagueMeta?.name ?? `League ${leagueId}`}</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{leagueMeta?.country ?? "Unknown country"}</span> •{" "}
            <span>Season {season}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs}>
        {/* Standings Tab */}
        <TabPanel tabId="standings">
          <div className="rounded-lg border bg-[#1d222a] shadow-sm border-border/50 border-gray-800 p-6">
            {standings.length > 0 ? (
              <StandingsTable standings={standings} />
            ) : (
              <p>No standings available for this league.</p>
            )}
          </div>
        </TabPanel>

        {/* Fixtures Tab */}
        <TabPanel tabId="fixtures">
          <div className="rounded-lg border bg-[#1d222a] shadow-sm border-border/50 border-gray-800 p-6 space-y-4">
            {fixtures.length > 0 ? (
              <LeagueFixtures fixtures={fixtures} />
            ) : (
              <p>No upcoming fixtures found.</p>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}