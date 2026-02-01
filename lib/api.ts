import { API_BASE_URL, getApiHeaders } from "./constants";

// Helper to handle API errors
function apiError(message: string): never {
  const error = new Error(message);
  (error as any).digest = message;
  throw error;
}

// Get All fixtures/matches for a specific date
export async function getFixturesByDate(date: string) {
  const url = new URL(`${API_BASE_URL}/fixtures`);
  url.searchParams.set("date", date);

  const res = await fetch(url.toString(), {
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    apiError(`Failed to fetch matches (${res.status})`);
  }

  const json = await res.json();

  if (json?.errors && Object.keys(json.errors).length > 0) {
    const msg = JSON.stringify(json.errors).toLowerCase();

    if (msg.includes("limit") || msg.includes("request")) {
      apiError("Rate limit exceeded. Try again later.");
    }

    if(msg.includes("plan") || msg.includes("free")){
      apiError(JSON.stringify(json.errors.plan));
    }

    apiError("Oops, there's some error from the API. Please try again later.");
  }

  return json.response ?? [];
}

// Get all live matches
export async function getLiveMatches() {
  const url = new URL(`${API_BASE_URL}/fixtures`);
  url.searchParams.set("live", "all");

  const res = await fetch(url.toString(), {
    headers: getApiHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    apiError(`Failed to fetch live matches (${res.status})`);
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

// Get a match by its ID
export async function getMatchById(id: number) {
  const url = new URL(`${API_BASE_URL}/fixtures`);
  url.searchParams.set("id", id.toString());

  const res = await fetch(url.toString(), {
    headers: getApiHeaders(),
  });

  if (!res.ok) {
    apiError(`Failed to fetch match (${res.status})`);
  }

  const json = await res.json();

  if (json?.errors && Object.keys(json.errors).length > 0) {
    const msg = JSON.stringify(json.errors).toLowerCase();

    if (msg.includes("limit") || msg.includes("request")) {
      apiError("Rate limit exceeded. Try again later.");
    }

    apiError("API error: " + JSON.stringify(json.errors));
  }

  return json.response?.[0] ?? null;
}


// Get league standings with league + season
export async function getLeagueStandings(leagueId: number, season: number) {
  const url = new URL(`${API_BASE_URL}/standings`);
  url.searchParams.set("league", leagueId.toString());
  url.searchParams.set("season", season.toString());

  const res = await fetch(url.toString(), {
    headers: getApiHeaders(),
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
    headers: getApiHeaders(),
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