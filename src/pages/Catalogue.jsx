import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Expand } from 'lucide-react';
import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import BookNowButton from '../components/ui/BookNowButton';
import CtaBand from '../components/home/CtaBand';
import work from '../content/work.json';
import manifest from '../content/image-manifest.json';

/*
 * Catalogue — every photo in work.json, grouped by category.
 * Filter pills are synced to ?category=<slug>; clicking a photo opens a lightbox
 * (arrow keys / Esc, prev-next) with a Book Us Now button carrying the photo as context.
 */
export const CATEGORIES = [
  'Living Rooms',
  'Bedrooms',
  'Wall Panelling',
  'Mirrors & Entryways',
  'Wardrobes & Kitchens',
  'Ceilings',
  'Commercial & Exterior',
];
const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const groups = CATEGORIES.map((name) => ({
  name,
  slug: slugify(name),
  items: work.filter((w) => w.category === name && manifest[w.image]),
})).filter((g) => g.items.length);

export default function Catalogue() {
  const [params, setParams] = useSearchParams();
  const active = groups.find((g) => g.slug === params.get('category'));
  const shown = active ? [active] : groups;
  // Flat list of visible photos, in display order, for lightbox navigation.
  const flat = useMemo(() => shown.flatMap((g) => g.items), [shown]);
  const [open, setOpen] = useState(-1);

  const select = (slug) => {
    setOpen(-1);
    setParams(slug ? { category: slug } : {}, { replace: true });
  };

  return (
    <>
      <Seo
        title="Catalogue"
        description="Browse our full catalogue of TV walls, wall panelling, mirrors, bedrooms, wardrobes, ceilings and commercial work by Platinum Interior Design, Harare."
      />
      <PageHero
        title="Catalogue"
        eyebrow="Ideas & Inspiration"
        image="living-leather-suite"
        intro="Browse our work by room and style. Tap any photo to view it larger, then book us on WhatsApp to create something similar for your home."
      />

      <section className="bg-white pb-20 pt-10 md:pb-28">
        <div className="container-content">
          {/* Category filter */}
          <nav aria-label="Catalogue categories" className="sticky top-20 z-20 -mx-6 bg-white/90 px-6 py-4 backdrop-blur md:-mx-10 md:px-10">
            <ul className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              <FilterPill label="All" count={work.filter((w) => manifest[w.image]).length} active={!active} onClick={() => select(null)} />
              {groups.map((g) => (
                <FilterPill
                  key={g.slug}
                  label={g.name}
                  count={g.items.length}
                  active={active?.slug === g.slug}
                  onClick={() => select(g.slug)}
                />
              ))}
            </ul>
          </nav>

          <div className="mt-8 space-y-20">
            {shown.map((g) => (
              <section key={g.slug} aria-labelledby={`cat-${g.slug}`}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-5">
                  <h2 id={`cat-${g.slug}`} className="text-[clamp(1.5rem,2.6vw,2.25rem)] text-espresso">
                    {g.name} <span className="text-base font-light text-taupe">({g.items.length})</span>
                  </h2>
                  <BookNowButton
                    variant="ghost"
                    size="sm"
                    placement="catalogue-category"
                    context={{ label: 'Category', value: g.name }}
                  />
                </div>
                <ul className="mt-8 gap-4 sm:columns-2 lg:columns-3">
                  {g.items.map((item) => {
                    const meta = manifest[item.image];
                    const idx = flat.indexOf(item);
                    return (
                      <li key={item.image} className="mb-4 break-inside-avoid">
                        <button
                          type="button"
                          onClick={() => setOpen(idx)}
                          className="group relative block w-full overflow-hidden rounded-[1.5rem] bg-champagne text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                          style={{ aspectRatio: `${meta.width} / ${meta.height}` }}
                          aria-label={`View larger: ${item.title}`}
                        >
                          <ResponsiveImage
                            name={item.image}
                            alt={item.alt}
                            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                            className="absolute inset-0 block"
                            imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-espresso/80 via-espresso/10 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                            <span className="font-semibold tracking-tight text-white">{item.title}</span>
                            <Expand aria-hidden size={18} className="shrink-0 text-gold-light" />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />

      {open >= 0 && flat[open] && (
        <Lightbox items={flat} index={open} onChange={setOpen} onClose={() => setOpen(-1)} />
      )}
    </>
  );
}

function FilterPill({ label, count, active, onClick }) {
  return (
    <li className="shrink-0">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
          active
            ? 'border-espresso bg-espresso text-white'
            : 'border-hairline bg-white text-espresso hover:border-gold hover:text-gold-deep'
        }`}
      >
        {label} <span className={active ? 'text-gold-light' : 'text-taupe'}>{count}</span>
      </button>
    </li>
  );
}

function Lightbox({ items, index, onChange, onClose }) {
  const item = items[index];
  const go = useCallback((d) => onChange((index + d + items.length) % items.length), [index, items.length, onChange]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [go, onClose]);

  const btn =
    'flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 z-[100] flex flex-col bg-ink/95"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white/70">
        <span className="text-sm">
          {index + 1} / {items.length}
        </span>
        <button type="button" onClick={onClose} className={btn} aria-label="Close" autoFocus>
          <X size={22} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <ResponsiveImage
          key={item.image}
          name={item.image}
          alt={item.alt}
          sizes="100vw"
          priority
          className="flex max-h-full max-w-full"
          imgClassName="max-h-[calc(100vh-11rem)] w-auto max-w-full rounded-2xl object-contain"
        />
        <button type="button" onClick={() => go(-1)} className={`${btn} absolute left-3 sm:left-5`} aria-label="Previous photo">
          <ChevronLeft size={24} />
        </button>
        <button type="button" onClick={() => go(1)} className={`${btn} absolute right-3 sm:right-5`} aria-label="Next photo">
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <p>
          <span className="block text-xs font-medium text-gold-light">{item.category}</span>
          <span className="mt-1 block text-lg font-semibold tracking-tight text-white">{item.title}</span>
        </p>
        <BookNowButton
          size="sm"
          placement="catalogue-lightbox"
          label="Book something like this"
          context={{ label: 'Catalogue photo', value: `${item.title} (${item.category})` }}
        />
      </div>
    </div>
  );
}
