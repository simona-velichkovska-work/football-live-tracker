import React from "react";
import StandingsTableSkeleton from "@/components/skeletons/StandingsTableSkeleton";

const LeagueLoading = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6 animate-pulse">
      {/* Back link placeholder */}
      <div className="h-4 w-32 rounded bg-gray-700" />

      {/* League header placeholder */}
      <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1d222a] border border-gray-800">
        <div className="w-12 h-12 rounded-full bg-gray-700" />
        <div className="space-y-2">
          <div className="h-4 w-40 bg-gray-700 rounded" />
          <div className="h-3 w-28 bg-gray-700 rounded" />
        </div>
      </div>

      {/* Tabs placeholder */}
      <div className="grid grid-cols-2 gap-2">
        <div className="h-10 bg-gray-700 rounded-lg" />
        <div className="h-10 bg-gray-700 rounded-lg" />
      </div>

      {/* Content placeholder */}
      <StandingsTableSkeleton />
    </div>
  );
};

export default LeagueLoading;
