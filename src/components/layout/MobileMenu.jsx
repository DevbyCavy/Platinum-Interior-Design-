import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import BookNowButton from '../ui/BookNowButton';
import SocialIcons from '../ui/SocialIcons';
import { NAV_LINKS } from '../../lib/nav';

/** Full-screen white overlay menu (below the header bar, which holds the close button). */
export default function MobileMenu({ open, onClose }) {
  // Lock page scroll + close on Escape while open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      inert={open ? undefined : ''}
      className={`fixed inset-0 z-40 flex flex-col bg-ink pt-20 transition-opacity duration-500 lg:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <nav aria-label="Mobile" className="flex flex-1 items-center overflow-y-auto">
        <ul className="container-content flex flex-col gap-5 py-10">
          {NAV_LINKS.map(({ to, label }, i) => (
            <li
              key={to}
              className={`transition-all duration-500 ${open ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'}`}
              style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
            >
              <NavLink
                to={to}
                end={to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  `font-display text-[clamp(1.75rem,8vw,2.25rem)] font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-gold' : 'text-white hover:text-gold'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-white/10 bg-ink-soft">
        <div className="container-content flex flex-col items-center gap-6 py-8">
          <BookNowButton size="lg" placement="mobile-menu" className="w-full" />
          <SocialIcons size="text-lg" />
        </div>
      </div>
    </div>
  );
}
