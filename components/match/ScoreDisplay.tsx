"use client";

import { useEffect, useState } from "react";

export default function ScoreDisplay({
  home,
  away,
}:{
    home: number | null;
    away: number | null;
}){
  const [highlight, setHighlight] = useState(false);
  const score = `${home ?? "-"} : ${away ?? "-"}`;

  useEffect(() => {
    setHighlight(true);
    const timeout = setTimeout(() => setHighlight(false), 600);
    return () => clearTimeout(timeout);
  }, [home, away]);

  return (
    <span
      className={`text-lg font-semibold transition-colors ${
        highlight ? "text-green-600" : "text-gray-300"
      }`}
    >
      {score}
    </span>
  );
}