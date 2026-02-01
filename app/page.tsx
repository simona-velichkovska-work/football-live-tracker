
import ClientMatchFilter from "@/components/match/ClientMatchFilter";
import { getFixturesByDate } from "@/lib/api";
import { getTodayDate } from "@/lib/utils";

// Skip prerendering — fetch only runs per request, not at build time
export const dynamic = "force-dynamic";

//cache rendered page for 1 minute
export const revalidate = 60;

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
