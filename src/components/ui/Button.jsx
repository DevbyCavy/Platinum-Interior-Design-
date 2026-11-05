import { Link } from 'react-router-dom';

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-full font-sans font-medium tracking-[0.01em] transition-all duration-300';

const sizes = {
  sm: 'px-5 py-2.5 text-[0.8125rem]',
  body: 'px-6 py-3 text-sm',
  md: 'px-7 py-3.5 text-sm',
  lg: 'px-8 py-4 text-[0.9375rem]',
};

const variants = {
  solid: 'sheen bg-gold-gradient text-espresso hover:bg-gold-gradient-deep',
  ghost: 'border border-espresso/15 bg-transparent text-espresso hover:border-gold hover:bg-champagne',
  dark: 'bg-espresso text-white hover:bg-black',
  'ghost-white': 'border border-white/80 bg-transparent text-white hover:bg-white hover:text-espresso',
  white: 'bg-white text-gold-deep hover:bg-champagne',
};

export function buttonClass({ variant = 'solid', size = 'md', className = '' } = {}) {
  return `${base} ${sizes[size]} ${variants[variant]} ${className}`;
}

/** Generic button / link. Pass `to` for internal routes, `href` for external links. */
export default function Button({ to, href, variant, size, className, children, ...rest }) {
  const cls = buttonClass({ variant, size, className });
  if (to)
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
