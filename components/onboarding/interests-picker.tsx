'use client';

const interests = [
  { id: 'travel', label: 'Travel', emoji: '✈️' },
  { id: 'business', label: 'Business', emoji: '💼' },
  { id: 'daily-life', label: 'Daily Life', emoji: '🏠' },
  { id: 'culture', label: 'Culture', emoji: '🎭' },
  { id: 'technology', label: 'Technology', emoji: '💻' },
  { id: 'food', label: 'Food', emoji: '🍽️' },
  { id: 'sports', label: 'Sports', emoji: '⚽' },
  { id: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { id: 'health', label: 'Health', emoji: '🏥' },
  { id: 'education', label: 'Education', emoji: '📚' },
];

type Props = {
  selected: string[];
  onToggle: (id: string) => void;
};

export function InterestsPicker({ selected, onToggle }: Props) {
  return (
    <div>
      <h1 className="text-[28px] font-semibold text-text-primary mb-2">What interests you?</h1>
      <p className="text-text-secondary mb-8">Pick topics you&apos;d like your lessons to be about</p>

      <div className="flex flex-wrap gap-3">
        {interests.map((interest) => {
          const isSelected = selected.includes(interest.id);
          return (
            <button
              key={interest.id}
              onClick={() => onToggle(interest.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full border transition-colors text-[15px] ${
                isSelected
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-surface text-text-primary hover:border-accent/30'
              }`}
            >
              <span>{interest.emoji}</span>
              <span>{interest.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
