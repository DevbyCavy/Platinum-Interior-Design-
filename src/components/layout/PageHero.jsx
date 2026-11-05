import { Link } from 'react-router-dom';
import ResponsiveImage from '../ui/ResponsiveImage';
import work from '../../content/work.json';

/**
 * Common sub-page hero — modern editorial.
 * Breadcrumb + large title (left) and intro (right), then an optional wide rounded photo
 * (`image` = a name from image-manifest.json).
 */
export default function PageHero({ title, eyebrow, intro, image, crumbs = [] }) {
  const trail = [{ to: '/', label: 'Home' }, ...crumbs];
  const meta = image && work.find((w) => w.image === image);

  return (
    <section className="bg-white pb-6 pt-28 md:pt-36">
      <div className="container-content">
        <div className="enter">
          <Breadcrumb trail={trail} title={title} />
        </div>
        <div className="mt-8 grid items-end gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="enter lg:col-span-7" style={{ '--d': 1 }}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="h1 mt-5 text-espresso">{title}</h1>
          </div>
          {intro && (
            <p
              className="enter max-w-md text-[0.9375rem] leading-relaxed text-espresso/75 lg:col-span-5 lg:justify-self-end lg:pb-2"
              style={{ '--d': 2 }}
            >
              {intro}
            </p>
          )}
        </div>

        {meta && (
          <div className="enter mt-10 overflow-hidden rounded-[2rem] bg-champagne md:mt-14" style={{ '--d': 3 }}>
            <ResponsiveImage
              name={meta.image}
              alt=""
              priority
              sizes="(min-width: 1280px) 1280px, 100vw"
              className="block"
              imgClassName="aspect-[16/10] w-full animate-[settle_1.8s_ease-out] object-cover sm:aspect-[21/9]"
              style={{ objectPosition: meta.focus }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Breadcrumb({ trail, title }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="caption flex flex-wrap items-center gap-2 text-taupe">
        {trail.map(({ to, label }) => (
          <li key={to} className="flex items-center gap-2">
            <Link to={to} className="hover:text-gold-deep">
              {label}
            </Link>
            <span aria-hidden className="text-taupe/40">
              /
            </span>
          </li>
        ))}
        <li aria-current="page" className="text-espresso">
          {title}
        </li>
      </ol>
    </nav>
  );
}
