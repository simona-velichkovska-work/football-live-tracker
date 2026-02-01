// components/match/detail/MatchDetailHeader.tsx
import Image from "next/image";
import { Fixture } from "@/lib/types";
import { Calendar, MapPin } from "lucide-react";

type MatchDetailHeaderProps = {
  fixture: Fixture;
  league: {
    name: string;
    logo: string;
    round?: string;
  };
  teams: {
    home: { name: string; logo: string };
    away: { name: string; logo: string };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
};

export default function MatchDetailHeader({
  fixture,
  league,
  teams,
  goals,
}: MatchDetailHeaderProps) {
  const matchDate = new Date(fixture.date);

  return (
    <div className="match-card rounded-xl p-6 space-y-6">
      {/* League + round */}
      <div className="flex items-center justify-center gap-3 text-muted-foreground">
        <Image
          src={league.logo}
          alt={league.name}
          width={24}
          height={24}
          className="object-contain"
        />
        <span className="text-sm font-medium">{league.name}</span>
        {league.round && (
          <>
            <span className="text-muted-foreground/50">•</span>
            <span className="text-sm">{league.round}</span>
          </>
        )}
      </div>

      {/* Teams + score */}
      <div className="flex items-center justify-between gap-4">
        {/* Home */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-secondary/50 p-3 flex items-center justify-center">
            <Image
              src={teams.home.logo}
              alt={teams.home.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-center leading-tight">
            {teams.home.name}
          </span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="text-5xl font-extrabold tabular-nums">
              {goals.home ?? "-"}
            </span>
            <span className="text-2xl text-muted-foreground">-</span>
            <span className="text-5xl font-extrabold tabular-nums">
              {goals.away ?? "-"}
            </span>
          </div>

          {/* Match time / status */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-xs font-semibold">
              {fixture.status.elapsed
                ? `${fixture.status.elapsed}'`
                : fixture.status.short}
            </span>
          </div>
        </div>

        {/* Away */}
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-secondary/50 p-3 flex items-center justify-center">
            <Image
              src={teams.away.logo}
              alt={teams.away.name}
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="text-lg font-semibold text-center leading-tight">
            {teams.away.name}
          </span>
        </div>
      </div>

      {/* Date + venue */}
      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>
            {matchDate.toLocaleDateString(undefined, {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>

        {fixture.venue?.name && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{fixture.venue.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
