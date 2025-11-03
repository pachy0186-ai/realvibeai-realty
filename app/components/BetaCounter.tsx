"use client";

import { useState, useEffect } from "react";

export default function BetaCounter() {
  // Read the feature flag from the environment
  const showCounter =
    process.env.NEXT_PUBLIC_FEATURE_BETA_COUNTER === "true";

  const [seats, setSeats] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  // If the flag is off, render nothing
  if (!showCounter) return null;

  // Fetch seat count on mount
  useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await fetch("/api/beta-seats");
        if (!res.ok) throw new Error("Failed to fetch seat count");
        const data = await res.json();
        setSeats(data?.seats ?? null);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, []);

  if (loading) {
    return <span className="text-sm text-gray-500">Loading beta seats…</span>;
  }

  if (error || seats === null) {
    return <span className="text-sm text-red-500">Beta seats unavailable</span>;
  }

  // Choose indicator colour based on seats
  const indicatorColor = seats > 0 ? "bg-green-500" : "bg-red-500";

  return (
    <div className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium">
      <span className={`h-2 w-2 rounded-full ${indicatorColor}`} />
      <span className="font-bold">{seats}</span>
      <span className="ml-1">beta seats left</span>
    </div>
  );
}