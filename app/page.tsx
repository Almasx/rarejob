"use client"

import { useProgress } from "@/lib/progress-context"
import { lessons } from "@/lib/data"
import { StreakCalendar } from "@/components/streak-calendar"
import { LessonCard } from "@/components/lesson-card"
import { WeakPointRow } from "@/components/weak-point-row"

export default function Home() {
  const { progress } = useProgress()

  const nextLesson =
    lessons.find((l) => !progress.completedLessons.includes(l.id)) ?? lessons[0]

  const sortedWeak = [...progress.weakPoints].sort((a, b) => b.wrongCount - a.wrongCount)

  return (
    <div className="px-4 pt-12 pb-8 flex flex-col gap-6">
      <div>
        <h1>Today</h1>
        <p className="text-text-secondary mt-1">
          {progress.streak > 0
            ? `${progress.streak}-day streak`
            : "Start your streak today"}
        </p>
      </div>

      <div className="bg-surface rounded-2xl p-4">
        <StreakCalendar practiceHistory={progress.practiceHistory} />
      </div>

      <LessonCard
        lesson={nextLesson}
        completed={progress.completedLessons.includes(nextLesson.id)}
      />

      {sortedWeak.length > 0 && (
        <div className="bg-surface rounded-2xl p-5">
          <h3 className="mb-2">Review these</h3>
          <div className="divide-y divide-border">
            {sortedWeak.slice(0, 5).map((wp, i) => (
              <WeakPointRow key={i} weakPoint={wp} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
