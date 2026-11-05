import { useState } from 'react';

const API = import.meta.env.VITE_API_BASE || '/api';

/** Footer newsletter signup → POST /api/newsletter.php (see architecture §8.3). */
export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [error, setError] = useState('');

  async function onSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setError('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setError('');
    try {
      const res = await fetch(`${API}/newsletter.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
      setError('Something went wrong. Please try again later.');
    }
  }

  if (status === 'done') {
    return (
      <p role="status" className="text-sm text-gold-light">
        Thank you — you’re on the list.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <div className="flex rounded-full bg-white px-1">
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={status === 'error'}
          aria-describedby="newsletter-msg"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-espresso placeholder:text-taupe focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          aria-label="Subscribe"
          className="px-4 text-lg text-gold transition-colors hover:text-gold-deep disabled:opacity-50"
        >
          →
        </button>
      </div>
      {/* Honeypot — hidden from people, bots fill it in */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden
      />
      <p id="newsletter-msg" aria-live="polite" className="mt-2 min-h-[1.25rem] text-xs text-gold-light">
        {error}
      </p>
    </form>
  );
}
