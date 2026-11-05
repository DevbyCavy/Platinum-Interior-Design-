import { Link } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink, hasWhatsapp } from '../../lib/whatsapp';
import { track } from '../../lib/analytics';
import { buttonClass } from './Button';

/**
 * Primary booking action — opens WhatsApp with the prefilled message (+ optional context).
 * variant: solid | ghost | white | icon | expand (gold circle with the icon; widens to show the label on hover/focus)
 * context: { label: 'Project' | 'Service' | 'Category', value, url? }
 */
export default function BookNowButton({
  context,
  variant = 'solid',
  size = 'md',
  placement = 'unknown',
  label = 'Book Us Now',
  className = '',
  ...rest
}) {
  const isIcon = variant === 'icon';
  const isExpand = variant === 'expand';
  // Hover: lift + soft gold glow; icon "rings"; sheen sweeps across (see .sheen in index.css).
  const hover =
    'group hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-6px_rgba(160,120,64,0.45)] active:translate-y-0 active:shadow-none';
  const cls = isExpand
    ? `group sheen inline-flex h-14 items-center rounded-full bg-gold-gradient px-[17px] text-espresso shadow-[0_12px_30px_-8px_rgba(160,120,64,0.6)] transition-all duration-500 ease-out hover:bg-gold-gradient-deep hover:pr-6 focus-visible:pr-6 ${className}`
    : isIcon
      ? `sheen inline-flex h-10 w-10 items-center rounded-full justify-center bg-gold-gradient text-espresso transition-all duration-300 hover:bg-gold-gradient-deep ${hover} ${className}`
      : buttonClass({ variant, size, className: `${hover} ${className}` });

  const content = isExpand ? (
    <>
      <FaWhatsapp aria-hidden className="shrink-0 origin-center text-[22px] group-hover:animate-ring" />
      {/* Label collapses to zero width; slides open on hover / keyboard focus */}
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-500 ease-out group-hover:ml-2.5 group-hover:max-w-[9rem] group-hover:opacity-100 group-focus-visible:ml-2.5 group-focus-visible:max-w-[9rem] group-focus-visible:opacity-100">
        {label}
      </span>
    </>
  ) : (
    <>
      <FaWhatsapp
        aria-hidden
        className={`${isIcon ? 'text-xl' : 'text-[1.15em]'} origin-center group-hover:animate-ring`}
      />
      {!isIcon && <span>{label}</span>}
    </>
  );

  // Fallback: no valid number configured → send visitors to the contact page.
  if (!hasWhatsapp) {
    return (
      <Link to="/contact" className={cls} aria-label={isIcon || isExpand ? 'Book us now' : undefined} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={whatsappLink(context)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Book us now on WhatsApp (opens in new tab)"
      onClick={() =>
        track('book_whatsapp_click', {
          placement,
          context: context?.label ? `${context.label}: ${context.value}` : 'general',
        })
      }
      className={cls}
      {...rest}
    >
      {content}
    </a>
  );
}
