"use client";

import { useEffect, useState } from "react";

export default function LastUpdated({ lastUpdated }: {lastUpdated: Date;}) {
  const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

  useEffect(() => {
    if (!lastUpdated) return;

    function update() {
      const diff =
        Math.floor((Date.now() - lastUpdated.getTime()) / 1000);
      setSecondsAgo(diff);
    }

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  if (!lastUpdated || secondsAgo === null) return null;

  return (
    <span className="text-xs text-gray-500">
      Updated {secondsAgo} second{secondsAgo === 1 ? "" : "s"} ago
    </span>
  );
}
