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
    <main className='container mx-auto px-4 py-8'>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id='search-term'>{searchTerm}</span>
        </p>
        <input
          style={{ border: '1px solid black' }}
          value={searchTerm}
          onChange={onChange}
        />
        <button onClick={resetSearch}>Reset Search</button>
      </div>
      <br />
      <br />
      <Suspense fallback={<div>Loading results...</div>}>
        <AdvocateResults searchTerm={searchTerm} />
      </Suspense>
    </main>
  );
}
