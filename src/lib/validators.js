import services from '../content/services.json';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Enquiry form "What are you interested in?" options — one per service, plus Other. */
export const PROJECT_TYPES = [...services.map((s) => s.title), 'Other'];

/** Client-side checks mirroring the server rules in /api/enquiry.php (architecture §8.3). */
export function validateEnquiry(v) {
  const errors = {};
  if (!v.name.trim()) errors.name = 'Please enter your name.';
  else if (v.name.trim().length > 120) errors.name = 'Please keep your name under 120 characters.';

  if (!v.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email address.';

  if (v.phone && !/^[+\d\s()-]{6,40}$/.test(v.phone.trim())) errors.phone = 'Please enter a valid phone number.';

  if (!v.message.trim()) errors.message = 'Please tell us a little about your project.';
  else if (v.message.trim().length < 10) errors.message = 'Please add a little more detail.';

  if (!v.consent) errors.consent = 'Please agree so we can reply to your enquiry.';
  return errors;
}
