"use client";

import Link from "next/link";

export default function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center justify-center text-center rounded-xl bg-[#1d222a] border border-gray-800 p-8 space-y-6">
        <div className="text-5xl opacity-50">⚠️</div>
        <h2 className="text-xl font-semibold text-white">Something went wrong</h2>
        <p className="text-sm text-gray-400 max-w-md">{message}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.location.reload()}
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