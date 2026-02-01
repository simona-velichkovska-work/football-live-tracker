// Football API constants
export const API_BASE_URL = "https://v3.football.api-sports.io";
export const getApiHeaders = () => ({ "x-apisports-key": process.env.FOOTBALL_API_KEY as string });

// Hardcoded values for leagues, teams, etc.
export const STANDINGS_FIXTURES_SEASON = 2024; //Free plans have access only to seasons from 2022 to 2024.
