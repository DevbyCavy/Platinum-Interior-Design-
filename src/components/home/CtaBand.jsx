import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import site from '../../content/site.json';
import work from '../../content/work.json';

const photo = work.find((w) => w.image === 'living-white-panelled');

/**
 * Booking call-to-action — full-bleed section: the photo fills the background,
 * a dark gradient runs in from the left, and the copy sits on the left.
 */
export default function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {photo && (
        <ResponsiveImage
          name={photo.image}
          alt=""
          sizes="100vw"
          className="absolute inset-0 block"
          imgClassName="h-full w-full object-cover object-[70%_40%]"
        />
      )}
      {/* Gradient: solid ink on the left fading to the photo on the right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/40 md:via-ink/85 md:via-40% md:to-transparent"
      />
      {/* Soft gold glow behind the copy */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl"
      />

      <div className="container-content relative py-24 md:py-32">
        <div className="reveal-left max-w-xl">
          <p className="eyebrow-dark">Let’s talk</p>
          <h2 className="mt-6 text-[clamp(2rem,4.2vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-white">
            We can create the space <span className="font-light text-gold-light">of your dreams.</span>
          </h2>
          {/* TODO(open): confirm the response time promised in site.json → whatsappReplyNote */}
          <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-white/70">
            Tap below to chat with us on WhatsApp. {site.whatsappReplyNote}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <BookNowButton size="lg" placement="cta-band" />
            <Link
              to="/contact#enquiry"
              className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
            >
              Prefer email? Send an enquiry
              <ArrowUpRight
                aria-hidden
                size={16}
                strokeWidth={1.5}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
