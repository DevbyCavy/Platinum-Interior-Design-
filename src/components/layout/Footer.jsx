import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { activeSocials } from '../ui/SocialIcons';
import NewsletterForm from '../forms/NewsletterForm';
import { NAV_LINKS } from '../../lib/nav';
import { useConsent } from '../../lib/consent';
import site from '../../content/site.json';

function ColumnTitle({ children }) {
  return <h2 className="mb-5 text-sm font-semibold tracking-normal text-white">{children}</h2>;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const socials = activeSocials();
  const { openSettings } = useConsent();

  return (
    // id is used by FloatingBookNow to hide itself once the footer is in view
    <footer id="site-footer" className="border-t border-white/10 bg-ink text-white/65">
      {/* Brand block */}
      <div className="container-content flex flex-col items-start justify-between gap-8 pb-14 pt-20 md:flex-row md:items-end">
        <div>
          <Logo className="items-start" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed">
            Transforming houses into elegant, modern and comfortable homes in Harare, Zimbabwe.
          </p>
        </div>
        <p className="max-w-xl text-[clamp(1.75rem,3.4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-white md:text-right">
          Spaces that <span className="font-light text-gold-light">inspire.</span>
        </p>
      </div>

      {/* Columns */}
      <div className="container-content grid gap-12 border-t border-white/10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <ColumnTitle>Studio</ColumnTitle>
          {/* TODO(open): confirm address, phone, email and opening hours. */}
          <address className="space-y-2 text-sm not-italic">
            <p>{site.address}</p>
            <p>
              <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="hover:text-gold-light">
                {site.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${site.email}`} className="break-all hover:text-gold-light">
                {site.email}
              </a>
            </p>
            <p className="text-white/45">{site.hours}</p>
          </address>
        </div>

        <div>
          <ColumnTitle>Explore</ColumnTitle>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.filter((l) => l.to !== '/').map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-gold-light">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Follow us</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {socials.map(({ key, label, Icon, url }) => (
              <li key={key}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 hover:text-gold-light"
                >
                  <Icon aria-hidden className="text-gold transition-colors group-hover:text-gold-light" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Newsletter</ColumnTitle>
          <p className="mb-5 text-sm">Design inspiration, occasionally.</p>
          <NewsletterForm />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-content flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/45 sm:flex-row">
          <p>© {year} Platinum Interior Design</p>
          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-gold-light">
              Privacy
            </Link>
            <button type="button" onClick={openSettings} className="hover:text-gold-light">
              Cookie settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
