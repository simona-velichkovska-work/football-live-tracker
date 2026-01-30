import React from 'react';

export default function EmptyState({
  title = "No matches found",
  message = "Try adjusting your filters or check back later for upcoming matches.",
  icon
}: { title?: string;
  message?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="mb-6 text-6xl opacity-50">
        {icon || "⚽"}
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>

      {/* Message */}
      <p className="text-sm text-muted-foreground text-center max-w-md">
        {message}
      </p>
    </div>
  );
}