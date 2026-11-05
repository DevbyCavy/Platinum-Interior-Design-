import { useEffect } from 'react';

/**
 * Scroll-reveal for elements with `reveal`, `reveal-left`, `reveal-right` or `reveal-scale` (see index.css).
 * Optional stagger: style={{ '--d': index }} delays by index × 90ms.
 * Once an element has animated in, the reveal classes are removed so its own
 * hover transitions take over again.
 */
const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
const CLASSES = ['reveal', 'reveal-left', 'reveal-right', 'reveal-scale', 'is-visible'];

export function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll(SELECTOR).forEach((el) => el.classList.remove(...CLASSES));
      return undefined;
    }

    const pending = new Set();

    const show = (el) => {
      if (!pending.delete(el)) return;
      io.unobserve(el);
      el.classList.add('is-visible');
      const delay = parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0;
      setTimeout(() => el.classList.remove(...CLASSES), 1100 + delay * 90);
    };

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && show(e.target)),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    // Backup for fast scrolling / anchor jumps: anything already above the viewport is shown at once
    // (the observer only fires when an element crosses into view, so a jump straight past it is missed).
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        pending.forEach((el) => {
          if (!el.isConnected) {
            // Left behind by a route change
            pending.delete(el);
            io.unobserve(el);
          } else if (el.getBoundingClientRect().bottom < 0) show(el);
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Pages are lazy-loaded, so keep watching for new reveal elements.
    const scan = () =>
      document.querySelectorAll(SELECTOR).forEach((el) => {
        if (!el.classList.contains('is-visible') && !pending.has(el)) {
          pending.add(el);
          io.observe(el);
        }
      });
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
