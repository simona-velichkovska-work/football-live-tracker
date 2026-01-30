import React from 'react'
import { getLiveMatches } from '@/lib/api';
import { Match } from '@/lib/types';
import LiveMatchList from '@/components/live/LiveMatchList';

export default async function LivePage() {

  return (
    <LiveMatchList/>
  )
}