import BookNowButton from '../ui/BookNowButton';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/*
 * Editorial project grid — shared by Home "Selected Projects" and the Portfolio page.
 * 12-column desktop layout with mixed tile sizes; single column on mobile.
 * Tiles will link to /portfolio/:slug once projects.json exists.
 */
const LAYOUT = [
  'md:col-span-8', // landscape
  'md:col-span-4', // portrait
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-8', // landscape, paired with the booking tile
];
const ORDER = [
  'living-tv-wall-led',
  'living-backlit-stone-tv-wall',
  'entry-gold-arched-mirror',
  'panelling-lit-hallway',
  'bedroom-panelled-headboard-wall',
  'wardrobe-oak-walk-in',
];

export default function ProjectGrid({ placement = 'project-grid' }) {
  const items = ORDER.map((name) => work.find((w) => w.image === name)).filter(Boolean);

  return (
    <ul className="grid auto-rows-[220px] grid-cols-1 gap-4 md:auto-rows-[200px] md:grid-cols-12 md:gap-6">
      {items.map((item, i) => (
        <li
          key={item.image}
          className={`reveal row-span-2 ${LAYOUT[i] || 'md:col-span-4'}`}
          style={{ '--d': i % 3 }}
        >
          <figure className="group relative h-full overflow-hidden rounded-[2rem] bg-champagne" tabIndex={0}>
            <ResponsiveImage
              name={item.image}
              alt={item.alt}
              sizes="(min-width: 768px) 60vw, 100vw"
              className="block h-full w-full"
              imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03] group-focus:scale-[1.03]"
              style={{ objectPosition: item.focus }}
            />
            {/* Glass caption chip — always visible, lifts on hover / focus */}
            <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-white/40 bg-white/75 px-4 py-3 backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-focus:-translate-y-1 sm:right-auto sm:min-w-[15rem]">
              <span>
                <span className="block font-semibold tracking-tight text-espresso">{item.title}</span>
                <span className="block text-xs text-taupe">{item.category}</span>
              </span>
              <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-gold" />
            </figcaption>
          </figure>
        </li>
      ))}

      {/* Booking tile completes the last row */}
      <li className="reveal row-span-2 md:col-span-4" style={{ '--d': 2 }}>
        <div className="flex h-full flex-col justify-between rounded-[2rem] bg-espresso p-8 text-white">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-3.5 py-1.5 text-xs font-medium text-gold-light">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Your space next
          </p>
          <div>
            <p className="text-3xl font-semibold leading-tight tracking-tight">
              Love what <span className="font-light text-gold-light">you see?</span>
            </p>
            <BookNowButton placement={placement} className="mt-7" />
          </div>
        </div>
      </li>
    </ul>
  );
}
