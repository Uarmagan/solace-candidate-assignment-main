'use client';

import dynamic from 'next/dynamic';
import {
  Suspense,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Advocate } from '@/types/advocate';

const AdvocateResults = dynamic(() => import('./advocate-results'), {
  suspense: true,
});

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    console.log('fetching advocates...');
    fetch('/api/advocates').then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const resetSearch = () => {
    setSearchTerm('');
  };

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredAdvocates = useMemo(() => {
    console.log('filtering advocates...');
    const searchLower = deferredSearchTerm.toLowerCase();

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower)
        ) ||
        advocate.yearsOfExperience.toString().includes(deferredSearchTerm) ||
        advocate.phoneNumber.toString().includes(deferredSearchTerm)
      );
    });
  }, [advocates, deferredSearchTerm]);

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
        <AdvocateResults advocates={filteredAdvocates} />
      </Suspense>
    </main>
  );
}
