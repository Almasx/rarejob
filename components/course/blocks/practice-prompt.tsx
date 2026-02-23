import { MessageCircle } from 'lucide-react';

export function PracticePrompt({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-xl border-2 border-dashed border-accent/20 bg-accent-soft/20 p-4">
      <MessageCircle className="shrink-0 w-5 h-5 text-accent mt-0.5" />
      <div>
        <span className="text-[13px] font-semibold text-accent uppercase tracking-wide">Practice with your tutor</span>
        <p className="text-[15px] text-text-primary mt-1">{text}</p>
      </div>
    </div>
  );
}
