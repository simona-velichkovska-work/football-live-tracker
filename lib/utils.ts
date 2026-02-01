import { Match, MatchStatus, STATUS_MAP } from "./types";

//Get date in YYYY-MM-DD format local to user's timezone
export function getTodayDate(): string {
  const d = new Date();

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


export function filteredMatchesByQuery(
  matches: Match[],
  query: string
): Match[] {
  if (!query.trim()) return matches;

  const normalizedQuery = query.toLowerCase().trim();

  return matches.filter((match) =>
    match.teams.home.name.toLowerCase().includes(normalizedQuery) ||
    match.teams.away.name.toLowerCase().includes(normalizedQuery)
  );
}

export function getMatchCategory(match: Match): MatchStatus | "all" {
  const apiStatus = match.fixture.status.short;
  
  for (const [category, codes] of Object.entries(STATUS_MAP)) {
    if (codes.includes(apiStatus)) {
      return category as MatchStatus;
    }
  }
  
  return "all"; // Unknown status
}
