//Client
"use client"

import React from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

const TeamSearch = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();  

  const handleSearch = (query: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
          params.set('query', query);
      } else {
          params.delete('query');
      }
      replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div>
        <input
          type="text"
          placeholder="Search teams..."
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {handleSearch(e.target.value)}}
          defaultValue={searchParams.get('query')?.toString()}
        />
    </div>
  )
}

export default TeamSearch

