import Spinner from '@/components/ui/Spinner'
import React from 'react'

const LoadingFixturesPage = () => {
  return (
    <div className="min-h-screen flex justify-center">
      <Spinner label="Loading fixtures..." />
    </div>
  )
}

export default LoadingFixturesPage