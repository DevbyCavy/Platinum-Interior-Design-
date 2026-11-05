import { Fingerprint, Gem, Layers, Armchair, CalendarCheck, MessageCircle } from 'lucide-react';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import why from '../../content/why.json';
import work from '../../content/work.json';

const ICONS = { Fingerprint, Gem, Layers, Armchair, CalendarCheck, MessageCircle };
const banner = work.find((w) => w.image === 'living-tv-unit-shelving');
// Four of the six reasons, as in the reference layout
const PICK = ['Designed Around You', 'Concept to Completion', 'Curated, Quality Materials', 'Always a Message Away'];

/**
 * Home (dark) — "high standard" heading with four icon columns, then a wide photo banner with copy + CTA.
 */
export default function WhyChooseUs() {
  const items = PICK.map((t) => why.items.find((i) => i.title === t)).filter(Boolean);

  return (
    <section className="section-dark bg-ink-soft">
      <div className="container-content">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="reveal lg:col-span-4">
            <p className="eyebrow-dark">{why.eyebrow}</p>
            <h2 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white">
              An exceptional standard of <span className="font-light text-gold-light">client care</span>
            </h2>
          </div>

          <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {items.map(({ icon, title, text }, i) => {
              const Icon = ICONS[icon];
              return (
                <li key={title} className="reveal group" style={{ '--d': i + 1 }}>
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
                    {Icon && <Icon aria-hidden size={22} strokeWidth={1.5} />}
                  </span>
                  <h3 className="mt-5 text-base text-white">{title}</h3>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-white/55">{text}</p>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Wide banner */}
        {banner && (
          <div className="reveal-scale relative mt-20 overflow-hidden rounded-[2rem] bg-ink-card">
            <ResponsiveImage
              name={banner.image}
              alt=""
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="absolute inset-0 block"
              imgClassName="h-full w-full object-cover"
              style={{ objectPosition: banner.focus }}
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/10" />
            <div className="relative max-w-xl px-7 py-16 sm:px-12 md:py-24 lg:px-16">
              <h2 className="text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight text-white">
                Proudly crafting interiors <span className="font-light text-gold-light">that last a lifetime</span>
              </h2>
              <p className="mt-5 max-w-md text-[0.9375rem] leading-relaxed text-white/65">
                Every detail is considered, crafted and finished with care, so your space feels as good in ten years as
                it does on reveal day.
              </p>
              <BookNowButton placement="home-banner" className="mt-8" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
