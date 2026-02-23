import { DialogueLine } from '@/lib/types';

const speakerColors: Record<string, string> = {
  default: 'bg-accent-soft text-accent',
};

function getSpeakerStyle(speaker: string, index: number) {
  if (index % 2 === 0) return 'bg-accent text-white';
  return speakerColors.default;
}

export function Dialogue({ lines }: { lines: DialogueLine[] }) {
  const speakers = [...new Set(lines.map(l => l.speaker))];

  return (
    <div className="space-y-3">
      {lines.map((line, i) => {
        const speakerIndex = speakers.indexOf(line.speaker);
        return (
          <div key={i} className="flex gap-3 items-start">
            <span
              className={`shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-semibold ${getSpeakerStyle(line.speaker, speakerIndex)}`}
            >
              {line.speaker.charAt(0)}
            </span>
            <div className="flex-1 min-w-0">
              <span className="text-[13px] font-medium text-text-secondary block mb-0.5">
                {line.speaker}
              </span>
              <p className="text-text-primary">{line.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
