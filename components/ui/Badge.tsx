// components/ui/Badge.tsx

import { Status } from "@/lib/types";
import { stat } from "fs";

export default function Badge({ status }: { status: Status }) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold uppercase";

  // Helper function to determine status category and styling
  const getStatusClasses = (status: Status): string => {

    //Turn status into uppercase for easier comparison
    const statusShort = status.short;
    // Live/In-Play statuses (green, pulsing)
    if (["LIVE", "1H", "2H", "ET", "P"].includes(statusShort)) {
      return "bg-[#1cca5b] text-black animate-pulse";
    }
    
    // Half-time/Break statuses (yellow)
    if (["HT", "BT"].includes(statusShort)) {
      return "bg-yellow-500 text-black";
    }
    
    // Suspended/Interrupted statuses (orange)
    if (["SUSP", "INT"].includes(statusShort)) {
      return "bg-orange-500 text-white";
    }
    
    // Finished statuses (dark gray)
    if (["FT", "AET", "PEN"].includes(statusShort)) {
      return "bg-gray-600 text-white";
    }
    
    // Postponed/Cancelled/Abandoned statuses (red)
    if (["PST", "CANC", "ABD"].includes(statusShort)) {
      return "bg-red-600 text-white";
    }
    
    // Not Played statuses (purple)
    if (["AWD", "WO"].includes(statusShort)) {
      return "bg-purple-600 text-white";
    }
    
    // Scheduled/TBD/Not Started (default gray)
    return "bg-gray-500 text-gray-300";
  };

  // Add pulsing dot for live matches
  const isLive = ["LIVE", "1H", "2H", "ET", "P"].includes(status.short);

  return (
    <span className={`${baseClasses} ${getStatusClasses(status)}`}>
      {isLive && (
        <span className="relative flex h-2 w-2 mr-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-black"></span>
        </span>
      )}
      {status.long}
    </span>
  );
}