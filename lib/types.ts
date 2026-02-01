// types.ts

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface League {
  id: number;
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
  venue?: Venue | null;
}

export interface Venue {
  id: number | null;
  name: string | null;
  city: string | null;
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
    elapsed: number | null,
    extra: number | null,
}

// Event type for match events
export type MatchEvent = {
  time: {
    elapsed: number | null;
    extra: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number | null;
    name: string | null;
  };
  assist: {
    id: number | null;
    name: string | null;
  } | null;
  type: string;   // "Goal", "Card", "subst", etc.
  detail: string; // "Yellow Card", "Substitution 1", etc.
  comments: string | null;
};

export type LineupPlayer = {
  player: {
    id: number;
    name: string;
    number: number | null;
    pos: "G" | "D" | "M" | "F";
    grid: string | null; // e.g. "2:4"
  };
};


export type TeamLineup = {
  team: {
    id: number;
    name: string;
    logo: string;
    colors?: {
      player: {
        primary: string;
        number: string;
        border: string;
      };
      goalkeeper: {
        primary: string;
        number: string;
        border: string;
      };
    };
  };
  formation: string | null;
  startXI: LineupPlayer[];
  substitutes: LineupPlayer[];
  coach?: {
    id: number;
    name: string | null;
    photo: string | null;
  };
};

export type StatisticItem = {
  type: string; // "Shots on Goal", "Ball Possession", etc.
  value: number | string | null;
};


// Statistic type for match statistics
export type MatchStatistic = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: StatisticItem[];
};



