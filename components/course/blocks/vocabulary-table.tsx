import { VocabRow } from '@/lib/types';

export function VocabularyTable({ words }: { words: VocabRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-border bg-accent-soft/50">
            <th className="px-4 py-3 font-semibold text-text-primary">Word</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Pronunciation</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Meaning</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Example</th>
          </tr>
        </thead>
        <tbody>
          {words.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 font-medium text-accent">{row.word}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-text-secondary">{row.pronunciation}</td>
              <td className="px-4 py-3 text-text-secondary">{row.meaning}</td>
              <td className="px-4 py-3 text-text-primary">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
