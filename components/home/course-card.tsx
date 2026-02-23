import Link from 'next/link';

type Props = {
  id: string;
  emoji: string;
  title: string;
  description: string;
  hasContent?: boolean;
};

export function CourseCard({ id, emoji, title, description, hasContent = false }: Props) {
  const Wrapper = hasContent ? Link : 'div';
  const wrapperProps = hasContent ? { href: `/course/${id}` } : {};

  return (
    <Wrapper
      {...(wrapperProps as Record<string, string>)}
      className={`block rounded-2xl border border-border bg-surface p-4 sm:p-5 transition-colors ${
        hasContent
          ? 'hover:border-accent/30 hover:bg-accent-soft/20 cursor-pointer'
          : 'opacity-60 cursor-default'
      }`}
    >
      <span className="text-2xl sm:text-3xl block mb-2 sm:mb-3">{emoji}</span>
      <h3 className="font-semibold text-text-primary text-[15px] mb-1">{title}</h3>
      <p className="text-[13px] text-text-secondary leading-relaxed">{description}</p>
      {!hasContent && (
        <span className="inline-block mt-2 text-[11px] text-text-tertiary bg-background px-2 py-0.5 rounded">
          Coming soon
        </span>
      )}
    </Wrapper>
  );
}
