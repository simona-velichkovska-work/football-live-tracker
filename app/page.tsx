import ClientMatchFilter from "@/components/match/ClientMatchFilter";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { getFixturesByDate } from "@/lib/api";
import { getTodayDate } from "@/lib/utils";

// Skip prerendering – fetch only runs per request, not at build time
export const dynamic = "force-dynamic";

//cache rendered page for 1 minute
export const revalidate = 60;

//Show today's football matches with filtering
export default async function HomePage() {

  // Get today's date in YYYY-MM-DD format
  const todayMatchDate = getTodayDate();

  let matches = [];
  let error: string | null = null;

  try {
    matches = await getFixturesByDate(todayMatchDate);
  } catch (e) {
    error = (e as Error).message;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
  
      <ClientMatchFilter matches={matches} />

  );
}