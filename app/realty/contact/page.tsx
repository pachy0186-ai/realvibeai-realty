'use client';

import { useState } from 'react';
import Link from 'next/link';
import { auditEvents } from '../../../lib/audit';
import type { ContactResponse } from '@/lib/sanitize';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  intent: string;
  timeframe: string;
  budget: string;
  financing: string; // yes | no | unsure
  aiConsent: boolean;
};

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    intent: '',
    timeframe: '',
    budget: '',
    financing: '',
    aiConsent: false,
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'consent-required'>('idle');
  const [warnings, setWarnings] = useState<string[]>([]);

  const update = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(s => ({ ...s, [k]: e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.aiConsent) {
      setSubmitStatus('consent-required');
      return;
    }
    setWarnings([]);
    setSubmitStatus('sending');
    try {
      auditEvents.aiConsentAccepted('contact_form');

      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
          intent: form.intent || undefined,
          timeframe: form.timeframe || undefined,
          budget: form.budget || undefined,
          financing: form.financing || undefined,
          aiConsent: form.aiConsent,
          followUpConsent: false,
        }),
      });

      const payload = (await res.json()) as ContactResponse;
      if (!res.ok || !payload.ok) throw new Error(payload.error || 'Request failed');
      setWarnings(payload.warnings || []);
      setSubmitStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        intent: '',
        timeframe: '',
        budget: '',
        financing: '',
        aiConsent: false,
      });
    } catch {
      setSubmitStatus('error');
      setWarnings([]);
    }
  }

  return (
    <main className="min-h-screen py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Start Your Free Trial</h1>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="John Smith"
                value={form.name}
                onChange={update('name')}
                required
                name="name"
                autoComplete="name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="john@example.com"
                value={form.email}
                onChange={update('email')}
                required
                name="email"
                autoComplete="email"
                type="email"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number (Optional)</label>
            <input
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="(555) 123-4567"
              value={form.phone}
              onChange={update('phone')}
              name="phone"
              autoComplete="tel"
            />
          </div>

          {/* Lead qualification row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Lead Intent</label>
              <select
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={form.intent}
                onChange={update('intent')}
                name="intent"
              >
                <option value="">Select...</option>
                <option value="Free trial">Free trial</option>
                <option value="Get a demo">Get a demo</option>
                <option value="General question">General question</option>
                <option value="Partnership">Partnership</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Timeframe</label>
              <select
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={form.timeframe}
                onChange={update('timeframe')}
                name="timeframe"
              >
                <option value="">Select...</option>
                <option value="ASAP">ASAP</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month+">1 month+</option>
                <option value="Just browsing">Just browsing</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Budget</label>
              <select
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                value={form.budget}
                onChange={update('budget')}
                name="budget"
              >
                <option value="">Select...</option>
                <option value="Under 100">Under 100</option>
                <option value="100-300">100-300</option>
                <option value="300-500">300-500</option>
                <option value="500+">500+</option>
              </select>
            </div>
          </div>

          {/* Financing radio group */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">Financing (Pre-approved)</span>
            <div className="flex gap-4">
              {['yes', 'no', 'unsure'].map(v => (
                <label key={v} className={`flex items-center gap-2 rounded-full border px-3 py-2 cursor-pointer ${form.financing === v ? 'border-purple-600' : 'border-gray-300'}`}>
                  <input
                    type="radio"
                    name="financing"
                    value={v}
                    checked={form.financing === v}
                    onChange={update('financing')}
                    className="accent-purple-600"
                  />
                  <span className="capitalize">{v}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Message *</label>
            <textarea
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-3 h-36 resize-vertical focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Tell us about your current lead management process or any specific questions you have..."
              value={form.message}
              onChange={update('message')}
              required
              name="message"
            />
          </div>

          {/* Consent */}
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={form.aiConsent} onChange={update('aiConsent')} className="mt-1 accent-purple-600" />
            <span className="text-sm text-gray-700">
              I understand some responses may be AI-generated and agree to the{' '}
              <Link href="/legal/ai-policy" className="text-purple-600 hover:underline">AI Policy</Link>.
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitStatus === 'sending'}
            className="btn-primary w-full md:w-auto px-8 py-3 rounded-full font-semibold"
          >
            {submitStatus === 'sending' ? 'Sending...' : 'Send Message'}
          </button>

          {/* Status messages */}
          {submitStatus === 'success' && (
            <p className="text-green-700 bg-green-50 border border-green-200 rounded-lg p-4">
              Thank you! We will be in touch within 24 hours to set up your free trial.
            </p>
          )}
          {submitStatus === 'error' && (
            <p className="text-red-700 bg-red-50 border border-red-200 rounded-lg p-4">
              Something went wrong. Please try again.
            </p>
          )}
          {submitStatus === 'consent-required' && (
            <p className="text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-4">
              Please check the consent box before submitting.
            </p>
          )}
          {warnings.length > 0 && (
            <div className="text-amber-800 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="font-semibold">Heads up:</p>
              <ul className="list-disc list-inside text-sm space-y-1 mt-2">
                {warnings.map(warning => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      </div>
    </main>
  );
}