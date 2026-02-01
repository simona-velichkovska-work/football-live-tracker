// components/filters/LeagueFilter.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { League } from "@/lib/types";

type LeagueFilterProps = {
  availableLeagues: League[];
  value: string[];
  onChange: (leagues: string[]) => void;
};

export default function LeagueFilter({
  availableLeagues,
  value,
  onChange,
}: LeagueFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLeagueToggle = (leagueId: string) => {
    if (value.includes(leagueId)) {
      onChange(value.filter((id) => id !== leagueId));
    } else {
      onChange([...value, leagueId]);
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (availableLeagues.length === 0) return null;

  const selectedCount = value.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="px-4 py-2 border border-gray-300 rounded-md bg-background text-foreground flex items-center gap-2 min-w-35 justify-between"
      >
        <span className="text-sm">
          {selectedCount === 0
            ? "All Leagues"
            : `${selectedCount} League${selectedCount > 1 ? "s" : ""}`}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-background border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* Clear All */}
          {selectedCount > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full px-4 py-2 text-left text-sm text-[#1cca5b] hover:bg-secondary/50 border-b border-gray-200"
            >
              Clear All
            </button>
          )}

          {availableLeagues.map((league) => {
            const id = league.id.toString();
            const isSelected = value.includes(id);

            return (
              <button
                type="button"
                key={league.id}
                onClick={() => handleLeagueToggle(id)}
                className="w-full px-4 py-2.5 text-left hover:bg-secondary/50 flex items-center gap-3"
              >
                {/* Checkbox */}
                <div
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    isSelected
                      ? "bg-[#1cca5b] border-[#1cca5b]"
                      : "border-gray-300"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-black"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>

                {league.logo && (
                  <img
                    src={league.logo}
                    alt={league.name}
                    className="w-5 h-5 object-contain"
                  />
                )}

                <span
                  className={`text-sm ${
                    isSelected
                      ? "font-medium text-foreground"
                      : "text-[#7588a3]"
                  }`}
                >
                  {league.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
