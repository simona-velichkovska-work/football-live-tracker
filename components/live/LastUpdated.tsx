"use client";

import { useEffect, useState } from "react";

type Props = {
  lastUpdated: Date | null;
};

export default function LastUpdated({ lastUpdated }: Props) {
  const [secondsAgo, setSecondsAgo] = useState<number | null>(null);

  useEffect(() => {
    if (!lastUpdated) {
      setSecondsAgo(null);
      return;
    }

    const timestamp = lastUpdated.getTime(); // capture once

    function update() {
      const diff = Math.floor((Date.now() - timestamp) / 1000);

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
