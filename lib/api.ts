import { API_BASE_URL, API_HEADERS } from "./constants";

export async function getMatchesByDate(date: string) {
  try {
    const url = new URL(`${API_BASE_URL}/fixtures`);
    url.searchParams.set("date", date);

    const res = await fetch(url.toString(), {
      headers: API_HEADERS,
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    if (json.errors && Object.keys(json.errors).length > 0) {
      console.log("API errors:", json.errors.requests);
      return null;
    }

    return json.response ?? [];
  } catch {
    return null;
  }
}

