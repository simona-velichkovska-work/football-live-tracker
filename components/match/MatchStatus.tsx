"use client";

import { Status } from "@/lib/types";
import Badge from "../ui/Badge";

export default function MatchStatus({
  status,
}: {status: Status;}) {
  const { short } = status;

  return (
    <Badge status={status} />
  );
}