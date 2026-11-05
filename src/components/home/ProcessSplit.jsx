import ResponsiveImage from '../ui/ResponsiveImage';
import steps from '../../content/process.json';
import work from '../../content/work.json';

const image = work.find((w) => w.image === 'kitchen-mirrored-wall-unit');

/** Home (dark) — photo on the left, "simplified process" heading and numbered steps on the right. */
export default function ProcessSplit() {
  return (
    <section className="section-dark bg-ink-soft">
      <div className="container-content grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {image && (
          <div className="reveal-left relative overflow-hidden rounded-[2rem] bg-ink-card">
            <ResponsiveImage
              name={image.image}
              alt={image.alt}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="block"
              imgClassName="aspect-[4/5] w-full object-cover sm:aspect-[4/3] lg:aspect-[4/5]"
              style={{ objectPosition: image.focus }}
            />
          </div>
        )}

        <div>
          <div className="reveal">
            <p className="eyebrow-dark">How we work</p>
          <h2 className="mt-5 text-[clamp(1.75rem,3.2vw,2.75rem)] leading-tight text-white">
            Stunning interiors, <span className="font-light text-gold-light">simplified process</span>
            </h2>
          </div>

          <ol className="mt-10 space-y-3">
            {steps.map((step, i) => (
              <li
                key={step.title}
                style={{ '--d': i }}
                className="reveal-right group flex gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-gold/40 hover:bg-white/[0.06]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-sm font-semibold text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-semibold tracking-tight text-white">{step.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-relaxed text-white/55">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
