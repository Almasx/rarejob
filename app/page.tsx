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
    <div className="px-5 pt-14 pb-10 flex flex-col gap-3">
      <StreakCalendar practiceHistory={progress.practiceHistory} streak={progress.streak} />

      <LessonCard
        lesson={nextLesson}
        completed={progress.completedLessons.includes(nextLesson.id)}
      />

      {sortedWeak.length > 0 && (
        <div className="card-raised p-5">
          <h3 className="mb-1">Review these</h3>
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
