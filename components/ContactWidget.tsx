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
  const [isOpen, setIsOpen] = useState(false); // Start closed
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

  // ref for focus return on close
  const openerRef = useRef<HTMLButtonElement | null>(null);

  // ESC key handler to close the widget
  useEffect(() => {
    if (!isOpen) return;

    // snapshot the opener element for cleanup (prevents ref-change warning)
    const openerEl = openerRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      // ESC closes the widget
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        return;
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      // use the captured element so ESLint is happy and focus is stable
      openerEl?.focus?.();
    };
  }, [isOpen]);

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

        // Auto-close widget after 5 seconds
        setTimeout(() => {
          setIsOpen(false);
          setSubmitStatus('idle');
        }, 5000);
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

  return (
    <>
      {/* Floating Contact Button - Always visible */}
      {!isOpen && (
        <button
          ref={openerRef}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-200 hover:scale-110 z-50 flex items-center gap-2"
          aria-label="Open contact form"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="font-medium">Contact Us</span>
        </button>
      )}

      {/* Contact Widget Panel - Opens when button is clicked */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-slide-up">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Contact Us</h3>
              <button
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
              <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md animate-pulse">
                <p className="text-green-800 text-sm font-medium">✓ Message sent successfully!</p>
                <p className="text-green-700 text-xs mt-1">Thank you! We'll get back to you soon.</p>
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
      )}
    </>
  );
}

