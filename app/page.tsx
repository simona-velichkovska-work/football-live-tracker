
import ClientMatchFilter from "@/components/match/ClientMatchFilter";
import { getFixturesByDate } from "@/lib/api";
import { REVALIDATE_HOME_PAGE_SECONDS } from "@/lib/constants";
import { getTodayDate } from "@/lib/utils";

//cache rendered page for 1 minute
export const revalidate = REVALIDATE_HOME_PAGE_SECONDS;

//Show today's football matches with filtering
export default async function HomePage() {

  // Get today's date in YYYY-MM-DD format
  const todayMatchDate = getTodayDate();

  // Fetch matches for today
  const matches = await getFixturesByDate(todayMatchDate);

  return (
  
      <ClientMatchFilter matches={matches} />

  );
}
