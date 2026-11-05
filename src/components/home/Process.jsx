import steps from '../../content/process.json';

/**
 * Our Process — five step cards with large light numerals and a progress bar that fills on hover.
 * Horizontal on desktop, stacked on mobile.
 */
export default function Process({ bg = 'bg-white' }) {
  const card = bg === 'bg-white' ? 'bg-champagne' : 'bg-white';
  return (
    <section className={`section ${bg}`}>
      <div className="container-content">
        <div className="reveal grid items-end gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">How we work</p>
            <h2 className="h2 mt-5 text-espresso">
              Our <span className="font-light text-gold-deep">process</span>
            </h2>
          </div>
          <p className="max-w-md text-[0.9375rem] leading-relaxed text-espresso/75 lg:col-span-5 lg:justify-self-end">
            Five clear steps from first conversation to the final reveal.
          </p>
        </div>

        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <li key={step.title} className={`reveal group flex flex-col rounded-[2rem] p-7 ${card}`} style={{ '--d': i }}>
              <span className="text-5xl font-light tracking-tight text-gold">{String(i + 1).padStart(2, '0')}</span>
              {/* Progress bar: fills up to this step on hover */}
              <span aria-hidden className="mt-6 block h-1 overflow-hidden rounded-full bg-espresso/10">
                <span
                  className="block h-full origin-left rounded-full bg-gold-gradient transition-transform duration-700 ease-out [transform:scaleX(var(--p))] group-hover:[transform:scaleX(1)]"
                  style={{ '--p': (i + 1) / steps.length }}
                />
              </span>
              <h3 className="mt-6 text-lg text-espresso">{step.title}</h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-espresso/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
