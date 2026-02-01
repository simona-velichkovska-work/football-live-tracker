// components/league/StandingsTable.tsx
import StandingsRow from "./StandingsRow";

interface StandingsTableProps {
  standings: Array<{
    rank: number;
    team: { id: number; name: string; logo: string };
    points: number;
    goalsDiff: number;
    all: { played: number; win: number; draw: number; lose: number };
  }>;
}

export default function StandingsTable({ standings }: StandingsTableProps) {
  return (
    <div className="rounded-lg bg-[#1d222a] text-card-foreground">
      {/* Table */}
      <div className="p-6 pt-0 px-0 pb-0">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead>
              <tr className="border-b border-cyan-700 transition-colors hover:bg-transparent">
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  #
                </th>
                <th className="h-12 px-4 text-left font-medium text-muted-foreground">
                  Team
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  P
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  W
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  D
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  L
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-10">
                  GD
                </th>
                <th className="h-12 px-4 text-center font-medium text-muted-foreground w-12">
                  Pts
                </th>
              </tr>
            </thead>
            <tbody className="[&>tr:last-child]:border-0">
              {standings.map((team) => (
                <StandingsRow key={team.team.id} team={team} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
