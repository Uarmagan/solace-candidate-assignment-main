'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';

const AdvocateResults = dynamic(() => import('@/components/advocate-results'), {
  suspense: true,
});

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Solace Advocates</h1>
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="search-input" className="text-sm font-medium">
            Search
          </label>
          <div className="flex gap-2">
            <input
              id="search-input"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Search by name, city, degree, specialty..."
              value={searchTerm}
              onChange={onChange}
            />
            {searchTerm && (
              <button
                className="px-4 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={resetSearch}
              >
                Clear
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-muted-foreground">
              Searching for:{' '}
              <span id="search-term" className="font-medium">
                {searchTerm}
              </span>
            </p>
          )}
        </div>
      </div>
      <Suspense
        fallback={<div className="text-center py-8">Loading results...</div>}
      >
        <AdvocateResults searchTerm={searchTerm} />
      </Suspense>
    </main>
  );
}
