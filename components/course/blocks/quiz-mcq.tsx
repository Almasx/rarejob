'use client';

import { useState } from 'react';

type Props = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export function QuizMCQ({ question, options, correctIndex, explanation }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;
  const isCorrect = selected === correctIndex;

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="font-semibold text-text-primary mb-3">{question}</p>
      <div className="space-y-2">
        {options.map((option, i) => {
          let style = 'border-border hover:border-accent/30 hover:bg-accent-soft/30';
          if (answered) {
            if (i === correctIndex) {
              style = 'border-green-500 bg-green-50 text-green-900';
            } else if (i === selected) {
              style = 'border-red-400 bg-red-50 text-red-900';
            } else {
              style = 'border-border opacity-50';
            }
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelected(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border transition-colors text-[15px] ${style} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <span className="font-mono text-[13px] text-text-tertiary mr-2">
                {String.fromCharCode(65 + i)}.
              </span>
              {option}
            </button>
          );
        })}
      </div>
      {answered && (
        <div className={`mt-4 p-3 rounded-xl text-[15px] ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <span className="font-semibold">{isCorrect ? 'Correct!' : 'Not quite.'}</span>{' '}
          {explanation}
        </div>
      )}
    </div>
  );
}
