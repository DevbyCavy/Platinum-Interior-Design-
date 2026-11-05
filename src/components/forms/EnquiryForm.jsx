import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingField from './FloatingField';
import BookNowButton from '../ui/BookNowButton';
import { validateEnquiry, PROJECT_TYPES } from '../../lib/validators';
import { track } from '../../lib/analytics';

const API = import.meta.env.VITE_API_BASE || '/api';
const EMPTY = { name: '', email: '', phone: '', project_type: '', message: '', consent: false, website: '' };

/**
 * Secondary "Prefer email?" enquiry form → POST /api/enquiry.php (architecture §8.3).
 * `website` is a hidden honeypot; the server silently discards submissions that fill it.
 */
export default function EnquiryForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const formRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  async function onSubmit(e) {
    e.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      // Move focus to the first invalid field
      const first = Object.keys(found)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(`${API}/enquiry.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, project_type: values.project_type || 'Other' }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        setStatus('idle');
        return;
      }
      if (!res.ok || data.ok === false) throw new Error(String(res.status));
      setStatus('done');
      track('enquiry_submit', { project_type: values.project_type || 'Other' });
      setValues(EMPTY);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'done') {
    return (
      <div role="status" className="rounded-3xl border border-hairline bg-champagne px-8 py-14 text-center">
        <p className="eyebrow">Message sent</p>
        <p className="mt-4 font-display text-3xl font-semibold tracking-tight">Thank you</p>
        <span aria-hidden className="mx-auto mt-5 block h-px w-12 bg-gold" />
        <p className="mx-auto mt-6 max-w-sm">We’ll be in touch soon. Can’t wait? Continue the conversation on WhatsApp.</p>
        <BookNowButton label="Continue on WhatsApp" placement="enquiry-success" className="mt-8" />
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-1">
      <div className="grid gap-x-5 sm:grid-cols-2">
        <FloatingField id="name" label="Your name" autoComplete="name" value={values.name} onChange={set('name')} error={errors.name} required />
        <FloatingField id="email" label="Email address" type="email" autoComplete="email" value={values.email} onChange={set('email')} error={errors.email} required />
        <FloatingField id="phone" label="Phone" type="tel" autoComplete="tel" optional value={values.phone} onChange={set('phone')} error={errors.phone} />
        <FloatingField id="project_type" label="What are you interested in?" as="select" optional options={PROJECT_TYPES} value={values.project_type} onChange={set('project_type')} error={errors.project_type} />
      </div>
      <FloatingField id="message" label="Tell us about your project" as="textarea" value={values.message} onChange={set('message')} error={errors.message} required />

      {/* Honeypot — hidden from people; bots tend to fill every field */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
      </div>

      <div className="pt-1">
        <label htmlFor="consent" className="flex cursor-pointer items-start gap-3 text-sm text-espresso/85">
          <input
            id="consent"
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={set('consent')}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'consent-error' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#A07840]"
          />
          <span>
            I agree to Platinum Interior Design storing my details to reply to this enquiry, as described in the{' '}
            <Link to="/privacy" className="text-gold-deep underline underline-offset-4 hover:text-gold">
              Privacy Notice
            </Link>
            .
          </span>
        </label>
        <p id="consent-error" aria-live="polite" className="mt-1.5 min-h-[1.1rem] text-xs text-red-800">
          {errors.consent}
        </p>
      </div>

      <div className="flex flex-col items-start gap-4 pt-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="sheen inline-flex items-center justify-center gap-3 rounded-full bg-gold-gradient px-8 py-3.5 text-sm font-medium text-espresso transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold-gradient-deep hover:shadow-[0_12px_28px_-6px_rgba(160,120,64,0.45)] disabled:cursor-wait disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send enquiry'}
        </button>
        <p aria-live="polite" className="text-sm text-red-800">
          {status === 'error' && 'Sorry, something went wrong. Please try again, or message us on WhatsApp.'}
        </p>
      </div>
    </form>
  );
}
