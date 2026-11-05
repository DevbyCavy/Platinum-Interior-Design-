import { useId, useState } from 'react';

/** FAQ accordion with gold +/− icons. One item open at a time. */
export default function Accordion({ items }) {
  const [open, setOpen] = useState(0);
  const baseId = useId();

  return (
    <ul className="space-y-3">
      {items.map(({ q, a }, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <li
            key={q}
            className={`rounded-2xl border bg-champagne px-5 transition-colors duration-300 md:px-7 ${
              isOpen ? 'border-gold/40' : 'border-transparent hover:border-hairline'
            }`}
          >
            <h3 className="font-sans normal-case tracking-normal">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-base font-medium text-espresso transition-colors group-hover:text-gold-deep">
                  {q}
                </span>
                {/* Gold +/− */}
                <span aria-hidden className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-gold" />
                  <span
                    className={`absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-gold transition-transform duration-300 ${
                      isOpen ? 'scale-y-0' : 'scale-y-100'
                    }`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-6 pr-6 text-[0.9375rem] text-espresso/85">{a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
