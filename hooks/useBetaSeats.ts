'use client';

import { useState, useEffect } from 'react';

interface BetaSeatsData {
  metro: string;
  total: number;
  claimed: number;
  available: number;
  updated_at: string;
}

interface UseBetaSeatsReturn {
  data: BetaSeatsData | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook to fetch beta seat availability for a specific metro
 * Usage: const { data, loading, error } = useBetaSeats('Miami');
 */
export function useBetaSeats(metro: string = 'General'): UseBetaSeatsReturn {
  const [data, setData] = useState<BetaSeatsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeats = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/beta-seats?metro=${encodeURIComponent(metro)}`);

      if (!response.ok) {
        throw new Error('Failed to fetch seat data');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Failed to fetch beta seats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (metro) {
      fetchSeats();
    }
  }, [metro]);

  return {
    data,
    loading,
    error,
    refetch: fetchSeats,
  };
}
