import Seo from '../components/ui/Seo';
import PageHero from '../components/layout/PageHero';
import Eyebrow from '../components/ui/Eyebrow';
import SectionHeading from '../components/ui/SectionHeading';
import ResponsiveImage from '../components/ui/ResponsiveImage';
import CtaBand from '../components/home/CtaBand';
import about from '../content/about.json';
import team from '../content/team.json';
import work from '../content/work.json';
import site from '../content/site.json';

const imageFor = (name) => work.find((w) => w.image === name);

/** About page (architecture §7.4). */
export default function About() {
  const { story, philosophy, values } = about;
  const [mainImg, accentImg] = story.images.map(imageFor);

  return (
    <>
      <Seo
        title="About Us"
        description="The story, philosophy and values behind Platinum Interior Design, interior designers in Harare, Zimbabwe."
      />
      <PageHero
        title="About Us"
        eyebrow="Our Studio"
        image="hallway-gallery"
        intro="The people, ideas and craft behind every Platinum interior."
      />

      {/* ── Story ─────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-content grid items-center gap-16 md:grid-cols-12 md:gap-12">
          <div className="reveal-left max-w-prose md:col-span-6">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2 className="h2 mt-5">{story.title}</h2>
            {story.paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? 'mt-8' : 'mt-5'}>
                {p}
              </p>
            ))}
          </div>

          {/* Overlapping image pair */}
          <div className="reveal-right relative mb-10 md:col-span-6 md:mb-0 md:pl-8">
            <div className="relative ml-auto w-[78%]">
              {mainImg && (
                <ResponsiveImage
                  name={mainImg.image}
                  alt={mainImg.alt}
                  sizes="(min-width: 768px) 38vw, 78vw"
                  className="relative block overflow-hidden rounded-3xl bg-champagne shadow-soft"
                  imgClassName="aspect-[3/4] w-full object-cover"
                  style={{ objectPosition: mainImg.focus }}
                />
              )}
            </div>
            {accentImg && (
              <div className="absolute -bottom-10 left-0 w-[45%] overflow-hidden rounded-2xl border-[6px] border-white shadow-soft md:left-0">
                <ResponsiveImage
                  name={accentImg.image}
                  alt={accentImg.alt}
                  sizes="(min-width: 768px) 22vw, 45vw"
                  className="block bg-champagne"
                  imgClassName="aspect-[4/5] w-full object-cover"
                  style={{ objectPosition: accentImg.focus }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Stats — TODO(open): add real numbers to site.json "stats"; hidden while empty */}
        {site.stats?.length > 0 && (
          <div className="container-content mt-28">
            <dl className="flex flex-col items-center justify-center gap-10 md:flex-row md:gap-0">
              {site.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center px-14 text-center ${i > 0 ? 'md:border-l md:border-gold' : ''}`}
                >
                  <dt className="caption order-2 mt-2">{s.label}</dt>
                  <dd className="order-1 bg-gold-gradient bg-clip-text font-display text-6xl text-transparent">
                    {s.value}
                    {s.suffix}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </section>

      {/* ── Philosophy ────────────────────────────────────── */}
      <section className="section bg-champagne">
        <div className="container-content">
          <figure className="reveal-scale relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-espresso px-6 py-16 text-center md:px-16 md:py-20">
            <span aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
            <Eyebrow>{philosophy.eyebrow}</Eyebrow>
            <span aria-hidden className="mt-6 block text-7xl font-semibold leading-none text-gold">
              “
            </span>
            <blockquote className="relative -mt-2 text-[clamp(1.5rem,3vw,2.5rem)] font-light leading-snug tracking-tight text-white">
              {philosophy.quote}
            </blockquote>
            <figcaption className="mt-8 text-sm font-medium text-gold-light">— {philosophy.attribution}</figcaption>
          </figure>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container-content">
          <SectionHeading eyebrow={values.eyebrow} title={values.title} divider className="reveal" />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.items.map((v, i) => (
              <li key={v.title} style={{ '--d': i }} className="reveal group rounded-[2rem] bg-champagne p-8 transition-colors duration-500 hover:bg-espresso">
                <span className="block text-5xl font-light tracking-tight text-gold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                
                <h3 className="mt-10 text-xl text-espresso transition-colors duration-500 group-hover:text-white">{v.title}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-espresso/70 transition-colors duration-500 group-hover:text-white/70">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Team — hidden until team.json has real people ─── */}
      {team.length > 0 && (
        <section className="section bg-champagne">
          <div className="container-content">
            <SectionHeading eyebrow={about.team.eyebrow} title={about.team.title} divider />
            <ul className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <li key={m.name} className="text-center">
                  <div className="relative mx-auto max-w-xs">
                    <img
                      src={m.photo}
                      alt={`Portrait of ${m.name}`}
                      loading="lazy"
                      className="relative aspect-[4/5] w-full rounded-3xl bg-sand object-cover shadow-soft"
                    />
                  </div>
                  <h3 className="mt-8 text-xl">{m.name}</h3>
                  <p className="caption mt-2 text-gold-deep">{m.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
