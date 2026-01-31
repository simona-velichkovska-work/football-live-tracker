export const API_BASE_URL = "https://v3.football.api-sports.io";
export const API_HEADERS = { "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY as string};
export const REVALIDATE_HOME_PAGE_SECONDS = 300;