import { Link } from 'react-router-dom';
import { Gem, ArrowUpRight, Sparkles } from 'lucide-react';
import BookNowButton from '../ui/BookNowButton';
import { serviceIcon } from '../../lib/serviceIcons';
import Button from '../ui/Button';
import ResponsiveImage from '../ui/ResponsiveImage';
import services from '../../content/services.json';
import work from '../../content/work.json';

const imageFor = (name) => work.find((w) => w.image === name);

/**
 * Home (dark) — intro strip (badge · heading · button) followed by a card for every service in services.json.
 */
export default function ServicesIntro() {
  return (
    <section className="section-dark pt-12 md:pt-16">
      <div className="container-content">
        {/* Intro strip */}
        <div className="grid items-center gap-8 border-b border-white/10 pb-14 md:grid-cols-12">
          <div className="reveal flex items-center gap-5 md:col-span-4">
            <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gold-gradient text-ink">
              <Gem aria-hidden size={32} strokeWidth={1.5} />
            </span>
            <p className="text-sm leading-snug text-white/70">
              Bespoke designs,
              <br />
              <span className="font-semibold text-white">made for your space</span>
            </p>
          </div>
          <h2 className="reveal text-[clamp(1.75rem,3vw,2.5rem)] leading-tight text-white md:col-span-5" style={{ '--d': 1 }}>
            Creative solutions <span className="font-light text-gold-light">by professional designers</span>
          </h2>
          <div className="reveal md:col-span-3 md:justify-self-end" style={{ '--d': 2 }}>
            <Button to="/services" variant="ghost-white">
              Our services
            </Button>
          </div>
        </div>

        {/* Service cards — 7 services + a booking tile = two rows of four */}
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => {
            const img = imageFor(s.image);
            const Icon = serviceIcon(s.icon);
            return (
              <li key={s.slug} className="reveal" style={{ '--d': i % 4 }}>
                <Link
                  to={`/services#${s.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-ink-card"
                >
                  {img ? (
                    <ResponsiveImage
                      name={img.image}
                      alt=""
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="absolute inset-0 block"
                      imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ objectPosition: img.focus }}
                    />
                  ) : (
                    // No photo yet — gold icon panel. TODO(open): add a photo for this service.
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,rgba(194,149,90,0.22),transparent_60%)]"
                    >
                      <Icon
                        size={72}
                        strokeWidth={0.9}
                        className="-mt-10 text-gold-light/80 transition-transform duration-700 group-hover:scale-110"
                      />
                    </span>
                  )}
                  <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                  <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-gold-light backdrop-blur">
                    <Icon aria-hidden size={18} strokeWidth={1.5} />
                  </span>
                  <span className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
                    <span className="text-lg font-semibold leading-tight tracking-tight text-white">{s.title}</span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:rotate-45 group-hover:bg-gold group-hover:text-ink">
                      <ArrowUpRight aria-hidden size={18} strokeWidth={1.5} />
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}

          {/* Booking tile */}
          <li className="reveal" style={{ '--d': 3 }}>
            <div className="flex aspect-[4/5] flex-col justify-between rounded-[1.5rem] bg-gold-gradient p-6 text-ink">
              <Sparkles aria-hidden size={28} strokeWidth={1.4} />
              <div>
                <p className="text-xl font-semibold leading-tight tracking-tight">
                  Have something else in mind?
                </p>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink/75">
                  Tell us about your space and we’ll bring it to life.
                </p>
                <BookNowButton variant="white" size="sm" placement="services-intro" className="mt-5" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
