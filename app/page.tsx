"use client"

import { ConversationChat } from "@/components/conversation-chat"
import { CreateLesson } from "@/components/create-lesson"
import { DailyReview } from "@/components/daily-review"
import { GrammarJournal } from "@/components/grammar-journal"
import { LessonCard } from "@/components/lesson-card"
import { StreakCalendar } from "@/components/streak-calendar"
import { WeakPointRow } from "@/components/weak-point-row"
import { api } from "@/convex/_generated/api"
import { authClient } from "@/lib/auth-client"
import { useQuery } from "convex/react"
import { AnimatePresence } from "framer-motion"
import { BookOpen, LogOut, MessageCircle, RotateCcw, Sparkles, Users } from "lucide-react"
import { RoleplayScenarios } from "@/components/roleplay-scenarios"
import { RoleplayChat } from "@/components/roleplay-chat"
import { RoleplayResult } from "@/components/roleplay-result"
import type { Scenario } from "@/lib/scenarios"
import { Id } from "@/convex/_generated/dataModel"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const router = useRouter()
  const progress = useQuery(api.progress.get)
  const dashboard = useQuery(api.progress.getDashboard)
  const [showChat, setShowChat] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [showJournal, setShowJournal] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [showRoleplay, setShowRoleplay] = useState(false)
  const [roleplayScenario, setRoleplayScenario] = useState<Scenario | null>(null)
  const [roleplayResult, setRoleplayResult] = useState<{
    sessionId: Id<"roleplaySessions">
    messages: { role: "user" | "assistant"; content: string }[]
    scenario: Scenario
  } | null>(null)
  const todayReview = useQuery(api.review.getTodayReview)

  const level = progress?.currentLevel ?? 3
  const chapter = progress?.currentChapter ?? 1
  const lessons = useQuery(api.lessons.list, { level, chapter })

  const needsOnboarding = progress !== undefined && (!progress || !progress.onboardingCompleted)

  useEffect(() => {
    if (needsOnboarding) router.replace("/onboarding")
  }, [needsOnboarding, router])

  // Still loading
  if (progress === undefined) return null

  // No progress or onboarding incomplete → onboarding
  if (needsOnboarding) return null

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

  const lessonContext = nextLesson
    ? `Lesson: ${nextLesson.title} (${nextLesson.titleJp}). Goal: ${nextLesson.goal}`
    : ""

  return (
    <>
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

        {/* Daily Review card */}
        <button
          onClick={() => setShowReview(true)}
          className="card-raised p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <RotateCcw size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Daily Review</p>
            <p className="text-caption text-text-tertiary">
              {todayReview?.completed ? "Completed today" : "Personalized exercises from your mistakes"}
            </p>
          </div>
          {todayReview?.completed && (
            <span className="text-accent text-caption font-medium">Done</span>
          )}
        </button>

        {nextLesson ? (
          <LessonCard
            lesson={nextLesson}
            completed={dashboard.completedLessons.includes(nextLesson.lessonKey)}
          />
        ) : (
          <div className="card-raised p-6 text-center">
            <p className="text-[28px] mb-2">🎉</p>
            <h3 className="mb-1">All lessons completed!</h3>
            <p className="text-text-secondary text-base">
              Great work. New content coming soon.
            </p>
          </div>
        )}

        {/* Practice Chat card */}
        <button
          onClick={() => setShowChat(true)}
          className="card-raised p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <MessageCircle size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Practice Chat</p>
            <p className="text-caption text-text-tertiary">Warm up with an AI conversation partner</p>
          </div>
        </button>

        {/* Roleplay Scenarios card */}
        <button
          onClick={() => setShowRoleplay(true)}
          className="card-raised p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Users size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Roleplay</p>
            <p className="text-caption text-text-tertiary">Practice real-life conversations</p>
          </div>
        </button>

        {/* Create Custom Lesson card */}
        <button
          onClick={() => setShowCreate(true)}
          className="card-raised p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Sparkles size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Create Lesson</p>
            <p className="text-caption text-text-tertiary">Generate a lesson on any topic you like</p>
          </div>
        </button>

        {/* Grammar Journal card */}
        <button
          onClick={() => setShowJournal(true)}
          className="card-raised p-5 flex items-center gap-4 text-left active:scale-[0.98] transition-transform"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Grammar Journal</p>
            <p className="text-caption text-text-tertiary">AI explanations for your mistakes</p>
          </div>
        </button>

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

      <AnimatePresence>
        {showChat && (
          <ConversationChat
            lessonContext={lessonContext}
            weakPoints={dashboard.weakPoints.map((wp) => wp.term)}
            practiceGoals={dashboard.practiceGoals}
            onClose={() => setShowChat(false)}
          />
        )}
        {showCreate && (
          <CreateLesson
            level={level}
            chapter={chapter}
            onClose={() => setShowCreate(false)}
          />
        )}
        {showJournal && (
          <GrammarJournal onClose={() => setShowJournal(false)} />
        )}
        {showReview && (
          <DailyReview onClose={() => setShowReview(false)} />
        )}
        {showRoleplay && !roleplayScenario && !roleplayResult && (
          <RoleplayScenarios
            onSelect={(scenario) => {
              setShowRoleplay(false)
              setRoleplayScenario(scenario)
            }}
            onClose={() => setShowRoleplay(false)}
          />
        )}
        {roleplayScenario && !roleplayResult && (
          <RoleplayChat
            scenario={roleplayScenario}
            onComplete={(sessionId, messages) => {
              setRoleplayResult({ sessionId, messages, scenario: roleplayScenario })
              setRoleplayScenario(null)
            }}
            onClose={() => setRoleplayScenario(null)}
          />
        )}
        {roleplayResult && (
          <RoleplayResult
            sessionId={roleplayResult.sessionId}
            scenario={roleplayResult.scenario}
            messages={roleplayResult.messages}
            onClose={() => setRoleplayResult(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
