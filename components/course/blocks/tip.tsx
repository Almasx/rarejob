import { Lightbulb } from 'lucide-react';

export function Tip({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
      <Lightbulb className="shrink-0 w-5 h-5 text-amber-600 mt-0.5" />
      <p className="text-[15px] text-amber-900">{text}</p>
    </div>
  );
}
