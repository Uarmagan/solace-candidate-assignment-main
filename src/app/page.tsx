'use client';

import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Solace Advocates</h1>
        <ThemeToggle />
      </div>
      <div className="mb-8 space-y-4">
        <div className="space-y-2">
          <label htmlFor="search-input" className="text-sm font-medium">
            Search
          </label>
          <div className="flex gap-2">
            <Input
              id="search-input"
              placeholder="Search by name, city, degree, specialty..."
              value={searchTerm}
              onChange={onChange}
            />
            {searchTerm && (
              <Button variant="outline" onClick={resetSearch}>
                Clear
              </Button>
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
