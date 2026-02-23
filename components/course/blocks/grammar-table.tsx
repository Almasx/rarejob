import { GrammarRow } from '@/lib/types';

export function GrammarTable({ rules }: { rules: GrammarRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full text-left text-[15px]">
        <thead>
          <tr className="border-b border-border bg-accent-soft/50">
            <th className="px-4 py-3 font-semibold text-text-primary">Form</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Structure</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Use Case</th>
            <th className="px-4 py-3 font-semibold text-text-primary">Example</th>
          </tr>
        </thead>
        <tbody>
          {rules.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-b-0">
              <td className="px-4 py-3 font-medium text-accent">{row.tense}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-text-secondary">{row.structure}</td>
              <td className="px-4 py-3 text-text-secondary">{row.useCase}</td>
              <td className="px-4 py-3 text-text-primary">{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
