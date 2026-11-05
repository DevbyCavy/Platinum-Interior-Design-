import BookNowButton from '../ui/BookNowButton';
import Button from '../ui/Button';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

const hero = work.find((w) => w.hero) || work[0];

/** Home hero (dark theme) — full-bleed photo, centred headline, two actions. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      <ResponsiveImage
        name={hero.image}
        alt={hero.alt}
        priority
        sizes="100vw"
        className="absolute inset-0 block"
        imgClassName="h-full w-full animate-[settle_6s_cubic-bezier(0.2,0.7,0.2,1)] object-cover"
        style={{ objectPosition: hero.focus }}
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />

      <div className="container-content relative flex min-h-[92svh] flex-col items-center justify-center pb-24 pt-36 text-center">
        <h1 className="enter max-w-4xl text-[clamp(2.5rem,6.5vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
          Design your space <span className="font-light text-gold-light">with the experts.</span>
        </h1>
        <p
          className="enter mt-6 max-w-xl text-[0.9375rem] leading-relaxed text-white/70 md:text-base"
          style={{ '--d': 2 }}
        >
          We transform houses into elegant, modern and comfortable homes, from TV wall units and fitted kitchens to
          ceilings, suites and home cinemas.
        </p>
        <div className="enter mt-9 flex flex-wrap items-center justify-center gap-3" style={{ '--d': 3 }}>
          <BookNowButton size="lg" placement="hero" />
          <Button to="/portfolio" variant="ghost-white" size="lg">
            View our work
          </Button>
        </div>
      </div>
    </section>
  );
}
