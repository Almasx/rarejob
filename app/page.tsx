"use client"

import { LessonCard } from "@/components/lesson-card"
import { StreakCalendar } from "@/components/streak-calendar"
import { WeakPointRow } from "@/components/weak-point-row"
import { api } from "@/convex/_generated/api"
import { authClient } from "@/lib/auth-client"
import { useQuery } from "convex/react"
import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const progress = useQuery(api.progress.get)
  const dashboard = useQuery(api.progress.getDashboard)

  const level = progress?.currentLevel ?? 3
  const chapter = progress?.currentChapter ?? 1
  const lessons = useQuery(api.lessons.list, { level, chapter })

  // Still loading
  if (progress === undefined) return null

  // No progress or onboarding incomplete → onboarding
  if (!progress || !progress.onboardingCompleted) {
    router.replace("/onboarding")
    return null
  }

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
    <div className="px-5 pb-10 flex flex-col gap-3">
      <div className="h-16 -mb-2 pt-2 px-1 flex items-center justify-between">
        <span className="text-sm text-text-tertiary font-medium">Practices</span>
        <button
          className="text-text-tertiary active:opacity-60 transition-opacity p-1"
          onClick={() => authClient.signOut().then(() => router.replace("/sign-in"))}
        >
          <LogOut size={16} />
        </button>
      </div>

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
