import { Globe } from 'lucide-react';

export function CulturalNote({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-border bg-accent-soft/40 p-4">
      <Globe className="shrink-0 w-5 h-5 text-accent mt-0.5" />
      <div>
        <span className="text-[13px] font-semibold text-accent uppercase tracking-wide">Cultural Note</span>
        <p className="text-[15px] text-text-primary mt-1">{text}</p>
      </div>
    </div>
  );
}
