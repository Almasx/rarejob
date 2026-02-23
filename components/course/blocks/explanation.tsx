export function Explanation({ html }: { html: string }) {
  return (
    <div
      className="text-text-primary leading-relaxed [&_strong]:font-semibold [&_em]:italic [&_em]:text-text-secondary"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
