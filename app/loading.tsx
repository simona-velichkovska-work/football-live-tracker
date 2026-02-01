import Spinner from "@/components/ui/Spinner";
import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen flex justify-center">
      <Spinner label="Loading today's matches..." />
    </div>
  );
};
