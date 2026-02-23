'use client';

import type { UserProfile } from '@/lib/types';

const levels: { value: UserProfile['level']; label: string; description: string; rarejobLevel: string }[] = [
  { value: 'beginner', label: 'Beginner', description: 'I know basic words and simple phrases', rarejobLevel: 'Level 3-4' },
  { value: 'high-beginner', label: 'High Beginner', description: 'I can have simple short conversations', rarejobLevel: 'Level 5' },
  { value: 'intermediate', label: 'Intermediate', description: 'I can discuss familiar topics with some confidence', rarejobLevel: 'Level 6-7' },
  { value: 'high-intermediate', label: 'High Intermediate', description: 'I can express opinions and handle most situations', rarejobLevel: 'Level 8' },
];

type Props = {
  selected: UserProfile['level'] | null;
  onSelect: (level: UserProfile['level']) => void;
};

export function LevelSelector({ selected, onSelect }: Props) {
  return (
    <div>
      <h1 className="text-[28px] font-semibold text-text-primary mb-2">What&apos;s your English level?</h1>
      <p className="text-text-secondary mb-8">This helps us create lessons at the right difficulty</p>

      <div className="space-y-3">
        {levels.map((level) => (
          <button
            key={level.value}
            onClick={() => onSelect(level.value)}
            className={`w-full text-left px-5 py-4 rounded-2xl border transition-colors ${
              selected === level.value
                ? 'border-accent bg-accent-soft/40'
                : 'border-border bg-surface hover:border-accent/30'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-text-primary">{level.label}</span>
                <p className="text-[13px] text-text-secondary mt-0.5">{level.description}</p>
              </div>
              <span className="text-[11px] text-text-tertiary bg-background px-2 py-0.5 rounded">
                {level.rarejobLevel}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
