'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ComplianceBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted
    const hasAccepted = localStorage.getItem('compliance-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('compliance-accepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('compliance-accepted', 'declined');
    setIsVisible(false);
    // Optionally redirect to a page without tracking
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50 border-t border-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm">
            <span className="font-semibold">🍪 We use cookies and AI</span> to improve your experience, 
            analyze site usage, and assist with lead management. Some features use AI and may be imperfect.{' '}
            <Link href="/legal/privacy" className="underline hover:text-gray-300">
              Privacy Policy
            </Link>
            {' • '}
            <Link href="/legal/ai-policy" className="underline hover:text-gray-300">
              AI Policy
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm border border-gray-600 rounded hover:bg-gray-800 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 rounded transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
