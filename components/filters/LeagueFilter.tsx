//Client
"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { League } from '@/lib/types';

const LeagueFilter = ({ availableLeagues }: { availableLeagues: League[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLeagues = searchParams.get('leagues')?.split(',').filter(Boolean) || [];

  const handleLeagueToggle = (leagueId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    let updatedLeagues: string[];
    
    if (currentLeagues.includes(leagueId)) {
      updatedLeagues = currentLeagues.filter(id => id !== leagueId);
    } else {
      updatedLeagues = [...currentLeagues, leagueId];
    }
    
    if (updatedLeagues.length === 0) {
      params.delete('leagues');
    } else {
      params.set('leagues', updatedLeagues.join(','));
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (availableLeagues.length === 0) return null;

  const selectedCount = currentLeagues.length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-background text-foreground flex items-center gap-2 min-w-35 justify-between"
      >
        <span className="text-sm">
          {selectedCount === 0 
            ? 'All Leagues' 
            : `${selectedCount} League${selectedCount > 1 ? 's' : ''}`
          }
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-64 bg-background border border-gray-300 rounded-md shadow-lg max-h-80 overflow-y-auto">
          {/* Clear All Option */}
          {selectedCount > 0 && (
            <>
              <button
                onClick={() => {
                  const params = new URLSearchParams(searchParams.toString());
                  params.delete('leagues');
                  replace(`${pathname}?${params.toString()}`);
                }}
                className="w-full px-4 py-2 text-left text-sm text-[#1cca5b] hover:bg-secondary/50 border-b border-gray-200"
              >
                Clear All
              </button>
            </>
          )}

          {/* League Options */}
          {availableLeagues.map((league) => {
            const isSelected = currentLeagues.includes(league.id);
            
            return (
              <button
                key={league.id}
                onClick={() => handleLeagueToggle(league.id)}
                className="w-full px-4 py-2.5 text-left hover:bg-secondary/50 flex items-center gap-3 transition-colors"
              >
                {/* Checkbox */}
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                  isSelected 
                    ? 'bg-[#1cca5b] border-[#1cca5b]' 
                    : 'border-gray-300'
                }`}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>

                {/* League Logo */}
                {league.logo && (
                  <img 
                    src={league.logo} 
                    alt={league.name} 
                    className="w-5 h-5 object-contain shrink-0" 
                  />
                )}

                {/* League Name */}
                <span className={`text-sm ${isSelected ? 'font-medium text-foreground' : 'text-[#7588a3]'}`}>
                  {league.name}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeagueFilter;