import { API_BASE_URL, API_HEADERS } from "./constants";

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
    
    // Handle rate limiting
    if (res.status === 429) {
      console.warn("Rate limit exceeded");
      return null;
    }
    // Handle other non-OK responses
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
    console.log("Live Matches Response:", json);
    if (json.errors && Object.keys(json.errors).length > 0) {
      return null;
    }

    return json.response ?? [];

  } catch {
    return null;
  }
}