import TeamLogo from "../match/TeamLogo";

// components/league/StandingsRow.tsx
interface StandingsRowProps {
  team: {
    rank: number;
    team: { id: number; name: string; logo: string };
    points: number;
    goalsDiff: number;
    all: { played: number; win: number; draw: number; lose: number };
  };
}

export default function StandingsRow({ team }: StandingsRowProps) {
  return (
    <tr className="border-b border-cyan-900 transition-colors hover:bg-muted/50">
      <td className="p-4 text-center font-medium w-10">{team.rank}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <TeamLogo name={team.team.name} logo={team.team.logo} size={24} />
          <span className="font-medium truncate">{team.team.name}</span>
        </div>
      </td>
      <td className="p-4 text-center text-[#818898] w-10">{team.all.played}</td>
      <td className="p-4 text-center text-[#1acb6a] font-medium w-10">
        {team.all.win}
      </td>
      <td className="p-4 text-center text-[#818898] w-10">{team.all.draw}</td>
      <td className="p-4 text-center text-[#dc2828] w-10">{team.all.lose}</td>
      <td className="p-4 text-center text-[#818898] w-10">
        {team.goalsDiff > 0 ? `+${team.goalsDiff}` : team.goalsDiff}
      </td>
      <td className="p-4 text-center font-bold w-12">{team.points}</td>
    </tr>
  );
}
