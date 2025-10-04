'use client';

import { useEffect, useCallback } from 'react';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    clarity: (...args: unknown[]) => void;
  }
}

export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

  useEffect(() => {
    // Initialize gtag if GA_ID is available
    if (GA_ID && typeof window !== 'undefined') {
      window.gtag = window.gtag || function(...args: unknown[]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.gtag as any).q = (window.gtag as any).q || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window.gtag as any).q.push(args);
      };
      window.gtag('js', new Date());
      window.gtag('config', GA_ID);
    }
  }, [GA_ID]);

  // Track custom events
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
    
    // Also track with Clarity if available
    if (typeof window !== 'undefined' && window.clarity) {
      window.clarity('event', eventName);
    }
  }, []);

  // Make trackEvent available globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackEvent = trackEvent;
    }
  }, [trackEvent]);

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `,
            }}
          />
        </>
      )}

      {/* Microsoft Clarity */}
      {CLARITY_ID && (
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${CLARITY_ID}");
            `,
          }}
        />
      )}
    </>
  );
}

// Extend Window interface for trackEvent
declare global {
  interface Window {
    trackEvent?: (eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

// Helper functions for tracking events
export const trackLeadFormSubmit = (formType: string) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('lead_form_submit', {
      form_type: formType,
      page_location: window.location.href
    });
  }
};

export const trackCTAClick = (ctaText: string, ctaLocation: string) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('cta_click', {
      cta_text: ctaText,
      cta_location: ctaLocation,
      page_location: window.location.href
    });
  }
};

export const trackPricingView = (pricingTier?: string) => {
  if (typeof window !== 'undefined' && window.trackEvent) {
    window.trackEvent('pricing_view', {
      pricing_tier: pricingTier || 'all',
      page_location: window.location.href
    });
  }
};
