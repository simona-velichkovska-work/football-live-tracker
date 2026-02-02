// components/filters/StatusFilter.tsx
"use client";

import { MatchStatus, STATUSES } from "@/lib/types";

interface StatusFilterProps {
  value: MatchStatus | "all";
  onChange: (status: MatchStatus | "all") => void;
}

export default function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <div className="rounded-lg bg-secondary p-1">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-1">
        {STATUSES.map((status) => {
          const isActive = value === status.value;

          return (
            <button
              type="button"
              key={status.value}
              onClick={() => onChange(status.value)}
              className={`
                flex items-center gap-2 rounded-md font-medium transition-all
                px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm
                w-full justify-center sm:w-auto sm:justify-start
                ${isActive ? "bg-[#1cca5b] text-black" : "text-[#7588a3]"}
              `}
            >
              {status.value === "live" && isActive && (
                <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse" />
              )}
              {status.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
