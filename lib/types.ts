// types.ts

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface League {
  id: string;
  name: string;
  logo: string;
}

export interface Fixture {
  id: number;
  date: string;
  referee?: string | null;
  timezone?: string;
  timestamp?: number;
  status: Status;
}

export interface Goals {
  home: number | null;
  away: number | null;
}

export interface Score {
  halftime: { home: number | null; away: number | null };
  fulltime: { home: number | null; away: number | null };
  extratime?: { home: number | null; away: number | null };
  penalty?: { home: number | null; away: number | null };
}

export interface Match {
  fixture: Fixture;
  league: League;
  teams: { home: Team; away: Team };
  goals: Goals;
  score: Score;
}

export interface TeamLogo {
  logo: string;
  name: string;
  size?: number; // optional, default 40px
}

export type MatchStatus = 'live' | 'finished' | 'upcoming' | 'postponed' | 'cancelled';

export type StatusFilterValue = MatchStatus | 'all';

export const STATUSES: { value: StatusFilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'live', label: 'Live' },
  { value: 'finished', label: 'Finished' },
  { value: 'postponed', label: 'Postponed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export const STATUS_MAP: Record<MatchStatus, string[]> = {
  upcoming: ['TBD', 'NS'],
  live: ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE'],
  finished: ['FT', 'AET', 'PEN'],
  postponed: ['PST', 'ABD'], // Abandoned matches might be rescheduled
  cancelled: ['CANC', 'AWD', 'WO'], // Cancelled or technical outcomes
};

export interface Status { 
    long: string, 
    short: string, 
    elapsed: number, 
    extra: number 
}
