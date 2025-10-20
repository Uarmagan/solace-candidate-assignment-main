'use client';

import { ReactNode, useDeferredValue, useMemo } from 'react';
import { useAdvocatesQuery } from '@/hooks/use-advocates-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const COLUMN_COUNT = 7;

const STATUS_MESSAGES = {
  loading: 'Loading advocates...',
  empty: 'No advocates match this search.',
} as const;

function StatusRow({ children }: { children: ReactNode }) {
  return (
    <TableRow>
      <TableCell colSpan={COLUMN_COUNT} className="text-center py-8">
        {children}
      </TableCell>
    </TableRow>
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Degree</TableHead>
          <TableHead>Specialties</TableHead>
          <TableHead>Years of Experience</TableHead>
          <TableHead>Phone Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isPending && <StatusRow>{STATUS_MESSAGES.loading}</StatusRow>}
        {isError && (
          <StatusRow>
            Failed to load advocates: {error?.message ?? 'Unknown error'}{' '}
            <button
              className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 transition-colors"
              type="button"
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
            <TableRow key={advocate.id}>
              <TableCell>{advocate.firstName}</TableCell>
              <TableCell>{advocate.lastName}</TableCell>
              <TableCell>{advocate.city}</TableCell>
              <TableCell>{advocate.degree}</TableCell>
              <TableCell>
                {advocate.specialties.map((specialty) => (
                  <div key={`${advocate.id}-${specialty}`}>{specialty}</div>
                ))}
              </TableCell>
              <TableCell>{advocate.yearsOfExperience}</TableCell>
              <TableCell>{advocate.phoneNumber}</TableCell>
            </TableRow>
          ))}
        {!isPending && !isError && !hasResults && (
          <StatusRow>{STATUS_MESSAGES.empty}</StatusRow>
        )}
      </TableBody>
    </Table>
  );
}
