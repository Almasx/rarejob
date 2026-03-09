"use client"

import { Button } from "@/components/button"
import { WeakPointRow } from "@/components/weak-point-row"
import { AnswerResult } from "@/lib/types"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

type SessionResultProps = {
  answers: AnswerResult[]
  lessonTitle: string
}

export function SessionResult({ answers, lessonTitle }: SessionResultProps) {
  const router = useRouter()
  const correctCount = answers.filter((a) => a.correct).length
  const pct = Math.round((correctCount / answers.length) * 100)

  const weakPoints = answers
    .filter((a) => !a.correct)
    .map((a) => {
      if (a.exercise.type === "flashcard") {
        return { term: a.exercise.data.front, translation: a.exercise.data.back, wrongCount: 1 }
      }
      if (a.exercise.type === "translate") {
        return { term: a.exercise.data.sentenceJp, translation: a.exercise.data.correct, wrongCount: 1 }
      }
      return { term: a.exercise.data.blank, translation: a.exercise.data.sentence, wrongCount: 1 }
    })

  return (
    <motion.div
      className="px-5 pt-14 pb-10 flex flex-col gap-3"
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={springGentle}
    >
      <div className="card-raised p-6 pb-6">
        <h2>
          {pct >= 80 ? "Nice work" : pct >= 50 ? "Getting there" : "Keep practicing"}
        </h2>
        <p className="text-text-secondary text-base mt-1 mb-6">
          {correctCount} of {answers.length} correct &middot; {lessonTitle}
        </p>
        <div className="flex gap-1">
          {answers.map((a, i) => (
            <div
              key={i}
              className={cn("flex-1 h-2 rounded-full", a.correct ? "bg-accent" : "bg-border")}
            />
          ))}
        </div>
      </div>

      {weakPoints.length > 0 && (
        <div className="card-raised px-5 pt-5 pb-2">
          <h3 className="mb-1">Review these</h3>
          <div className="divide-y divide-border">
            {weakPoints.map((wp, i) => (
              <WeakPointRow key={i} weakPoint={wp} />
            ))}
          </div>
        </div>
      )}

      <Button className="w-full" onClick={() => router.push("/")}>
        Done
      </Button>
    </motion.div>
  )
}
