"use client"

import { Button } from "@/components/button"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/scenarios"
import { useAction } from "convex/react"
import { motion } from "framer-motion"
import { Check, ChevronUp, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Evaluation = {
  score: number
  feedbackEn: string
  feedbackJp: string
  strengths: string[]
  improvements: string[]
}

type RoleplayResultProps = {
  sessionId: Id<"roleplaySessions">
  scenario: Scenario
  messages: Message[]
  onClose: () => void
}

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

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
            <p className="text-caption text-text-tertiary">Analyzing grammar, vocabulary, and communication...</p>
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

  const scoreColor =
    evaluation!.score >= 80 ? "text-accent" :
    evaluation!.score >= 50 ? "text-yellow-600" :
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
          {/* Score card */}
          <div className="card-raised p-6 text-center">
            <p className={cn("text-[48px] font-bold", scoreColor)}>
              {evaluation!.score}
            </p>
            <p className="text-text-secondary text-base mt-1">
              {evaluation!.score >= 80 ? "Great conversation!" :
               evaluation!.score >= 50 ? "Good effort!" :
               "Keep practicing!"}
            </p>
            <p className="text-caption text-text-tertiary mt-1">{scenario.title}</p>
          </div>

          {/* Feedback */}
          <div className="card-raised p-5">
            <p className="text-base text-text-primary leading-relaxed">{evaluation!.feedbackEn}</p>
            <p className="text-sm text-text-secondary mt-2 leading-relaxed">{evaluation!.feedbackJp}</p>
          </div>

          {/* Strengths */}
          {evaluation!.strengths.length > 0 && (
            <div className="card-raised p-5">
              <h3 className="mb-3 text-base">Strengths</h3>
              <div className="flex flex-col gap-2">
                {evaluation!.strengths.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {evaluation!.improvements.length > 0 && (
            <div className="card-raised p-5">
              <h3 className="mb-3 text-base">Areas to Improve</h3>
              <div className="flex flex-col gap-2">
                {evaluation!.improvements.map((s, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <ChevronUp size={16} className="text-yellow-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-text-secondary">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
