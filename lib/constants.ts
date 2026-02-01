// Football API constants
export const API_BASE_URL = "https://v3.football.api-sports.io";
export const API_HEADERS = { "x-apisports-key": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY as string};

// Revalidation intervals (in seconds)
export const REVALIDATE_HOME_PAGE_SECONDS = 300; // Should be 60 seconds in production
export const REVALIDATE_PAGE_SECONDS_PRIMARY = 3600; // Primary value for page revalidation for most pages