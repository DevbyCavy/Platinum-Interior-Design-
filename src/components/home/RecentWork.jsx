import Button from '../ui/Button';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/*
 * Home (dark) — "Explore our designs": staggered masonry gallery (mixed photo heights) with captions on hover.
 * Aspect ratios are paired per column (3 columns × 2 photos) so each column ends at the same height.
 */
// Curated mix across categories; the full set lives on /catalogue.
const PICKS = [
  'living-backlit-stone-tv-wall',
  'bedroom-kids-arched-headboard',
  'panelling-gallery-hallway',
  'wardrobe-backlit-walk-in',
  'entry-arched-mirror-console',
  'ceiling-stepped-coffered',
];
const items = PICKS.map((name) => work.find((w) => w.image === name)).filter(Boolean);
const ASPECTS =['aspect-[4/5]', 'aspect-[4/3]', 'aspect-[3/2]', 'aspect-[3/4]', 'aspect-[16/10]', 'aspect-[8/11]'];
export default function RecentWork() {
  return (
    <section className="section-dark">
      <div className="container-content">
        <div className="reveal flex flex-col items-center text-center">
          <p className="eyebrow-dark">Our work</p>
          <h2 className="mt-5 text-[clamp(1.75rem,3.4vw,3rem)] leading-tight text-white">
            Explore our <span className="font-light text-gold-light">interior designs</span>
          </h2>
        </div>

        <ul className="mt-14 gap-4 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <li key={item.image} className="reveal mb-4 break-inside-avoid" style={{ '--d': i % 3 }}>
              <figure
                className={`group relative overflow-hidden rounded-[1.5rem] bg-ink-card ${ASPECTS[i % ASPECTS.length]}`}
                tabIndex={0}
              >
                <ResponsiveImage
                  name={item.image}
                  alt={item.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 block"
                  imgClassName="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus:scale-105"
                  style={{ objectPosition: item.focus }}
                />
                <figcaption className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/20 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100">
                  <span className="text-xs font-medium text-gold-light">{item.category}</span>
                  <span className="mt-1 text-lg font-semibold tracking-tight text-white">{item.title}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button to="/catalogue" variant="ghost-white">
            Browse the full catalogue
          </Button>
        </div>
      </div>
    </section>
  );
}
