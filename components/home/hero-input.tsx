'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function HeroInput() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      // For MVP, navigate to the first mock course
      router.push('/course/morning-routines');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What do you want to learn today?"
          className="w-full pl-11 pr-4 py-3.5 sm:py-4 rounded-2xl border border-border bg-surface text-text-primary text-base sm:text-lg placeholder:text-text-tertiary outline-none transition-colors focus:border-accent/40"
        />
      </div>
    </form>
  );
}
