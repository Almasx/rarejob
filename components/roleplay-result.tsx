"use client"

import { BookRareJobCta } from "@/components/book-rarejob-cta"
import { Button } from "@/components/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/scenarios"
import { useAction } from "convex/react"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Dimension = {
  level: number
  comment: string
  commentJp: string
  examples: string[]
}

type Evaluation = {
  score: number
  goalAchievement: { level: number; reason: string; reasonJp: string }
  range: Dimension
  accuracy: Dimension
  fluency: Dimension
}

type RoleplayResultProps = {
  sessionId: Id<"roleplaySessions">
  scenario: Scenario
  messages: Message[]
  onClose: () => void
}

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

const GOAL_LABELS: Record<number, { en: string; jp: string; detail: string }> = {
  4: {
    en: "Very Good",
    jp: "とても良い",
    detail: "Could complete the task with ease",
  },
  3: {
    en: "Good",
    jp: "良い",
    detail: "Could complete the task with some clarifications",
  },
  2: {
    en: "Fair",
    jp: "普通",
    detail: "Could complete the task with additional instructions",
  },
  1: {
    en: "Poor",
    jp: "要練習",
    detail: "Could somehow complete the task with difficulty",
  },
}

function LevelPips({ level }: { level: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={cn(
            "w-5 h-1.5 rounded-full",
            i <= level ? "bg-accent" : "bg-border",
          )}
        />
      ))}
    </div>
  )
}

function DimensionCard({
  label,
  labelJp,
  dimension,
}: {
  label: string
  labelJp: string
  dimension: Dimension
}) {
  return (
    <div className="card-raised p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-semibold text-base">{label}</p>
          <p className="text-caption text-text-tertiary">{labelJp}</p>
        </div>
        <LevelPips level={dimension.level} />
      </div>
      <p className="text-sm text-text-primary leading-relaxed">{dimension.comment}</p>
      <p className="text-sm text-text-secondary mt-1 leading-relaxed">{dimension.commentJp}</p>
      {dimension.examples.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border flex flex-col gap-1.5">
          {dimension.examples.map((ex, i) => (
            <p key={i} className="text-caption text-text-tertiary">
              <span className="text-text-secondary">&ldquo;{ex}&rdquo;</span>
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export function RoleplayResult({ sessionId, scenario, messages, onClose }: RoleplayResultProps) {
  const evaluate = useAction(api.openai.roleplayEvaluate)
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    evaluate({
      sessionId,
      scenarioId: scenario.id,
      userRole: scenario.userRole,
      aiRole: scenario.aiRole,
      goal: scenario.goal,
      messages,
    })
      .then(setEvaluation)
      .catch(() => setError(true))
  }, [sessionId, scenario, messages, evaluate])

  if (!evaluation && !error) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={springGentle}
      >
        <div className="mx-auto w-full max-w-[430px] flex flex-col items-center justify-center h-dvh gap-4">
          <Loader2 size={32} className="text-accent animate-spin" />
          <div className="text-center">
            <p className="font-semibold text-base mb-1">Evaluating your conversation</p>
            <p className="text-caption text-text-tertiary">Scoring goal achievement, range, accuracy, fluency...</p>
          </div>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex flex-col bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={springGentle}
      >
        <div className="mx-auto w-full max-w-[430px] flex flex-col items-center justify-center h-dvh gap-4 px-5">
          <p className="text-text-secondary text-base text-center">
            Couldn&apos;t generate evaluation. Your conversation was still saved.
          </p>
          <Button onClick={onClose}>Done</Button>
        </div>
      </motion.div>
    )
  }

  const goal = evaluation!.goalAchievement
  const goalLabel = GOAL_LABELS[goal.level] ?? GOAL_LABELS[2]
  const goalColor =
    goal.level === 4 ? "text-accent" :
    goal.level === 3 ? "text-accent" :
    goal.level === 2 ? "text-yellow-600" :
    "text-red-500"

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={springGentle}
    >
      <div className="mx-auto w-full max-w-[430px] flex flex-col h-dvh">
        <div className="flex-1 overflow-y-auto px-5 pt-14 pb-10 flex flex-col gap-3">
          {/* Lesson Goal Achievement — primary */}
          <div className="card-raised p-6 text-center">
            <p className="text-caption text-text-tertiary mb-2 uppercase tracking-wide">
              Lesson Goal Achievement
            </p>
            <p className={cn("text-[40px] font-bold leading-none", goalColor)}>
              {goal.level}
              <span className="text-text-tertiary text-xl font-medium">/4</span>
            </p>
            <p className="text-base font-semibold mt-2">{goalLabel.en}</p>
            <p className="text-caption text-text-tertiary">{goalLabel.detail}</p>
            <p className="text-caption text-text-tertiary mt-1">{goalLabel.jp}</p>
            <div className="mt-4 pt-4 border-t border-border text-left">
              <p className="text-sm text-text-primary leading-relaxed">{goal.reason}</p>
              <p className="text-sm text-text-secondary mt-1 leading-relaxed">{goal.reasonJp}</p>
            </div>
          </div>

          <p className="text-caption text-text-tertiary uppercase tracking-wide px-1 mt-2">
            Personalized Feedback
          </p>

          <DimensionCard label="Range" labelJp="表現の幅" dimension={evaluation!.range} />
          <DimensionCard label="Accuracy" labelJp="正確さ" dimension={evaluation!.accuracy} />
          <DimensionCard label="Fluency" labelJp="流暢さ" dimension={evaluation!.fluency} />

          <BookRareJobCta
            variant="inline"
            headline="Try this with a real tutor"
            subtext="Book your next RareJob lesson to practice live"
            className="mt-2"
          />

          <Button className="w-full mt-1" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
