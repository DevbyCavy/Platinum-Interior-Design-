import { useState } from 'react';
import { FaPlay, FaFacebookF } from 'react-icons/fa';
import { useConsent } from '../../lib/consent';

/**
 * Embedded Facebook video / reel (vertical 9:16).
 * Loads automatically once cookies are accepted; otherwise shows a click-to-load card
 * (Facebook's player may set cookies). Iframes are lazy-loaded near the viewport.
 */
export default function FacebookVideo({ url, title, width = 300 }) {
  const { allowsEmbeds } = useConsent();
  const [requested, setRequested] = useState(false);
  const show = allowsEmbeds || requested;

  const height = Math.round((width * 16) / 9);
  const src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=${width}&height=${height}`;

  return (
    <div className="relative mx-auto w-full" style={{ maxWidth: width }}>
      <div className="relative overflow-hidden rounded-3xl bg-ink-card" style={{ aspectRatio: '9 / 16' }}>
        {show ? (
          <iframe
            src={src}
            title={title}
            width={width}
            height={height}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setRequested(true)}
            aria-label={`Load video: ${title}`}
            className="group absolute inset-0 flex flex-col items-center justify-center gap-5 bg-gradient-to-b from-ink-card to-ink-soft px-8 text-center"
          >
            <span aria-hidden className="absolute inset-3 rounded-2xl border border-white/10" />
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold bg-white/5 text-gold transition-all duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-white">
              <FaPlay aria-hidden className="ml-1 text-lg" />
            </span>
            <span className="label text-gold-light">Load video</span>
            <span className="flex items-center gap-2 text-xs text-white/50">
              <FaFacebookF aria-hidden /> Plays from Facebook, which may set cookies.
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
