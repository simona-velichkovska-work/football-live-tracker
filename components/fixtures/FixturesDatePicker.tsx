'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DatePickerProps {
  currentDate: string; // YYYY-MM-DD format
}

export default function DatePicker({ currentDate }: DatePickerProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    router.push(`/fixtures/${newDate}`);
  };

  const goToPreviousDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - 1);
    const prevDate = date.toISOString().split('T')[0];
    handleDateChange(prevDate);
  };

  const goToNextDay = () => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + 1);
    const nextDate = date.toISOString().split('T')[0];
    handleDateChange(nextDate);
  };

  const goToToday = () => {
    const today = new Date().toISOString().split('T')[0];
    handleDateChange(today);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Previous Day Button */}
      <button
        onClick={goToPreviousDay}
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Previous day"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Date Input */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => handleDateChange(e.target.value)}
        className="px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1cca5b] text-foreground"
      />

      {/* Today Button */}
      <button
        onClick={goToToday}
        className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-sm font-medium"
      >
        Today
      </button>

      {/* Next Day Button */}
      <button
        onClick={goToNextDay}
        className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
        aria-label="Next day"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}