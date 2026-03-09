"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/userId"
import { StreakCalendar } from "@/components/streak-calendar"
import { LessonCard } from "@/components/lesson-card"
import { WeakPointRow } from "@/components/weak-point-row"
export default function Home() {
  const userId = getUserId()
  const lessons = useQuery(api.lessons.list, { level: 3, chapter: 1 })
  const dashboard = useQuery(api.progress.getDashboard, userId ? { userId } : "skip")

  if (!lessons || !dashboard) {
    return (
      <div className="px-5 pt-14 pb-10 flex flex-col gap-3">
        <div className="card-raised p-6 animate-pulse h-[200px]" />
        <div className="card-raised p-6 animate-pulse h-[180px]" />
      </div>
    )
  }

  const nextLesson =
    lessons.find((l) => !dashboard.completedLessons.includes(l.lessonKey)) ?? lessons[0]

  const sortedWeak = [...dashboard.weakPoints].sort((a, b) => b.wrongCount - a.wrongCount)

  return (
    <div className="px-5 pt-14 pb-10 flex flex-col gap-3">
      <StreakCalendar practiceHistory={dashboard.practiceHistory} streak={dashboard.streak} />

      {nextLesson && (
        <LessonCard
          lesson={nextLesson}
          completed={dashboard.completedLessons.includes(nextLesson.lessonKey)}
        />
      )}

      {sortedWeak.length > 0 && (
        <div className="card-raised px-5 pt-5 pb-2">
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
