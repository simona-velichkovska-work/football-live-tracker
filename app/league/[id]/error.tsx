// app/league/[id]/error.tsx
"use client";

import React from "react";
import Link from "next/link";

export default function LeagueError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center rounded-xl bg-[#1d222a] border border-gray-800 p-8 space-y-6">
        {/* Icon */}
        <div className="text-5xl opacity-50">⚠️</div>

        {/* Title */}
        <h2 className="text-xl font-semibold text-white">
          Something went wrong
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-400 max-w-md">
          {(error.cause as string) ||
            "Something went wrong. Please try again later."}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => reset()}
            className="px-4 py-2 rounded-lg bg-[#1cca5b] text-[#2b303b] font-medium hover:opacity-90 transition"
          >
            Try again
          </button>

          <Link
            href="/"
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-800 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
