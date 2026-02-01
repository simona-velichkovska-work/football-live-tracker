import React from "react";

export default function MatchDetailSkeleton() {
  return (
    <div className=" text-gray-100 animate-pulse">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <div className="mb-4 h-10 w-40 rounded-lg bg-gray-800/80" />
      </div>

      {/* Page Header */}
      <header className="pt-4 pb-8 shadow-md">
        <div className="container mx-auto text-center px-4">
          <div className="mx-auto h-10 w-64 rounded-md bg-gray-800/80" />
        </div>
      </header>

      <main className="container mx-auto px-4 mt-8 space-y-10">
        {/* Match Header Card */}
        <div className="bg-gray-800 shadow-lg rounded-xl p-6">
          <div className="rounded-xl p-6 space-y-6">
            {/* League Row */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-6 w-6 rounded bg-gray-700/60" />
              <div className="h-4 w-28 rounded bg-gray-700/60" />
              <div className="h-4 w-20 rounded bg-gray-700/60" />
            </div>

            {/* Teams + Score */}
            <div className="flex items-center justify-between gap-4">
              {/* Home */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gray-700/30 p-3 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-700/60" />
                </div>

                <div className="h-5 w-32 rounded bg-gray-700/60" />
              </div>

              {/* Score */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-10 rounded-lg bg-gray-700/60" />
                  <div className="h-6 w-4 rounded bg-gray-700/50" />
                  <div className="h-12 w-10 rounded-lg bg-gray-700/60" />
                </div>

                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-700/30">
                  <div className="h-2 w-2 rounded-full bg-gray-600" />
                  <div className="h-3 w-12 rounded bg-gray-700/60" />
                </div>
              </div>

              {/* Away */}
              <div className="flex-1 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-gray-700/30 p-3 flex items-center justify-center">
                  <div className="h-12 w-12 rounded-full bg-gray-700/60" />
                </div>

                <div className="h-5 w-32 rounded bg-gray-700/60" />
              </div>
            </div>

            {/* Date + Venue */}
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-700/60" />
                <div className="h-4 w-24 rounded bg-gray-700/60" />
              </div>

              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-gray-700/60" />
                <div className="h-4 w-40 rounded bg-gray-700/60" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs + Content */}
        <div className="bg-gray-800 shadow-lg rounded-xl p-6">
          {/* Tabs */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-24 rounded-full bg-gray-700/50" />
            <div className="h-9 w-24 rounded-full bg-gray-700/50" />
            <div className="h-9 w-24 rounded-full bg-gray-700/50" />
          </div>

          {/* Content Rows */}
          <div className="mt-6 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-4 w-12 rounded bg-gray-700/60" />
                <div className="h-4 w-6 rounded bg-gray-700/60" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-gray-700/60" />
                  <div className="h-3 w-32 rounded bg-gray-700/40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-10" />
      </main>
    </div>
  );
}
