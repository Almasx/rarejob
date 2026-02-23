'use client';

import { useState } from 'react';

type Props = {
  sentence: string;
  blank: string;
  answer: string;
};

export function QuizFillBlank({ sentence, answer }: Props) {
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = input.trim().toLowerCase() === answer.toLowerCase();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim()) setSubmitted(true);
  }

  const parts = sentence.split('___');

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-text-primary mb-3">
        Fill in the blank:
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <p className="text-text-primary text-lg">
          {parts[0]}
          <span className="inline-flex items-center mx-1">
            <input
              type="text"
              value={input}
              onChange={(e) => !submitted && setInput(e.target.value)}
              disabled={submitted}
              placeholder="..."
              className={`inline-block w-32 border-b-2 bg-transparent text-center outline-none transition-colors ${
                submitted
                  ? isCorrect
                    ? 'border-green-500 text-green-700 font-semibold'
                    : 'border-red-400 text-red-600'
                  : 'border-accent/30 focus:border-accent'
              }`}
            />
          </span>
          {parts[1]}
        </p>
        {!submitted ? (
          <button
            type="submit"
            disabled={!input.trim()}
            className="px-4 py-2 rounded-xl bg-accent text-white text-[15px] font-medium disabled:opacity-40 transition-opacity"
          >
            Check
          </button>
        ) : (
          <div className={`p-3 rounded-xl text-[15px] ${isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {isCorrect ? (
              <span className="font-semibold">Correct!</span>
            ) : (
              <>
                <span className="font-semibold">Not quite.</span> The answer is: <strong>{answer}</strong>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
