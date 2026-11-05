import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingBookNow from './FloatingBookNow';
import CookieBanner from './CookieBanner';
import { useReveal } from '../../lib/useReveal';

/** Scroll to top on route change, or to #hash targets (e.g. /contact#enquiry). */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    // Pages are lazy-loaded, so the target may not exist yet — poll briefly for it.
    let frame;
    const started = performance.now();
    const tryScroll = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) el.scrollIntoView();
      else if (performance.now() - started < 2000) frame = requestAnimationFrame(tryScroll);
    };
    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);
  return null;
}

export default function Layout() {
  useReveal();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-espresso"
      >
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <FloatingBookNow />
      <CookieBanner />
    </>
  );
}
