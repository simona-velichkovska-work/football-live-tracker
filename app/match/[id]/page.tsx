import { REVALIDATE_PAGE_SECONDS_PRIMARY } from '@/lib/constants';
import React from 'react';
import { getMatchById } from '@/lib/api';
import MatchTabs from '@/components/match/detail/MatchTabs';
import MatchDetailHeader from '@/components/match/detail/MatchDetailHeader';
import Link from 'next/link';

// Enable ISR - revalidate every 60 seconds
export const revalidate = REVALIDATE_PAGE_SECONDS_PRIMARY;

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const idParams = await params;


  let match;
  try {
    match = await getMatchById(parseInt(idParams.id));
    console.log("Fetched match data:", match.fixture);
  } catch (error) {
    console.error("Error fetching matches:", error);
    match = null; // Return empty array instead of null
  }
  

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/" // Adjust this route to your matches list
          className="inline-block mb-4 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-100 rounded-lg shadow-sm transition-colors"
        >
          ← Back to Matches
        </Link>
      </div>

      {/* Page Header */}
      <header className="pt-4 pb-8 shadow-md">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Match Details
          </h1>
        </div>
      </header>

      {/* Match Detail Section */}
      <main className="container mx-auto px-4 mt-8">
        {/* Card-like container for header */}
        <div className="bg-gray-800 shadow-lg rounded-xl p-6">
          <MatchDetailHeader
            fixture={match?.fixture}
            league={match?.league}
            teams={match?.teams}
            goals={match?.goals}
          />
        </div>

        {/* Tabs */}
        <div className="mt-10 bg-gray-800 shadow-lg rounded-xl p-6">
          <MatchTabs
            events={match?.events || []}
            lineups={match?.lineups || []}
            statistics={match?.statistics || []}
          />
        </div>
      </main>
    </div>
  )
}