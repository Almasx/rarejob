"use client"

import { Button } from "@/components/button"
import { FillBlank } from "@/components/fill-blank"
import { Flashcard } from "@/components/flashcard"
import { ScoreBar } from "@/components/score-bar"
import { TranslateQuiz } from "@/components/translate-quiz"
import { WeakPointRow } from "@/components/weak-point-row"
import { lessons } from "@/lib/data"
import { useProgress } from "@/lib/progress-context"
import { AnswerResult, Exercise, WeakPoint } from "@/lib/types"
import { cn, shuffleArray } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react"
import useMeasure from "react-use-measure"

type State = {
  currentIndex: number
  answers: AnswerResult[]
}

type Action = { type: "ANSWER"; result: AnswerResult }

function reducer(state: State, action: Action): State {
  return {
    currentIndex: state.currentIndex + 1,
    answers: [...state.answers, action.result],
  }
}

function buildExercises(lessonId: string): Exercise[] {
  const lesson = lessons.find((l) => l.id === lessonId)
  if (!lesson) return []

  const exercises: Exercise[] = [
    ...lesson.practice.flashcards.map((f) => ({ type: "flashcard" as const, data: f })),
    ...lesson.practice.translate.map((t) => ({ type: "translate" as const, data: t })),
    ...lesson.practice.fillBlank.map((fb) => ({ type: "fill-blank" as const, data: fb })),
  ]

  return shuffleArray(exercises).slice(0, 10)
}

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

export default function ExercisePage() {
  const params = useParams()
  const router = useRouter()
  const { completeSession } = useProgress()
  const lessonId = params.lessonId as string
  const savedRef = useRef(false)

  const exercises = useMemo(() => buildExercises(lessonId), [lessonId])
  const [measureRef, bounds] = useMeasure()

  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    answers: [],
  })

  const handleAnswer = useCallback(
    (exercise: Exercise, correct: boolean, userAnswer: string) => {
      dispatch({ type: "ANSWER", result: { exercise, correct, userAnswer } })
    },
    []
  )

  const lesson = lessons.find((l) => l.id === lessonId)
  const done = state.currentIndex >= exercises.length && exercises.length > 0

  useEffect(() => {
    if (done && !savedRef.current) {
      savedRef.current = true
      const weakPoints: WeakPoint[] = state.answers
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
      completeSession(lessonId, weakPoints)
    }
  }, [done, state.answers, completeSession, lessonId])

  if (!lesson || exercises.length === 0) {
    return (
      <div className="px-5 pt-14 text-center">
        <p className="text-text-secondary">Lesson not found.</p>
      </div>
    )
  }

  // Result screen
  if (done) {
    const correctCount = state.answers.filter((a) => a.correct).length
    const pct = Math.round((correctCount / exercises.length) * 100)
    const weakPoints = state.answers
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
          <p className="text-text-tertiary text-[15px] mt-1 mb-6">
            {correctCount} of {exercises.length} correct &middot; {lesson.title}
          </p>
          <div className="flex gap-1">
            {state.answers.map((a, i) => (
              <div
                key={i}
                className={cn("flex-1 h-2 rounded-full", a.correct ? "bg-accent" : "bg-border")}
              />
            ))}
          </div>
        </div>

        {weakPoints.length > 0 && (
          <div className="card-raised p-5">
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

  // Exercise screen
  const current = exercises[state.currentIndex]

  return (
    <div className="px-5 pt-10 pb-6 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-text-tertiary text-[15px] font-medium active:opacity-60 transition-opacity"
        >
          Cancel
        </button>
        <div className="flex-1">
          <ScoreBar current={state.currentIndex} total={exercises.length} />
        </div>
        <span className="text-caption text-text-tertiary font-medium tabular-nums">
          {state.currentIndex + 1}/{exercises.length}
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
                  data={current.data}
                  onRate={(rating) => handleAnswer(current, rating !== "again", rating)}
                />
              )}
              {current.type === "translate" && (
                <TranslateQuiz
                  data={current.data}
                  onAnswer={(correct) => handleAnswer(current, correct, "")}
                />
              )}
              {current.type === "fill-blank" && (
                <FillBlank
                  data={current.data}
                  onAnswer={(correct) => handleAnswer(current, correct, "")}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
