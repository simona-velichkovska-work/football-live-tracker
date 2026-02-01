// app/live/not-found.tsx
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
      <div className="max-w-4xl mx-auto px-4 py-16">
        <EmptyState
          title="Live matches not found"
          message="There's no live matches available right now. Please check back later."
          icon="⚽"
        />

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="rounded-lg bg-[#1cca5b] px-4 py-2 text-sm font-medium text-[#2b303b] hover:opacity-90 transition"
          >
            Back to home
          </Link>
        </div>
      </div>
  );
}
