"use client"

import { BookRareJobCta } from "@/components/book-rarejob-cta"
import { Button } from "@/components/button"
import { WeakPointRow } from "@/components/weak-point-row"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { AnswerResult } from "@/lib/types"
import { cn } from "@/lib/utils"
import { useAction } from "convex/react"
import { motion } from "framer-motion"
import { BookOpen, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

type SessionResultProps = {
  answers: AnswerResult[]
  lessonTitle: string
  sessionId: string | null
}

export function SessionResult({ answers, lessonTitle, sessionId }: SessionResultProps) {
  const router = useRouter()
  const generateJournal = useAction(api.openai.generateGrammarJournal)
  const [journalStatus, setJournalStatus] = useState<"idle" | "loading" | "done" | "none">("idle")

  const hasWrongAnswers = answers.some((a) => !a.correct)

  // Auto-trigger journal generation when sessionId arrives
  useEffect(() => {
    if (!sessionId || !hasWrongAnswers || journalStatus !== "idle") return
    setJournalStatus("loading")
    generateJournal({ sessionId: sessionId as Id<"exerciseSessions"> })
      .then((result) => setJournalStatus(result ? "done" : "none"))
      .catch(() => setJournalStatus("none"))
  }, [sessionId, hasWrongAnswers, journalStatus, generateJournal])
  const correctCount = answers.filter((a) => a.correct).length
  const pct = answers.length > 0 ? Math.round((correctCount / answers.length) * 100) : 0

  const weakPoints = answers
    .filter((a) => !a.correct)
    .map((a) => {
      if (a.exercise.type === "flashcard") {
        return { term: a.exercise.data.front, translation: a.exercise.data.back, wrongCount: 1 }
      }
      if (a.exercise.type === "translate") {
        return { term: a.exercise.data.sentenceJp, translation: a.exercise.data.correct, wrongCount: 1 }
      }
      if (a.exercise.type === "shadowing") {
        return { term: a.exercise.data.lineEn, translation: a.exercise.data.lineJp, wrongCount: 1 }
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

      {journalStatus === "loading" && (
        <div className="card-raised p-5 flex items-center gap-3">
          <Loader2 size={18} className="text-accent animate-spin shrink-0" />
          <p className="text-base text-text-secondary">Analyzing your mistakes...</p>
        </div>
      )}

      {journalStatus === "done" && (
        <div className="card-raised p-5 flex items-center gap-4 text-left">

          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <BookOpen size={18} className="text-accent" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-base">Grammar Journal Updated</p>
            <p className="text-caption text-text-tertiary">Check your Grammar Journal on the dashboard</p>
          </div>
        </div>
      )}

      <BookRareJobCta variant="inline" />

      <Button className="w-full" onClick={() => router.push("/")}>
        Done
      </Button>
    </motion.div>
  )
}
