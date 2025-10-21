'use client';

import { useQuery } from '@tanstack/react-query';
import { Advocate } from '@/types/advocate';

const ADVOCATES_QUERY_KEY = ['advocates'] as const;

export function useAdvocatesQuery() {
  return useQuery<Advocate[], Error>({
    queryKey: ADVOCATES_QUERY_KEY,
    queryFn: async () => {
      const response = await fetch('/api/advocates');

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const jsonResponse = await response.json();
      return jsonResponse.data;
    },
  });
}
