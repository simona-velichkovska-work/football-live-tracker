import { API_BASE_URL, API_HEADERS } from "./constants";

export async function getMatchesByDate(date: string) {
  try {
    const url = new URL(`${API_BASE_URL}/fixtures`);
    url.searchParams.set("date", date);

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

