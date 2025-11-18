'use client';

import { useState } from 'react';
import type { ContactResponse } from '@/lib/sanitize';

const initialState = {
  name: '',
  email: '',
  phone: '',
  intent: '',
  message: '',
  aiConsent: false,
  followUpConsent: true,
};

export default function InlineContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [warnings, setWarnings] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    const nextValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.aiConsent) {
      alert('Please acknowledge the AI usage disclosure.');
      return;
    }
    setStatus('submitting');
    setWarnings([]);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const payload = (await response.json()) as ContactResponse;
      if (response.ok && payload.ok) {
        setWarnings(payload.warnings || []);
        setStatus('success');
        setFormData(initialState);
      } else {
        setWarnings(payload.warnings || []);
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Phone (optional)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Intent</label>
          <select
            name="intent"
            value={formData.intent}
            onChange={handleChange}
            className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="">Select an option</option>
            <option value="demo">Schedule a demo</option>
            <option value="pricing">Pricing question</option>
            <option value="support">Support</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-gray-700">Message</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          placeholder="Describe your team, CRM, and goals."
          className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="aiConsent"
          checked={formData.aiConsent}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <span className="text-sm text-gray-600">
          I understand RealVibeAI may process my message using AI and store it in HubSpot for follow-up.
        </span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="followUpConsent"
          checked={formData.followUpConsent}
          onChange={handleChange}
          className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
        />
        <span className="text-sm text-gray-600">Yes, keep me in the loop about seat availability.</span>
      </div>
      {warnings.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          {warnings.map((warning) => (
            <p key={warning}>{warning}</p>
          ))}
        </div>
      )}
      {status === 'success' && (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Thanks! We typically respond within one business day.
        </p>
      )}
      {status === 'error' && (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
          Something went wrong. Email realvibeairealty@gmail.com and we will jump in.
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full rounded-full bg-gray-900 px-8 py-4 text-white font-semibold disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
