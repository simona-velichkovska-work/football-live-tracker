"use client";
import React from 'react';
import LiveMatchList from '@/components/live/LiveMatchList';

export default function LivePage() {
  return (
    <div className="min-h-screen bg-background container mx-auto px-4 py-6">
      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-foreground">
            Today&apos;s Matches
          </h1>
          <p className="text-sm text-muted-foreground">Live scores and updates</p>
        </div>
      </header>
    <LiveMatchList/>
    </div>
  )
}