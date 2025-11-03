"use client";

import { useEffect, useState } from "react";

export default function BetaCounter() {
  // Read flag once per render (string === "true")
  const featureOn =
    process.env.NEXT_PUBLIC_FEATURE_BETA_COUNTER === "true";

  // Hooks must be unconditional
  const [seats, setSeats] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Guard **inside** the effect (ok!)
    if (!featureOn) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/beta-seats", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = await res.json();
        if (!cancelled) setSeats(Number(data?.seats ?? 0));
      } catch (e) {
        if (!cancelled) setError("unavailable");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [featureOn]);

  // UI guard for when the feature is off
  if (!featureOn) return null;

  return (
    <div
      aria-live="polite"
      className="mt-2 text-sm font-semibold text-yellow-300"
    >
      {loading
        ? "Checking seats…"
        : error
        ? "Seats unavailable"
        : `Limited beta: ${seats ?? 0} seats per metro. Apply to claim yours.`}
    </div>
  );
}