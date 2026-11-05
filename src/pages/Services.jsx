import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import SectionHeading from '../components/ui/SectionHeading';
import BookNowButton from '../components/ui/BookNowButton';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import Accordion from '../components/ui/Accordion';
import Process from '../components/home/Process';
import CtaBand from '../components/home/CtaBand';
import services from '../content/services.json';
import work from '../content/work.json';
import faq from '../content/faq.json';
import { serviceIcon } from '../lib/serviceIcons';

const imageFor = (name) => work.find((w) => w.image === name);

/**
 * Services page (architecture §7.3).
 * TODO(open): confirm the real service list and copy with the client (services.json, faq.json).
 */
export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Wainscoting and TV wall units, fitted kitchens and cabinets, headboards and base beds, dining and bedroom suites, home cinemas, mirrors, skirting, painting and ceiling designs in Harare, Zimbabwe."
      />
      <PageHero
        title="Services"
        eyebrow="What We Do"
        image="kitchen-white-galley"
        intro="We specialise in transforming houses into elegant, modern and comfortable homes, from a single feature wall to a complete makeover."
      />

      {/* Service cards — one rounded card per service, image side alternates */}
      <section className="bg-white pb-20 pt-10 md:pb-28">
        <div className="container-content space-y-4">
          {services.map((s, i) => {
            const img = imageFor(s.image);
            const Icon = serviceIcon(s.icon);
            const flipped = i % 2 === 1;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="reveal grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-champagne md:grid-cols-2"
              >
                {/* Image */}
                <div className={`relative min-h-[16rem] ${flipped ? 'md:order-2' : ''}`}>
                  {img ? (
                    <ResponsiveImage
                      name={img.image}
                      alt={img.alt}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="absolute inset-0 block"
                      imgClassName="h-full w-full object-cover"
                      style={{ objectPosition: img.focus }}
                    />
                  ) : (
                    // No photo yet — gold icon panel. TODO(open): add a photo for this service.
                    <span
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-sand bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.75),transparent_65%)]"
                    >
                      <Icon size={96} strokeWidth={0.8} className="text-gold-deep/70" />
                    </span>
                  )}
                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/85 text-sm font-semibold text-espresso backdrop-blur">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Text */}
                <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-14">
                  <h2 className="text-[clamp(1.625rem,2.6vw,2.375rem)] text-espresso">{s.title}</h2>
                  <p className="mt-5 max-w-prose text-[0.9375rem] leading-relaxed text-espresso/75">{s.summary}</p>

                  <p className="mt-8 text-sm font-semibold text-espresso">What’s included</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {s.included.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-espresso/10 bg-white px-4 py-2 text-[0.8125rem] text-espresso/80 transition-colors duration-300 hover:border-gold hover:text-gold-deep"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Process bg="bg-champagne" />

      {/* FAQ */}
      <section className="section bg-white">
        <div className="container-content grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="reveal-left md:col-span-4">
            <SectionHeading eyebrow="Questions" title="FAQ" align="left" />
            <p className="mt-6 max-w-xs text-[0.9375rem] text-espresso/85">
              Can’t find what you’re looking for? Send us a message and we’ll be happy to help.
            </p>
            <BookNowButton variant="ghost" size="sm" className="mt-8" placement="services-faq" />
          </div>
          <div className="reveal-right md:col-span-8">
            <Accordion items={faq} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
