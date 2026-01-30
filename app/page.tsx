import FilterBar from "@/components/filters/FilterBar";
import ClientMatchFilter from "@/components/match/ClientMatchFilter";
import MatchList from "@/components/match/MatchList";
import { getMatchesByDate } from "@/lib/api";
import { REVALIDATE_HOME_PAGE_SECONDS } from "@/lib/constants";
import { League,Match, MatchStatus } from "@/lib/types";
import { getTodayDate } from "@/lib/utils";
import { FilteredMatchesByQuery, getMatchCategory } from "@/lib/utils";

//cache rendered page for 1 minute
export const revalidate = REVALIDATE_HOME_PAGE_SECONDS;

//Show today's football matches with filtering
export default async function HomePage() {
  // Get today's date in YYYY-MM-DD format
  const todayMatchDate = getTodayDate();

  // Fetch matches for today
  // Add error handling
  let matches;
  try {
    matches = await getMatchesByDate(todayMatchDate);
  } catch (error) {
    console.error("Error fetching matches:", error);
    matches = []; // Return empty array instead of null
  }
  console.log("Fetched matches:", matches?.length);
  return (
      <ClientMatchFilter matches={matches} />
  );
}
