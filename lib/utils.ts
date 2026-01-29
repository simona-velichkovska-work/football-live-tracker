import { Match, MatchStatus, STATUS_MAP } from "./types";

export function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export function FilteredMatchesByQuery(matches: Match[], query: string): Match[] {
  if (!query) return matches;
  return matches.filter((match) =>
    match.teams.home.name.toLowerCase().includes(query) ||
    match.teams.away.name.toLowerCase().includes(query)
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
