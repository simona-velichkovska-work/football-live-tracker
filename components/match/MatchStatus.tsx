"use client";

export default function MatchStatus({
  short,
  elapsed,
}: {short: string;
  elapsed: number | null;}) {
  let label = short;

  if (short === "1H" || short === "2H") {
    label = `${elapsed ?? ""}'`;
  }

  return (
    <span className="text-xs font-medium text-gray-500">
      {label}
    </span>
  );
}