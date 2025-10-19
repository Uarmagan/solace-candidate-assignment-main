'use client';

import { ReactNode, useDeferredValue, useMemo } from 'react';
import { useAdvocatesQuery } from '@/hooks/use-advocates-query';

const COLUMN_COUNT = 7;

const STATUS_MESSAGES = {
  loading: 'Loading advocates...',
  empty: 'No advocates match this search.',
} as const;

function StatusRow({ children }: { children: ReactNode }) {
  return (
    <tr>
      <td colSpan={COLUMN_COUNT}>{children}</td>
    </tr>
  );
}

export default function AdvocateResults({
  searchTerm,
}: {
  searchTerm: string;
}) {
  const {
    data: advocates = [],
    isPending,
    isError,
    error,
    refetch,
  } = useAdvocatesQuery();

  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredAdvocates = useMemo(() => {
    const searchLower = deferredSearchTerm.toLowerCase();

    return advocates.filter((advocate) => {
      return (
        advocate.firstName.toLowerCase().includes(searchLower) ||
        advocate.lastName.toLowerCase().includes(searchLower) ||
        advocate.city.toLowerCase().includes(searchLower) ||
        advocate.degree.toLowerCase().includes(searchLower) ||
        advocate.specialties.some((specialty) =>
          specialty.toLowerCase().includes(searchLower),
        ) ||
        advocate.yearsOfExperience.toString().includes(deferredSearchTerm) ||
        advocate.phoneNumber.toString().includes(deferredSearchTerm)
      );
    });
  }, [advocates, deferredSearchTerm]);

  const hasResults = filteredAdvocates.length > 0;

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {isPending && <StatusRow>{STATUS_MESSAGES.loading}</StatusRow>}
        {isError && (
          <StatusRow>
            Failed to load advocates: {error?.message ?? 'Unknown error'}{' '}
            <button
              className='bg-blue-500 text-white p-1 rounded-md'
              type='button'
              onClick={() => refetch()}
            >
              Retry
            </button>
          </StatusRow>
        )}
        {!isPending &&
          !isError &&
          hasResults &&
          filteredAdvocates.map((advocate) => (
            <tr key={advocate.id}>
              <td>{advocate.firstName}</td>
              <td>{advocate.lastName}</td>
              <td>{advocate.city}</td>
              <td>{advocate.degree}</td>
              <td>
                {advocate.specialties.map((specialty, index) => (
                  <div key={index}>{specialty}</div>
                ))}
              </td>
              <td>{advocate.yearsOfExperience}</td>
              <td>{advocate.phoneNumber}</td>
            </tr>
          ))}
        {!isPending && !isError && !hasResults && (
          <StatusRow>{STATUS_MESSAGES.empty}</StatusRow>
        )}
      </tbody>
    </table>
  );
}
