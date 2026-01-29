import FilterBar from "@/components/filters/FilterBar";
import MatchList from "@/components/match/MatchList";
import { getMatchesByDate } from "@/lib/api";
import { League,Match, MatchStatus } from "@/lib/types";
import { getTodayDate } from "@/lib/utils";

//cache rendered page for 1 minute
export const revalidate = 60;

//Show today's football matches with filtering
export default async function HomePage({ searchParams }: {searchParams:{query?:string;status?: string; leagues?: string}}) {

  const todayMatchDate = getTodayDate();
  const displayToday = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Fetch matches for today
  const matches = await getMatchesByDate(todayMatchDate);

  //Extract League data from matches
  const leagueMap = new Map<string, League>();

  matches.forEach((match: Match) => {
    const leagueId = match.league.id.toString();
    if (!leagueMap.has(leagueId)) {
      leagueMap.set(leagueId, {
        id: leagueId,
        name: match.league.name,
        logo: match.league.logo
      });
    }
  });

  const availableLeagues: League[] = Array.from(leagueMap.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  // Extract query parameter for filtering
  const params = await searchParams;
  const query = params?.query?.toLowerCase() || "";
  const status = (params?.status as MatchStatus) || "all";
  const leagues = params?.leagues?.split(',').filter(Boolean) || [];

  return (
        <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">⚽</span>
            <h1 className="text-3xl font-bold text-foreground">Football Matches</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm">{displayToday}</span>
          </div>
        </div>
      </header>

      {/* Filter Bar */}
      <FilterBar availableLeagues={availableLeagues} />

      {/* Matches */}
      <ul>
        <MatchList matches={matches} query={query} status={status} leagues={leagues} />
      </ul>
    </div>
  );
}
