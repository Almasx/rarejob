'use client';

import { use, useState } from 'react';
import { getCourseById } from '@/lib/mock-data';
import { Sidebar } from '@/components/course/sidebar';
import { ContentRenderer } from '@/components/course/content-renderer';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = getCourseById(id);
  const [activeChapterId, setActiveChapterId] = useState(course?.chapters[0]?.id ?? '');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-text-secondary text-lg">Course not found</p>
        <Link href="/" className="text-accent hover:underline">
          Back to courses
        </Link>
      </div>
    );
  }

  const activeChapter = course.chapters.find(c => c.id === activeChapterId) ?? course.chapters[0];

  return (
    <div className="flex min-h-screen">
      <Sidebar
        chapters={course.chapters}
        activeChapterId={activeChapterId}
        onSelectChapter={setActiveChapterId}
        courseTitle={course.title}
        courseEmoji={course.coverEmoji}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex items-center gap-3 px-5 py-3 bg-background/80 backdrop-blur-sm border-b border-border lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-xl hover:bg-accent-soft transition-colors"
          >
            <Menu className="w-5 h-5 text-text-primary" />
          </button>
          <span className="text-[15px] font-medium text-text-primary truncate">
            {activeChapter.icon} {activeChapter.title}
          </span>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-10 lg:px-10 lg:py-14">
          {/* Chapter header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 text-text-tertiary text-[13px] mb-2">
              <Link href="/" className="hover:text-text-primary transition-colors">Courses</Link>
              <span>/</span>
              <span className="text-text-secondary">{course.title}</span>
            </div>
            <h1 className="text-[28px] font-semibold text-text-primary">
              {activeChapter.icon} {activeChapter.title}
            </h1>
          </div>

          <ContentRenderer blocks={activeChapter.blocks} />

          {/* Chapter navigation */}
          <div className="flex justify-between items-center mt-14 pt-6 border-t border-border">
            {(() => {
              const currentIdx = course.chapters.findIndex(c => c.id === activeChapterId);
              const prev = course.chapters[currentIdx - 1];
              const next = course.chapters[currentIdx + 1];

              return (
                <>
                  {prev ? (
                    <button
                      onClick={() => { setActiveChapterId(prev.id); window.scrollTo(0, 0); }}
                      className="text-[15px] text-text-secondary hover:text-text-primary transition-colors"
                    >
                      &larr; {prev.title}
                    </button>
                  ) : <div />}
                  {next ? (
                    <button
                      onClick={() => { setActiveChapterId(next.id); window.scrollTo(0, 0); }}
                      className="px-5 py-2.5 rounded-xl bg-accent text-white text-[15px] font-medium hover:bg-accent/90 transition-colors"
                    >
                      Next: {next.title} &rarr;
                    </button>
                  ) : (
                    <Link
                      href="/"
                      className="px-5 py-2.5 rounded-xl bg-accent text-white text-[15px] font-medium hover:bg-accent/90 transition-colors"
                    >
                      Finish Course
                    </Link>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </main>
    </div>
  );
}
