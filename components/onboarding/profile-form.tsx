'use client';

type Props = {
  name: string;
  onNameChange: (name: string) => void;
  nativeLanguage: string;
  onLanguageChange: (lang: string) => void;
};

export function ProfileForm({ name, onNameChange, nativeLanguage, onLanguageChange }: Props) {
  return (
    <div>
      <h1 className="text-[28px] font-semibold text-text-primary mb-2">Almost done!</h1>
      <p className="text-text-secondary mb-8">Tell us a little about yourself</p>

      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wide mb-2">
            Your name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="e.g. Saori"
            className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-text-primary placeholder:text-text-tertiary outline-none transition-colors focus:border-accent/40"
          />
        </div>

        <div>
          <label htmlFor="language" className="block text-[13px] font-semibold text-text-secondary uppercase tracking-wide mb-2">
            Native language
          </label>
          <select
            id="language"
            value={nativeLanguage}
            onChange={(e) => onLanguageChange(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl border border-border bg-surface text-text-primary outline-none transition-colors focus:border-accent/40 appearance-none"
          >
            <option value="Japanese">Japanese (日本語)</option>
            <option value="Chinese">Chinese (中文)</option>
            <option value="Korean">Korean (한국어)</option>
            <option value="Spanish">Spanish (Español)</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    </div>
  );
}
