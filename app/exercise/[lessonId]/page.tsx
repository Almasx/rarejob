"use client"

import { useParams, useRouter } from "next/navigation"
import { useReducer, useMemo, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { lessons } from "@/lib/data"
import { Exercise, AnswerResult, WeakPoint } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { useProgress } from "@/lib/progress-context"
import { ScoreBar } from "@/components/score-bar"
import { Flashcard } from "@/components/flashcard"
import { TranslateQuiz } from "@/components/translate-quiz"
import { FillBlank } from "@/components/fill-blank"
import { WeakPointRow } from "@/components/weak-point-row"
import { Button } from "@/components/button"

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

export default function ExercisePage() {
  const params = useParams()
  const router = useRouter()
  const { completeSession } = useProgress()
  const lessonId = params.lessonId as string
  const sessionSaved = useRef(false)

  const exercises = useMemo(() => buildExercises(lessonId), [lessonId])

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

  if (done && !sessionSaved.current) {
    sessionSaved.current = true
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
      <div className="px-5 pt-14 pb-10 flex flex-col gap-7">
        <motion.div
          className="card-raised p-8 text-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[72px] font-bold text-accent leading-none tracking-tight">{pct}%</p>
          <p className="text-text-secondary mt-3 text-[17px]">
            {correctCount} of {exercises.length} correct
          </p>
        </motion.div>

        {weakPoints.length > 0 && (
          <motion.div
            className="card p-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-1">Review these</h3>
            <div className="divide-y divide-border">
              {weakPoints.map((wp, i) => (
                <WeakPointRow key={i} weakPoint={wp} />
              ))}
            </div>
          </motion.div>
        )}

        <Button className="w-full" onClick={() => router.push("/")}>
          Done
        </Button>
      </div>
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

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentIndex}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
  )
}
