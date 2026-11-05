import Eyebrow from './Eyebrow';

export default function SectionHeading({
  eyebrow,
  title,
  divider,
  align = 'center',
  as: Tag = 'h2',
  className = '',
}) {
  const alignCls = align === 'center' ? 'text-center items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-5 ${alignCls} ${className}`}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag className="h2 text-espresso">{title}</Tag>
    </div>
  );
}
