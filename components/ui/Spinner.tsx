"use client";

export default function Spinner({label}: {label?: string}) {
  return (
    <div className="flex justify-center items-center">
      <div className="h-12 w-12 rounded-full border-2 border-[#1cca5b] border-t-transparent animate-spin" />
      {label && <span className="ml-2 text-gray-300 text-lg">{label}</span>}
    </div>
  );
}
