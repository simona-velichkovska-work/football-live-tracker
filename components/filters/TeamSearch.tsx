// components/filters/TeamSearch.tsx
"use client";

import React, { useEffect, useState } from "react";

type TeamSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function TeamSearch({ value, onChange }: TeamSearchProps) {
  const [localValue, setLocalValue] = useState(value);

  // 🔑 Keep local input in sync with parent state
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce updates to parent
  useEffect(() => {
    const id = setTimeout(() => {
      onChange(localValue);
    }, 300);

    return () => clearTimeout(id);
  }, [localValue, onChange]);

  return (
    <input
      type="text"
      placeholder="Search teams..."
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
