'use client';

import { MatchStatus, STATUSES } from "@/lib/types";

interface StatusFilterProps {
  value: MatchStatus | 'all';
  onChange: (status: MatchStatus | 'all') => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div
      className="
        flex items-center gap-1
        rounded-lg bg-secondary p-1
        overflow-x-auto
        sm:overflow-visible
      "
    >
      {STATUSES.map((status) => {
        const isActive = value === status.value;

        return (
          <button
            key={status.value}
            onClick={() => onChange(status.value)}
            className={`
              flex items-center gap-1 whitespace-nowrap
              rounded-md font-medium transition-all duration-200

              px-3 py-1.5 text-xs
              sm:px-4 sm:py-2 sm:text-sm

              ${
                isActive
                  ? 'bg-[#1cca5b] text-black'
                  : 'text-[#7588a3]'
              }
            `}
          >
            {/* Pulse dot for live matches */}
            {status.value === 'live' && isActive && (
              <span className="inline-block w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
            )}
            {status.label}
          </button>
        );
      })}
    </div>
  );
}
