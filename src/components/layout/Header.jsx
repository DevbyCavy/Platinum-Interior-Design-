import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import SocialIcons from '../ui/SocialIcons';
import MobileMenu from './MobileMenu';
import { NAV_LINKS } from '../../lib/nav';
import { useScrolled } from '../../lib/useScrolled';

export default function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const scrolled = useScrolled(80);
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Full-width dark bar: transparent over the home hero, solid dark once scrolled and on every other page.
  const solid = !(isHome && !scrolled) || menuOpen;
  const headerBg = solid
    ? 'border-white/10 bg-ink/90 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md'
    : 'border-transparent bg-transparent';
  const linkColor = 'text-white/80 hover:text-white';

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ease-out ${headerBg}`}>
        <div className="container-content flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 lg:h-20">
          <Logo
            className="shrink-0 origin-left scale-[0.85]"
          />

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-10">
              {NAV_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={to === '/'}
                    className={`group relative text-[0.9375rem] font-medium ${linkColor} transition-colors duration-500`}
                  >
                    {({ isActive }) => (
                      <>
                        {label}
                        <span
                          className={`absolute -bottom-2 left-0 h-px w-full origin-left bg-gold transition-transform duration-500 ${
                            isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                        />
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop right: socials (booking lives in the floating button) */}
          <div className="hidden items-center lg:flex">
            <SocialIcons only={['instagram', 'facebook', 'whatsappChannel']} tone="gold" size="text-base" />
          </div>

          {/* Mobile right: hamburger */}
          <div className="flex shrink-0 items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="relative flex h-10 w-10 items-center justify-center"
            >
              <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
              <span aria-hidden className="relative block h-3 w-7">
                <span
                  className={`absolute left-0 h-px w-full bg-gold transition-all duration-300 ${
                    menuOpen ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-gold transition-all duration-300 ${
                    menuOpen ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
