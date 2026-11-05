import { useState } from 'react';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SocialIcons from '../components/ui/SocialIcons';
import EnquiryForm from '../components/forms/EnquiryForm';
import { whatsappLink, hasWhatsapp } from '../lib/whatsapp';
import { track } from '../lib/analytics';
import { useConsent } from '../lib/consent';
import site from '../content/site.json';

/** One large clickable contact method row. `featured` = WhatsApp (primary booking channel). */
function ContactRow({ Icon, label, value, note, href, external, featured, onClick }) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={`group relative flex items-center gap-5 py-6 transition-colors duration-300 ${
          featured ? 'mb-3 rounded-2xl bg-champagne px-5 hover:bg-sand' : 'rounded-2xl px-3 hover:bg-champagne/60'
        }`}
      >
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:-translate-y-0.5 ${
            featured ? 'bg-gold-gradient text-espresso' : 'border border-gold/60 text-gold'
          }`}
        >
          <Icon aria-hidden size={20} strokeWidth={1.25} className={featured ? 'text-xl' : ''} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="caption">{label}</span>
            {note && (
              <span className="rounded-full border border-gold/60 px-2.5 py-0.5 text-[0.6875rem] font-medium text-gold-deep">
                {note}
              </span>
            )}
          </span>
          <span
            className={`mt-1 block text-espresso transition-colors [overflow-wrap:anywhere] group-hover:text-gold-deep ${
              featured ? 'font-display text-2xl font-semibold tracking-tight' : 'text-base md:text-lg'
            }`}
          >
            {value}
          </span>
        </span>
        <ArrowRight
          aria-hidden
          size={18}
          strokeWidth={1.25}
          className="shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1"
        />
      </a>
    </li>
  );
}

/** Contact page — split editorial layout. */
export default function Contact() {
  const [mapRequested, setMapRequested] = useState(false);
  const { allowsEmbeds } = useConsent();
  // Map loads automatically once cookies are accepted, or on click with "essential only".
  const showMap = allowsEmbeds || mapRequested;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address)}&output=embed`;

  return (
    <>
      <Seo
        title="Contact"
        description="Book Platinum Interior Design on WhatsApp, or send us an email enquiry. Interior designers in Harare, Zimbabwe."
      />
      <PageHero
        title="Contact"
        eyebrow="Get In Touch"
        image="living-white-panelled"
        intro="Tell us about your space. The quickest way to reach us is WhatsApp."
      />

      {/* ── Ways to reach us + enquiry form ─────────────────── */}
      <section className="section">
        <div className="container-content grid gap-16 lg:grid-cols-12 lg:gap-16">
          {/* Left: contact methods */}
          <div className="reveal-left min-w-0 lg:col-span-5">
            <Eyebrow>Let’s Talk</Eyebrow>
            <h2 className="h2 mt-5">Let’s Talk About Your Space</h2>
            <p className="mt-6 max-w-md text-[0.9375rem] text-espresso/85">
              Whether it’s a single statement wall or a whole home, we’d love to hear about it. Choose whichever way
              suits you best.
            </p>

            <ul className="mt-10 divide-y divide-hairline">
              <ContactRow
                featured
                Icon={FaWhatsapp}
                label="WhatsApp"
                note="Fastest reply"
                // TODO(open): company WhatsApp number (falls back to the form until it's set)
                value={hasWhatsapp ? 'Chat with us' : site.whatsappDisplay}
                href={hasWhatsapp ? whatsappLink() : '#enquiry'}
                external={hasWhatsapp}
                onClick={() => track('book_whatsapp_click', { placement: 'contact-row', context: 'general' })}
              />
              <ContactRow Icon={Phone} label="Call us" value={site.phone} href={`tel:${site.phone.replace(/\s/g, '')}`} />
              <ContactRow Icon={Mail} label="Email us" value={site.email} href={`mailto:${site.email}`} />
            </ul>

            <div className="mt-10 flex items-center gap-6">
              <span className="caption">Follow us</span>
              <span aria-hidden className="h-px w-10 bg-gold/60" />
              <SocialIcons size="text-lg" />
            </div>
          </div>

          {/* Right: enquiry form card */}
          <div id="enquiry" className="reveal-right min-w-0 scroll-mt-28 lg:col-span-7">
            <div className="relative">
              <div className="relative rounded-3xl border border-hairline bg-white px-6 py-10 shadow-[0_20px_50px_-20px_rgba(43,37,32,0.25)] sm:px-10 md:px-12 md:py-14">
                <Eyebrow>Prefer email?</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2.25rem)]">Send an Enquiry</h2>
                <p className="mt-4 max-w-prose text-[0.9375rem] text-espresso/85">
                  Tell us a little about your space and what you have in mind, and we’ll get back to you.
                </p>
                <div className="mt-10">
                  <EnquiryForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Visit the studio ───────────────────────────────── */}
      <section className="section bg-champagne">
        <div className="container-content grid items-center gap-12 md:grid-cols-12 md:gap-16">
          <div className="reveal-left md:col-span-5">
            <Eyebrow>Visit the Studio</Eyebrow>
            <h2 className="h2 mt-5">Find Us</h2>
            {/* TODO(open): confirm address and opening hours */}
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="caption">Address</dt>
                <dd className="mt-1 text-lg">{site.address}</dd>
              </div>
              <div>
                <dt className="caption">Opening hours</dt>
                <dd className="mt-1 text-lg">{site.hours}</dd>
              </div>
            </dl>
          </div>

          {/* Map — loads only after the visitor asks for it */}
          <div className="reveal-right md:col-span-7">
            {showMap ? (
              <iframe
                title="Map showing the Platinum Interior Design studio"
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-[16/10] w-full rounded-3xl border border-hairline shadow-soft"
              />
            ) : (
              <button
                type="button"
                onClick={() => setMapRequested(true)}
                className="group relative flex aspect-[16/10] w-full flex-col items-center justify-center gap-4 rounded-3xl border border-hairline bg-white shadow-soft transition-colors hover:bg-sand"
              >
                <span aria-hidden className="absolute inset-3 rounded-2xl border border-hairline" />
                <MapPin aria-hidden size={32} strokeWidth={1.25} className="text-gold transition-transform duration-500 group-hover:-translate-y-1" />
                <span className="label text-gold-deep">Show map</span>
                <span className="max-w-[16rem] text-xs text-taupe">Loads Google Maps, which may set cookies.</span>
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
