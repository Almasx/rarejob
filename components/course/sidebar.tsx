'use client';

import { Chapter } from '@/lib/types';
import { X } from 'lucide-react';

type Props = {
  chapters: Chapter[];
  activeChapterId: string;
  onSelectChapter: (id: string) => void;
  courseTitle: string;
  courseEmoji: string;
  open: boolean;
  onClose: () => void;
};

export function Sidebar({ chapters, activeChapterId, onSelectChapter, courseTitle, courseEmoji, open, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-surface border-r border-border z-50 flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0 lg:z-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">{courseEmoji}</span>
            <h2 className="font-semibold text-[15px] text-text-primary truncate">{courseTitle}</h2>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 text-text-tertiary hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                onSelectChapter(chapter.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors ${
                activeChapterId === chapter.id
                  ? 'bg-accent-soft text-accent font-medium'
                  : 'text-text-secondary hover:bg-accent-soft/40 hover:text-text-primary'
              }`}
            >
              <span className="text-base">{chapter.icon}</span>
              <span className="text-[15px] truncate">{chapter.title}</span>
            </button>
          ))}
        </nav>

        <div className="px-5 py-4 border-t border-border">
          <a
            href="/"
            className="text-[13px] text-text-tertiary hover:text-text-primary transition-colors"
          >
            &larr; Back to courses
          </a>
        </div>
      </aside>
    </>
  );
}
