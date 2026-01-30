// MatchCardSkeleton.tsx (Client Component)
"use client";

export default function MatchCardSkeleton() {
  return (
    <div className="block max-w-md rounded-xl overflow-hidden border border-gray-700 bg-gray-800 shadow-md animate-pulse">
      {/* League */}
      <div className="flex items-center gap-2 p-3 border-b border-gray-700">
        <div className="w-7 h-7 bg-gray-600 rounded-full" /> {/* League logo placeholder */}
        <div className="h-4 w-24 bg-gray-600 rounded-md" /> {/* League name placeholder */}
      </div>

      {/* Match Header (teams, score, status) */}
      <div className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          {/* Team 1 */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-600 rounded-full" /> {/* Team logo */}
            <div className="h-4 w-16 bg-gray-600 rounded-md" /> {/* Team name */}
          </div>

          {/* Score */}
          <div className="h-4 w-8 bg-gray-600 rounded-md" /> {/* Score placeholder */}
          
          {/* Team 2 */}
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-600 rounded-md" /> {/* Team name */}
            <div className="w-8 h-8 bg-gray-600 rounded-full" /> {/* Team logo */}
          </div>
        </div>

        {/* Status placeholder */}
        <div className="h-3 w-20 bg-gray-600 rounded-md" />
      </div>

      {/* Date */}
      <div className="px-4 pb-3">
        <div className="h-3 w-28 bg-gray-600 rounded-md" />
      </div>
    </div>
  );
}
