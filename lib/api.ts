import { API_BASE_URL, API_HEADERS } from "./constants";

// Helper to handle API errors
function apiError(message: string): never {
  throw new Error(message);
}

// Get All fixtures/matches for a specific date
// Refactor: getMatchesByDate => getFixturesByDate ?
export async function getMatchesByDate(date: string) {
  try {
    // Construct the URL with query parameters
    const url = new URL(`${API_BASE_URL}/fixtures`);
    url.searchParams.set("date", date);

    // Fetch data from the API
    const res = await fetch(url.toString(), {
      headers: API_HEADERS,
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.errors && Object.keys(json.errors).length > 0) {
      console.log("API errors:", json.errors);
      return null;
    }

    return json.response ?? [];
  } catch {
    return null;
  }
}

// Get all live matches
export async function getLiveMatches() {
  try {
    const url = new URL(`${API_BASE_URL}/fixtures`);
    url.searchParams.set("live", "all");
    
    const res = await fetch(url.toString(), {
      headers: API_HEADERS,
    }); 
    if (res.status === 429) {
      console.warn("Rate limit exceeded");
      return null;
    }

    if (!res.ok) {
      return null;
    }
    
    const json = await res.json();
    if (json.errors && Object.keys(json.errors).length > 0) {
      return null;
    }

    return json.response ?? [];

  } catch {
    return null;
  }
}

// Get a match by its ID
export async function getMatchById(id: number) {
  try {
    // Construct the URL with query parameters
    const url = new URL(`${API_BASE_URL}/fixtures`);
    url.searchParams.set("id", id.toString());

    // Fetch data from the API
    const res = await fetch(url.toString(), {
      headers: API_HEADERS,
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.errors && Object.keys(json.errors).length > 0) {
      console.log("API errors:", json.errors);
      return null;
    }

    return json.response?.[0] ?? null;
  } catch {
    return null;
  }
}

// Get league standings with league + season
export async function getLeagueStandings(leagueId: number, season: number) {
  const url = new URL(`${API_BASE_URL}/standings`);
  url.searchParams.set("league", leagueId.toString());
  url.searchParams.set("season", season.toString());

  const res = await fetch(url.toString(), {
    headers: API_HEADERS,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    apiError(`Failed to fetch standings (${res.status})`);
  }

  const json = await res.json();

  if (json?.errors && Object.keys(json.errors).length > 0) {
    const msg = JSON.stringify(json.errors).toLowerCase();

    if (msg.includes("limit") || msg.includes("request")) {
      apiError("Rate limit exceeded. Try again later.");
    }

    apiError("API error: " + JSON.stringify(json.errors));
  }

  const league = json.response?.[0]?.league ?? null;
  const standings = league?.standings?.[0] ?? [];

  return { league, standings };
}

// Get upcoming fixtures for a league with optional `next` count
export async function getLeagueFixtures(leagueId: number, season: number) {
  const url = new URL(`${API_BASE_URL}/fixtures`);
  url.searchParams.set("league", leagueId.toString());
  url.searchParams.set("season", season.toString());

  const res = await fetch(url.toString(), {
    headers: API_HEADERS,
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    apiError(`Failed to fetch fixtures (${res.status})`);
  }

  const json = await res.json();

  if (json?.errors && Object.keys(json.errors).length > 0) {
    const msg = JSON.stringify(json.errors).toLowerCase();

    if (msg.includes("limit") || msg.includes("request")) {
      apiError("Rate limit exceeded. Try again later.");
    }

    apiError("API error: " + JSON.stringify(json.errors));
  }

  return json.response ?? [];
}
