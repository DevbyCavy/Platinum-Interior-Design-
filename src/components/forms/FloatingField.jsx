/**
 * Input / textarea / select with a floating label, hairline gold border and inline error.
 * The label sits inside the field and floats up when focused or filled.
 */
export default function FloatingField({
  id,
  label,
  as = 'input',
  type = 'text',
  value,
  onChange,
  error,
  optional,
  options = [],
  rows = 5,
  ...rest
}) {
  const errorId = `${id}-error`;
  const filled = value !== '' && value != null;
  const fieldCls = `peer block w-full rounded-xl border bg-white px-4 pb-2.5 pt-6 text-[0.9375rem] text-espresso outline-none transition-colors duration-300 focus:border-gold-deep ${
    error ? 'border-red-700/60' : 'border-gold/50 hover:border-gold'
  }`;
  const common = {
    id,
    name: id,
    value,
    onChange,
    'aria-invalid': !!error,
    'aria-describedby': error ? errorId : undefined,
    ...rest,
  };

  return (
    <div>
      <div className="relative">
        {as === 'textarea' ? (
          <textarea {...common} rows={rows} placeholder=" " className={`${fieldCls} resize-y`} />
        ) : as === 'select' ? (
          <select {...common} className={`${fieldCls} appearance-none pr-10`}>
            <option value="" disabled hidden />
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        ) : (
          <input {...common} type={type} placeholder=" " className={fieldCls} />
        )}

        <label
          htmlFor={id}
          className={`pointer-events-none absolute left-4 origin-left text-taupe transition-all duration-200 peer-focus:top-2 peer-focus:text-xs peer-focus:text-gold-deep peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-xs ${
            as === 'select' && filled
              ? 'top-2 text-xs'
              : 'top-4 text-[0.9375rem]'
          }`}
        >
          {label}
          {optional && <span className="normal-case tracking-normal text-taupe/80"> (optional)</span>}
        </label>

        {as === 'select' && (
          <span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold">
            ▾
          </span>
        )}
      </div>
      <p id={errorId} aria-live="polite" className="mt-1.5 min-h-[1.1rem] text-xs text-red-800">
        {error}
      </p>
    </div>
  );
}
