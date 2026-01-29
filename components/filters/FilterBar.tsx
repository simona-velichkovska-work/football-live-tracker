//Client
"use client"
import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import TeamSearch from './TeamSearch';
import StatusFilter from './StatusFilter';
import LeagueFilter from './LeagueFilter';
import { League, MatchStatus } from '@/lib/types';

const FilterBar = ({ availableLeagues }: { availableLeagues: League[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const currentStatus = (searchParams.get('status') as MatchStatus) || 'all';
  const handleStatusChange = (newStatus: MatchStatus | 'all') => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newStatus === 'all') {
      params.delete('status');
    } else {
      params.set('status', newStatus);
    }
    
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="glass-effect py-4 mb-6 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <StatusFilter value={currentStatus} onChange={handleStatusChange} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:ml-auto">
            <LeagueFilter availableLeagues={availableLeagues} />
            <TeamSearch />
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterBar