// components/match/detail/lineups/LineupDisplay.tsx

import { TeamLineup } from "@/lib/types";
import PlayerRow from "./PlayerRow";

type LineupDisplayProps = {
  lineups: TeamLineup[];
};

export default function LineupDisplay({ lineups }: LineupDisplayProps) {
  if (lineups.length === 0) return null;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {lineups.map((lineup) => {
        const { team, formation, startXI, substitutes, coach } = lineup;

        return (
          <div key={team.id} className="space-y-4">
            {/* TEAM HEADER */}
            <div className="flex items-center gap-3">
              <img
                src={team.logo}
                alt={team.name}
                className="w-8 h-8 object-contain"
              />
              <div>
                <div className="font-semibold text-foreground">
                  {team.name}
                </div>
                {formation && (
                  <div className="text-sm text-muted-foreground">
                    Formation: {formation}
                  </div>
                )}
              </div>
            </div>

            {/* COACH */}
            {coach && (
              <div className="flex items-center gap-3 px-3 py-2 bg-[#272c35]/30 rounded-lg">
                {coach.photo && (
                  <img
                    src={coach.photo}
                    alt={coach.name ?? "Coach"}
                    className="w-10 h-10 rounded-full object-cover bg-[#272c35]"
                  />
                )}
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">
                    Manager
                  </div>
                  <div className="font-medium text-foreground">
                    {coach.name}
                  </div>
                </div>
              </div>
            )}

            {/* STARTING XI */}
            <div className="space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                Starting XI
              </div>

              <div className="match-card rounded-xl divide-y divide-border overflow-hidden">
                {startXI.map(({ player }, index) => (
                  <PlayerRow
                    key={player.id}
                    player={player}
                    fallbackNumber={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* SUBSTITUTES */}
            {substitutes.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                  Substitutes
                </div>

                <div className="match-card rounded-xl divide-y divide-border overflow-hidden">
                  {substitutes.map(({ player }, index) => (
                    <PlayerRow
                      key={player.id}
                      player={player}
                      fallbackNumber={index + 12}
                      dimmed
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
