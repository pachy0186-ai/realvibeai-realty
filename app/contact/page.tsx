'use client';

import React, { useState } from 'react';

type FormState = {
  name: string;
  email: string;
  phone: string;
  message: string;
  leadIntent: '' | 'Buy' | 'Sell' | 'Rent' | 'Investor';
  leadPriority: '' | 'High' | 'Medium' | 'Low';
  linkedinProfile: string;
  aiConsent: boolean;
  // honeypot (bots only)
  company: string;
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    message: '',
    leadIntent: '',
    leadPriority: '',
    linkedinProfile: '',
    aiConsent: false,
    company: '',
  });
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const update =
    (key: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        (e.target as HTMLInputElement).type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setForm(s => ({ ...s, [key]: value as any }));
    };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg('');
    setStatus('submitting');

    // required fields (match API contract: name, email, message, aiConsent)
    if (!form.name || !form.email || !form.message || !form.aiConsent) {
      setStatus('error');
      setErrorMsg('Please fill name, email, message, and accept AI consent.');
      return;
    }

    // honeypot: if bots fill "company", just exit as success
    if (form.company) {
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          message: form.message,
          intent: form.leadIntent || undefined,          // HubSpot "Lead Intent"
          leadPriority: form.leadPriority || undefined,  // HubSpot "Lead Priority"
          linkedinProfile: form.linkedinProfile || undefined, // HubSpot "LinkedIn Profile"
          aiConsent: form.aiConsent,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to submit form');
      }

      setStatus('success');
      setForm({
        name: '',
        email: '',
        phone: '',
        message: '',
        leadIntent: '',
        leadPriority: '',
        linkedinProfile: '',
        aiConsent: false,
        company: '',
      });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message || 'Something went wrong.');
    }
  }

  return (
 <main style={{ maxWidth: 900, margin: "40px auto", padding: "0 16px" }}>
  <h1>Contact Us</h1>
  <p>Have questions or want to schedule a demo? We’d love to hear from you!</p>

  <form method="POST" action="/api/follow-up/route">
    <label>
      Name:
      <input type="text" name="name" required />
    </label>
    <br />

    <label>
      Email:
      <input type="email" name="email" required />
    </label>
    <br />

    <label>
      Phone:
      <input type="tel" name="phone" />
    </label>
    <br />

    <label>
      Message:
      <textarea name="message" required></textarea>
    </label>
    <br />

    {/* 🔽 New fields go here */}
    <label>
      Lead Intent:
      <select name="intent" required>
        <option value="buy">Buy</option>
        <option value="sell">Sell</option>
        <option value="rent">Rent</option>
        <option value="investor">Investor</option>
      </select>
    </label>
    <br />

    <label>
      Lead Priority:
      <select name="priority" required>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </label>
    <br />

    <label>
      LinkedIn Profile:
      <input type="url" name="linkedinProfile" placeholder="https://linkedin.com/in/..." />
    </label>
    <br />

    <label>
      <input type="checkbox" name="aiConsent" required />
      I consent to AI-powered responses and follow-ups
    </label>
    <br />

    <button type="submit">Submit</button>
  </form>
</main>
    
      <hr style={{ margin: '24px 0' }} />

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        {/* Honeypot (hidden from users via CSS inline) */}
        <label style={{ position: 'absolute', left: '-9999px' }}>
          Company
          <input value={form.company} onChange={update('company')} />
        </label>

        <label>
          <div>Name *</div>
          <input
            required
            placeholder="Full name"
            value={form.name}
            onChange={update('name')}
            style={inputStyle}
          />
        </label>

        <label>
          <div>Email *</div>
          <input
            required
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={update('email')}
            style={inputStyle}
          />
        </label>

        <label>
          <div>Phone</div>
          <input
            placeholder="(954) 247-8275"
            value={form.phone}
            onChange={update('phone')}
            style={inputStyle}
          />
        </label>

        {/* HubSpot fields */}
        <label>
          <div>Lead Intent</div>
          <select value={form.leadIntent} onChange={update('leadIntent')} style={inputStyle}>
            <option value="">Select intent</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Investor">Investor</option>
          </select>
        </label>

        <label>
          <div>Lead Priority</div>
          <select value={form.leadPriority} onChange={update('leadPriority')} style={inputStyle}>
            <option value="">Select priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          <div>LinkedIn Profile</div>
          <input
            placeholder="https://www.linkedin.com/in/username"
            value={form.linkedinProfile}
            onChange={update('linkedinProfile')}
            style={inputStyle}
          />
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" checked={form.aiConsent} onChange={update('aiConsent')} />
          <span>
            I consent to the use of AI tools to process my inquiry and understand this site’s{' '}
            <a href="/legal/ai-policy">AI Policy</a>.
          </span>
        </label>

        <label>
          <div>Message *</div>
          <textarea
            required
            rows={5}
            placeholder="Tell us about your goals..."
            value={form.message}
            onChange={update('message')}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>

        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid #ddd',
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
          }}
        >
          {status === 'submitting' ? 'Sending…' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p style={{ color: 'green' }}>
            Thanks! Your message has been sent. We’ll get back to you shortly.
          </p>
        )}
        {status === 'error' && <p style={{ color: 'crimson' }}>{errorMsg}</p>}
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  borderRadius: 8,
  border: '1px solid #ddd',
  outline: 'none',
};
