
import ClientMatchFilter from "@/components/match/ClientMatchFilter";
import { getMatchesByDate } from "@/lib/api";
import { REVALIDATE_HOME_PAGE_SECONDS } from "@/lib/constants";
import { getTodayDate } from "@/lib/utils";

//cache rendered page for 1 minute
export const revalidate = REVALIDATE_HOME_PAGE_SECONDS;

//Show today's football matches with filtering
export default async function HomePage() {
  await new Promise((resolve)=>setTimeout(resolve,30000));
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
    const tabs = [
    { id: "overview", label: "Overview" },
    { id: "stats", label: "Statistics" },
    { id: "lineups", label: "Lineups" },
  ];
  return (
  
      <ClientMatchFilter matches={matches} />

  );
}
