'use client';

export default function Contact() {
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: (fd.get('name') as string) || '',
      email: (fd.get('email') as string) || '',
      phone: (fd.get('phone') as string) || '',
      message: (fd.get('message') as string) || '',
      intent: (fd.get('lead_intent') as string) || '',
      aiConsent: !!fd.get('ai_consent'),
      // Optional: include LinkedIn for enrichment/mapping in HubSpot
      linkedin_profile: (fd.get('linkedin_profile') as string) || '',
      lead_priority: (fd.get('lead_priority') as string) || '',
      // Honeypot – if filled, bail (bot)
      honey: (fd.get('website') as string) || '',
    };

    if (payload.honey) return; // ignore bots

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      alert('Thanks! We received your message.');
      form.reset();
    } else {
      alert('Sorry, something went wrong. Please try again.');
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 16px' }}>
      <h1>Contact Us</h1>
      <p>Have questions or want to schedule a demo? We&apos;d love to hear from you!</p>

      <ul>
        <li>📧 Email: realvibeairealty@gmail.com</li>
        <li>📞 Phone: +1 (954) 247-8275</li>
        <li>🌐 Website: www.realvibeai.com</li>
      </ul>

      <hr style={{ margin: '24px 0' }} />

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
        {/* Honeypot (hidden from users) */}
        <input
          name="website"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: 'absolute', left: '-5000px' }}
        />

        <label>
          Full name *
          <input name="name" type="text" required placeholder="Jane Doe" />
        </label>

        <label>
          Email *
          <input name="email" type="email" required placeholder="jane@example.com" />
        </label>

        <label>
          Phone
          <input name="phone" type="tel" placeholder="+1 555 123 4567" />
        </label>

        <label>
          Lead Intent *
          <select name="lead_intent" required defaultValue="">
            <option value="" disabled>
              Select an option
            </option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
            <option value="Rent">Rent</option>
            <option value="Investor">Investor</option>
          </select>
        </label>

        <label>
          Lead Priority
          <select name="lead_priority" defaultValue="">
            <option value="" disabled>
              Select priority
            </option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>

        <label>
          LinkedIn Profile (lead)
          <input
            name="linkedin_profile"
            type="url"
            placeholder="https://www.linkedin.com/in/username"
            inputMode="url"
          />
        </label>

        <label>
          Message *
          <textarea
            name="message"
            rows={5}
            required
            placeholder="Tell us a bit about your goals..."
          />
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input name="ai_consent" type="checkbox" required /> I consent to RealVibeAI
          using AI-assisted tools to process my inquiry.
        </label>

        <button type="submit">Send</button>
      </form>
    </main>
  );
}
