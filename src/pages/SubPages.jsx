import { Link, useParams } from 'react-router-dom';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Placeholder from '../components/ui/Placeholder';
import CtaBand from '../components/home/CtaBand';
import BookNowButton from '../components/ui/BookNowButton';
import SectionHeading from '../components/ui/SectionHeading';
import ProjectGrid from '../components/portfolio/ProjectGrid';
import site from '../content/site.json';
import { useConsent } from '../lib/consent';

/* Skeleton pages — each will move into its own file as it is built out. */

export function Portfolio() {
  return (
    <>
      <Seo title="Portfolio" description="TV wall units, wainscoting, fitted kitchens, ceilings and complete home interiors by Platinum Interior Design, Harare." />
      <PageHero
        title="Portfolio"
        eyebrow="Our Work"
        image="living-tv-unit-shelving"
        intro="A selection of homes and spaces we have designed, built and styled."
      />
      <section className="section">
        <div className="container-content">
          <SectionHeading title="All Projects" divider className="reveal" />
          <div className="mt-16">
            <ProjectGrid placement="portfolio" />
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              to="/catalogue"
              className="rounded-full border border-espresso/15 px-7 py-3.5 text-sm font-medium text-espresso transition-colors hover:border-gold hover:bg-champagne"
            >
              Browse the full catalogue →
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

export function ProjectDetail() {
  const { slug } = useParams();
  const title = slug.replace(/-/g, ' ');
  return (
    <>
      <Seo title={title} />
      <PageHero title={title} crumbs={[{ to: '/portfolio', label: 'Portfolio' }]} />
      <section className="section">
        <div className="container-content flex justify-center">
          <BookNowButton
            placement="project"
            context={{ label: 'Project', value: title, url: typeof window !== 'undefined' ? window.location.href : '' }}
          />
        </div>
      </section>
      <Placeholder bg="bg-champagne" title="The Story" note="7.2 Story, gallery, before/after, share row, prev/next" />
      <CtaBand />
    </>
  );
}


function CookieSettingsButton() {
  const { openSettings } = useConsent();
  return (
    <button type="button" onClick={openSettings} className="label text-gold-deep underline underline-offset-8 hover:text-gold">
      Change cookie settings →
    </button>
  );
}

export function Privacy() {
  return (
    <>
      <Seo title="Privacy Notice" />
      <PageHero title="Privacy Notice" />
      <section className="section">
        <div className="container-content max-w-prose space-y-4">
          {/* TODO(open): full privacy notice copy. */}
          <p>
            This notice explains how Platinum Interior Design collects and uses personal information submitted through
            this website’s enquiry and newsletter forms.
          </p>
          <p>
            Conversations started with the “Book Us Now” button take place on WhatsApp and are handled by WhatsApp/Meta
            under their own terms and privacy policy.
          </p>
          <h2 className="pt-6 text-2xl">Cookies & third-party content</h2>
          <p>
            Our website does not use advertising or tracking cookies. The Contact page includes a map from Google
            Maps, which may set its own cookies when it loads.
          </p>
          <p>
            When you first visit, we ask whether to load this content automatically (“Accept all”) or only when you
            choose to (“Essential only”). Your choice is saved in your browser, and you can change it at any time:
          </p>
          <p>
            <CookieSettingsButton />
          </p>
        </div>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <>
      <Seo title="Page not found" />
      <section className="flex min-h-[80vh] items-center bg-champagne pt-24">
        <div className="container-content flex flex-col items-center text-center">
          <p className="eyebrow">404</p>
          <h1 className="h1 mt-4 text-gold-deep">This room is still being designed.</h1>
          <Link
            to="/"
            className="label mt-10 rounded-full border border-gold px-7 py-3 text-[0.6875rem] text-gold-deep transition-colors hover:bg-gold hover:text-white"
          >
            Back to home →
          </Link>
        </div>
      </section>
    </>
  );
}
