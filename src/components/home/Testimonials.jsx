import { Star } from 'lucide-react';
import testimonials from '../../content/testimonials.json';

/*
 * Testimonials — row of review cards with star ratings.
 * REAL client quotes only, shared with their permission — add them to testimonials.json:
 *   { "quote": "...", "name": "Tendai M.", "project": "Living room makeover", "location": "Borrowdale", "rating": 5 }
 * The section is hidden in production while the file is empty. In development a clearly
 * labelled sample set is shown so the design can be reviewed; it never ships.
 */
const DEV_SAMPLES = [
  {
    quote:
      'Sample quote — replace with a real client testimonial. Two or three sentences about how the finished space feels works best.',
    name: 'Client name',
    project: 'TV wall unit',
    rating: 5,
  },
  {
    quote: 'Sample quote — a second real testimonial goes here, ideally from a different type of project.',
    name: 'Client name',
    project: 'Fitted kitchen',
    rating: 5,
  },
  {
    quote: 'Sample quote — short, specific and in the client’s own words reads as the most genuine.',
    name: 'Client name',
    project: 'Home cinema',
    rating: 5,
  },
];

const initials = (name) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const isSample = testimonials.length === 0;
  const items = isSample ? (import.meta.env.DEV ? DEV_SAMPLES : []) : testimonials;
  if (items.length === 0) return null;

  return (
    <section className="section-dark bg-ink-soft" aria-label="Client testimonials">
      <div className="container-content">
        <div className="reveal flex flex-col items-center text-center">
          <p className="eyebrow-dark">Kind words</p>
          <h2 className="mt-5 text-[clamp(1.75rem,3.4vw,3rem)] leading-tight text-white">
            Here’s what our satisfied <span className="font-light text-gold-light">clients are saying</span>
          </h2>
          {isSample && (
            <p className="mt-6 rounded-full border border-dashed border-gold/50 px-4 py-2 text-xs text-gold-light">
              Preview with sample quotes — visible on the dev site only. Add real testimonials to
              src/content/testimonials.json to publish this section.
            </p>
          )}
        </div>

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <li key={i} className="reveal" style={{ '--d': i }}>
              <figure className="flex h-full flex-col rounded-[1.75rem] border border-white/10 bg-ink-card p-7">
                {t.rating > 0 && (
                  <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`} role="img">
                    {Array.from({ length: 5 }, (_, s) => (
                      <Star
                        key={s}
                        aria-hidden
                        size={16}
                        strokeWidth={1.5}
                        className={s < t.rating ? 'fill-gold text-gold' : 'text-white/20'}
                      />
                    ))}
                  </div>
                )}
                <blockquote className="mt-5 flex-1 text-[0.9375rem] leading-relaxed text-white/75">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-sm font-semibold text-ink">
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{t.name}</span>
                    <span className="block text-xs text-white/50">
                      {t.project}
                      {t.location ? ` · ${t.location}` : ''}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
