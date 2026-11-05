import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import site from '../../content/site.json';
import work from '../../content/work.json';

const image = work.find((w) => w.image === 'living-white-panelled');

/**
 * Home (dark) — "A modern approach to design": copy card + photo, with an optional stats row.
 * TODO(open): add real numbers to site.json "stats" — the row stays hidden while empty.
 */
export default function ModernApproach() {
  return (
    <section className="section-dark">
      <div className="container-content">
        <div className="grid gap-4 lg:grid-cols-12">
          <div className="reveal-left flex flex-col justify-center rounded-[2rem] border border-white/10 bg-ink-card p-8 sm:p-12 lg:col-span-5">
            <p className="eyebrow-dark">Our approach</p>
            <h2 className="mt-5 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight text-white">
              A modern approach <span className="font-light text-gold-light">to design</span>
            </h2>
            {/* Draft copy — client can replace */}
            <p className="mt-5 text-[0.9375rem] leading-relaxed text-white/65">
              We pair timeless materials with clean, contemporary lines, then layer in lighting, texture and detail so
              every space feels calm, personal and effortlessly elegant.
            </p>
            {site.slogan && (
              <p className="mt-6 border-l-2 border-gold pl-4 text-[0.9375rem] font-light italic text-white/80">
                {site.slogan}
              </p>
            )}
            <BookNowButton placement="home-approach" className="mt-9 self-start" />
          </div>

          {image && (
            <div className="reveal-right relative min-h-[22rem] overflow-hidden rounded-[2rem] bg-ink-card lg:col-span-7">
              <ResponsiveImage
                name={image.image}
                alt={image.alt}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="absolute inset-0 block"
                imgClassName="h-full w-full object-cover"
                style={{ objectPosition: image.focus }}
              />
            </div>
          )}
        </div>

        {site.stats?.length > 0 && (
          <dl className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {site.stats.map((s) => (
              <div key={s.label} className="rounded-[1.5rem] border border-white/10 bg-ink-card p-7 text-center">
                <dd className="text-4xl font-semibold tracking-tight text-gold">
                  {s.value}
                  {s.suffix}
                </dd>
                <dt className="mt-2 text-sm text-white/55">{s.label}</dt>
              </div>
            ))}
          </dl>
        )}
      </div>
    </section>
  );
}
