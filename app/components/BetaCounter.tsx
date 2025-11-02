"use client";

import { useEffect, useState } from "react";

export default function BetaCounter() {
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);
  const [totalSeats, setTotalSeats] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSeats() {
      try {
        const res = await fetch("/api/beta-seats");
        if (!res.ok) throw new Error("Failed to fetch seat data");
        const data = await res.json();
        setSeatsLeft(data.seatsLeft);
        setTotalSeats(data.total);
      } catch (err) {
        console.error("Error fetching beta seat data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchSeats();
  }, []);

  if (loading) {
    return (
      <p className="text-sm text-gray-400 mt-2 animate-pulse">
        Checking beta availability...
      </p>
    );
  }

  if (seatsLeft === null || totalSeats === null) {
    return (
      <p className="text-sm text-red-500 mt-2">
        Unable to load beta seat data.
      </p>
    );
  }

  const percentLeft = Math.max(0, Math.round((seatsLeft / totalSeats) * 100));
  const statusColor =
    percentLeft > 50
      ? "bg-green-500"
      : percentLeft > 20
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="flex items-center justify-center mt-3">
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium text-white ${statusColor} shadow-md`}
      >
        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        {seatsLeft} of {totalSeats} beta seats left
      </span>
    </div>
  );
}