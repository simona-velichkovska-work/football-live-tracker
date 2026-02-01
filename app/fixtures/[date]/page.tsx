import React, { Suspense } from 'react';
import MatchList from '@/components/match/MatchList';
import { getMatchesByDate } from '@/lib/api';
import { notFound } from 'next/navigation';
import DatePicker from '@/components/fixtures/FixturesDatePicker';
import LoadingFixturesPage from './loading';

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

// Generate metadata for the page
export async function generateMetadata({ params }: { params: { date: string } }) {
  const dateParams = await params;
  const formattedDate = new Date(dateParams.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  return {
    title: `Fixtures - ${formattedDate}`,
    description: `Football matches scheduled for ${formattedDate}`,
  };
}

export default async function FixturesPage({ params }: { params: { date: string } }) {
  const dateParams = await params;
  
  // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateParams.date)) {
    notFound();
  }

  // Fetch fixtures for the specified date
  let fixtures;
  try {
    fixtures = await getMatchesByDate(dateParams.date);
  } catch (error) { 
    console.error("Error fetching fixtures:", error);
    // Re-throw to trigger error.tsx
    throw new Error('Failed to fetch fixtures');
  }

  // Format the date for display
  const displayDate = new Date(dateParams.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Fixtures
              </h1>
              <p className="text-muted-foreground">{displayDate}</p>
              {fixtures.length > 0 && (
                <p className="text-sm text-muted-foreground mt-1">
                  {fixtures.length} match{fixtures.length !== 1 ? 'es' : ''} scheduled
                </p>
              )}
            </div>
            
            {/* Date Picker */}
            <DatePicker currentDate={dateParams.date} />
          </div>
        </div>
      </header>
            <Suspense fallback={<LoadingFixturesPage />}>
      {/* Matches */}
      <div className="container mx-auto px-4">
        <MatchList matches={fixtures} />
      </div>
        </Suspense>
    </div>
  );
}