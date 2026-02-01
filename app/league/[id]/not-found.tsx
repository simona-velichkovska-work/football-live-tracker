// app/league/[id]/not-found.tsx
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <EmptyState
        title="League not found"
        message="The league you're looking for doesn't exist, is unavailable, or you may have followed an outdated link."
        icon="🏆"
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
