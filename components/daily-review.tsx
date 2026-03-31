"use client"

import { Button } from "@/components/button"
import { Flashcard } from "@/components/flashcard"
import { FillBlank } from "@/components/fill-blank"
import { ScoreBar } from "@/components/score-bar"
import { TranslateQuiz } from "@/components/translate-quiz"
import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { useAction, useMutation, useQuery } from "convex/react"
import { AnimatePresence, motion } from "framer-motion"
import { Loader2, X } from "lucide-react"
import { useCallback, useReducer } from "react"
import useMeasure from "react-use-measure"

type ReviewExercise = {
  type: "flashcard" | "translate" | "fill-blank"
  question: string
  correctAnswer: string
  options?: string[]
  source: "weak-point" | "recent"
  wrongCount?: number
}

type State = {
  currentIndex: number
  correctCount: number
  total: number
  done: boolean
}

type Action = { type: "ANSWER"; correct: boolean } | { type: "DONE" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        correctCount: state.correctCount + (action.correct ? 1 : 0),
      }
    case "DONE":
      return { ...state, done: true }
  }
}

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

type DailyReviewProps = {
  onClose: () => void
}

export function DailyReview({ onClose }: DailyReviewProps) {
  const todayReview = useQuery(api.review.getTodayReview)
  const generateReview = useAction(api.openai.generateDailyReview)
  const completeReview = useMutation(api.review.completeReview)
  const [measureRef, bounds] = useMeasure()
  const [generating, setGenerating] = useReducer(() => true, false)

  const exercises: ReviewExercise[] = todayReview?.exercises ?? []

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    correctCount: 0,
    total: exercises.length,
    done: todayReview?.completed ?? false,
  })

  const handleGenerate = useCallback(async () => {
    setGenerating()
    await generateReview({})
  }, [generateReview])

  const handleAnswer = useCallback((correct: boolean) => {
    dispatch({ type: "ANSWER", correct })
  }, [])

  // When all exercises done, complete the review
  const allDone = exercises.length > 0 && state.currentIndex >= exercises.length && !state.done
  if (allDone) {
    dispatch({ type: "DONE" })
    const score = exercises.length > 0
      ? Math.round((state.correctCount / exercises.length) * 100)
      : 0
    if (todayReview) {
      completeReview({ reviewId: todayReview._id, score })
    }
  }

  const current = exercises[state.currentIndex]

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <div className="mx-auto w-full max-w-[430px] flex flex-col h-dvh">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-base">Daily Review</h3>
            <p className="text-caption text-text-tertiary">Personalized from your mistakes</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary active:opacity-60 transition-opacity p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6">
          {/* No review yet — generate */}
          {!todayReview && !generating && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <p className="text-text-secondary text-base text-center">
                Generate today&apos;s personalized review based on your weak points and recent practice.
              </p>
              <Button onClick={handleGenerate}>Generate Review</Button>
            </div>
          )}

          {/* Generating */}
          {(!todayReview && generating) && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <Loader2 size={32} className="text-accent animate-spin" />
              <div className="text-center">
                <p className="font-semibold text-base mb-1">Creating your review</p>
                <p className="text-caption text-text-tertiary">Picking exercises from your weak points...</p>
              </div>
            </div>
          )}

          {/* Already completed today */}
          {todayReview?.completed && !state.done && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <p className="text-[28px]">✅</p>
              <h3>Review completed!</h3>
              <p className="text-text-secondary text-base text-center">
                Score: {todayReview.score}% — Come back tomorrow for a new review.
              </p>
              <Button onClick={onClose}>Done</Button>
            </div>
          )}

          {/* Exercises in progress */}
          {todayReview && !todayReview.completed && !state.done && current && (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <ScoreBar current={state.currentIndex} total={exercises.length} />
                </div>
                <span className="text-caption text-text-tertiary font-medium tabular-nums">
                  {state.currentIndex + 1}/{exercises.length}
                </span>
              </div>

              <div className="flex justify-center">
                <span className={cn(
                  "text-caption font-medium px-3 py-1 rounded-full",
                  current.source === "weak-point"
                    ? "bg-wrong/10 text-wrong"
                    : "bg-accent/10 text-accent"
                )}>
                  {current.source === "weak-point" ? "Weak Point" : "Recently Learned"}
                </span>
              </div>

              <motion.div
                animate={{ height: bounds.height > 0 ? bounds.height : "auto" }}
                transition={springGentle}
                className="overflow-visible"
              >
                <div ref={measureRef}>
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={state.currentIndex}
                      initial={{ opacity: 0, filter: "blur(8px)" }}
                      animate={{ opacity: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, filter: "blur(8px)" }}
                      transition={springGentle}
                    >
                      {current.type === "flashcard" && (
                        <Flashcard
                          data={{
                            front: current.question,
                            back: current.correctAnswer,
                            type: "en-to-jp",
                          }}
                          onRate={(rating) => handleAnswer(rating !== "again")}
                        />
                      )}
                      {current.type === "translate" && current.options && (
                        <TranslateQuiz
                          data={{
                            sentenceJp: current.question,
                            correct: current.correctAnswer,
                            wrong: current.options.filter((o) => o !== current.correctAnswer),
                          }}
                          onAnswer={(correct, _selected) => handleAnswer(correct)}
                        />
                      )}
                      {current.type === "fill-blank" && current.options && (
                        <FillBlank
                          data={{
                            sentence: current.question,
                            blank: current.correctAnswer,
                            options: current.options,
                          }}
                          onAnswer={(correct, _selected) => handleAnswer(correct)}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          )}

          {/* Just finished */}
          {state.done && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center gap-4 py-20"
            >
              <p className="text-[28px]">🎯</p>
              <h3>
                {state.correctCount === exercises.length
                  ? "Perfect!"
                  : state.correctCount >= exercises.length * 0.7
                    ? "Great job!"
                    : "Keep going!"}
              </h3>
              <p className="text-text-secondary text-base text-center">
                {state.correctCount} of {exercises.length} correct — Come back tomorrow!
              </p>
              <Button onClick={onClose}>Done</Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
