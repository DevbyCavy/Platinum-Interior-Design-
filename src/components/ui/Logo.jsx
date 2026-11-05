import { Link } from 'react-router-dom';

/**
 * Text wordmark placeholder.
 * TODO(open): replace with exported logo-gold.svg / logo-white.svg once the vector logo is supplied.
 */
export default function Logo({ tone = 'gold', className = '' }) {
  const word =
    tone === 'white'
      ? 'text-white'
      : 'bg-gradient-to-br from-gold-deep via-gold to-gold-deep bg-clip-text text-transparent';
  const sub = tone === 'white' ? 'text-white/85' : 'text-gold-deep';
  return (
    <Link
      to="/"
      aria-label="Platinum Interior Design — home"
      className={`inline-flex flex-col items-center leading-none ${className}`}
    >
      <span
        className={`font-logo text-[1.25rem] font-normal uppercase tracking-[0.16em] sm:text-[1.6rem] sm:tracking-[0.22em] md:text-[1.85rem] ${word}`}
      >
        Platinum
      </span>
      <span
        className={`mt-1 font-sans text-[0.5rem] font-medium uppercase tracking-[0.32em] sm:text-[0.55rem] sm:tracking-[0.42em] ${sub}`}
      >
        Interior Design
      </span>
    </Link>
  );
}
