"use client";

import { Status } from "@/lib/types";
import Badge from "../ui/Badge";

type Props = {
  status: Status;
};

export default function MatchStatus({ status }: Props) {
  const { short, elapsed, extra } = status;

  let label = short;

  // Live minutes
  if (["LIVE", "1H", "2H", "ET", "P"].includes(short)) {
    if (typeof elapsed === "number") {
      label = `${elapsed}${typeof extra === "number" ? `+${extra}` : ""}'`;
    } else {
      label = "LIVE";
    }
  }

  // Half time
  if (short === "HT") label = "HT";

  // Finished
  if (["FT", "AET", "PEN"].includes(short)) label = "FT";

  // Not started
  if (short === "NS") label = "Upcoming";

  return <Badge status={status} label={label} />;
}
