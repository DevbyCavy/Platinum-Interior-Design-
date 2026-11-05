import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BookNowButton from '../ui/BookNowButton';

/**
 * Floating Book Us Now button (every page).
 * - Appears after the first scroll.
 * - Hides once the footer (#site-footer) scrolls into view.
 */
export default function FloatingBookNow() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const target = document.getElementById('site-footer');
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting), {
      threshold: 0.1,
    });
    io.observe(target);
    return () => io.disconnect();
  }, [pathname]);

  const visible = scrolled && !footerVisible;

  return (
    <div
      aria-hidden={!visible}
      inert={visible ? undefined : ''}
      className={`fixed bottom-5 right-5 z-30 transition-all duration-500 md:bottom-8 md:right-8 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      {/* Pulse ring: once every 6s, 3 times, disabled under reduced motion (global CSS) */}
      <div className={`rounded-full ${visible ? 'animate-gold-pulse' : ''}`}>
        {/* Gold circle with the WhatsApp icon; widens to show "Book Us Now" on hover / focus */}
        <BookNowButton variant="expand" placement="floating" />
      </div>
    </div>
  );
}
