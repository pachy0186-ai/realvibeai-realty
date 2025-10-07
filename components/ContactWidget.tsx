'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  intent: string;
  aiConsent: boolean;
}

const QUICK_PROMPTS = [
  { label: 'Pricing Info', value: 'pricing' },
  { label: 'Schedule Demo', value: 'demo' },
  { label: 'General Question', value: 'question' },
];

export default function ContactWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [followUpConsent, setFollowUpConsent] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    intent: '',
    aiConsent: false,
  });

  // refs inside the component
  const panelRef = useRef<HTMLDivElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null); // used for focus return

  // focus trap + ESC close + scroll lock + focus return (fixed cleanup ref)
  useEffect(() => {
    if (!isOpen) return;

    // snapshot the opener element for cleanup (prevents ref-change warning)
    const openerEl = openerRef.current;

    // lock background scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const root = panelRef.current;
    const focusSelector =
      'a[href],button:not([disabled]),textarea,input,select,[tabindex]:not([tabindex="-1"])';

    // initial focus: first focusable or the panel
    if (root) {
      const first = root.querySelector<HTMLElement>(focusSelector) || root;
      first.focus();
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (!root) return;

      // ESC closes
      if (e.key === 'Escape') {
        e.stopPropagation();
        setIsOpen(false);
        return;
      }

      // TAB loops focus
      if (e.key !== 'Tab') return;

      const candidates = Array.from(
        root.querySelectorAll<HTMLElement>(focusSelector)
      ).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true'
      );

      if (candidates.length === 0) {
        e.preventDefault();
        (root as HTMLElement).focus();
        return;
      }

      const first = candidates[0];
      const last = candidates[candidates.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      // use the captured element so ESLint is happy and focus is stable
      openerEl?.focus?.();
    };
  }, [isOpen, setIsOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleQuickPrompt = (intent: string) => {
    setFormData((prev) => ({ ...prev, intent }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.aiConsent) {
      alert('Please agree to the AI Policy before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, followUpConsent }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          intent: '',
          aiConsent: false,
        });
        setFollowUpConsent(false);

        // optional SMS alert
        try {
          await fetch('/api/alert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              intent: formData.intent || 'General inquiry',
            }),
          });
        } catch (alertError) {
          console.log('SMS alert failed (optional):', alertError);
        }

        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Open-state (modal dialog with focus trap)
  if (isOpen) {
    return (
      <div
        id="contact-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-panel-title"
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <div
          ref={panelRef}
          tabIndex={-1}
          className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
        >
          <h2 id="contact-panel-title" className="text-2xl font-semibold mb-4">
            Contact Us
          </h2>

          {/* render your modal form here if using modal-only UX */}

          <button
            type="button"
            aria-label="Close contact form"
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // Closed-state (inline panel)
  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
          <button
            ref={openerRef}
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close contact form"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
            <p className="text-green-800 text-sm">Thank you! We'll get back to you soon.</p>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 text-sm">Something went wrong. Please try again.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quick prompts</label>
            <div className="flex flex-wrap gap-2">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt.value}
                  type="button"
                  onClick={() => handleQuickPrompt(prompt.value)}
                  className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                    formData.intent === prompt.value
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={3}
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-900 placeholder-gray-500"
              placeholder="How can we help you?"
            />
            <p className="text-xs text-gray-500 mt-1">
              AI-generated—may be imperfect. Use your judgment.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="aiConsent"
                name="aiConsent"
                checked={formData.aiConsent}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                required
              />
              <label htmlFor="aiConsent" className="text-xs text-gray-600">
                I understand some responses may be AI-generated and agree to the{' '}
                <Link href="/legal/ai-policy" className="text-purple-600 hover:text-purple-700 underline">
                  AI Policy
                </Link>
                . *
              </label>
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="followUpConsent"
                checked={followUpConsent}
                onChange={(e) => setFollowUpConsent(e.target.checked)}
                className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="followUpConsent" className="text-xs text-gray-600">
                I would like to receive helpful follow-up emails about my inquiry (you can unsubscribe anytime)
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              !formData.aiConsent ||
              !formData.name.trim() ||
              !formData.email.trim() ||
              !formData.message.trim()
            }
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2 px-4 rounded-md transition-colors duration-200 font-medium"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}