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
  finished: boolean
}

type Action =
  | { type: "ANSWER"; result: AnswerResult }
  | { type: "FINISH" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return { ...state, currentIndex: state.currentIndex + 1, answers: [...state.answers, action.result] }
    case "FINISH":
      return { ...state, finished: true }
    default:
      return state
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
    finished: false,
  })

  const handleAnswer = useCallback(
    (exercise: Exercise, correct: boolean, userAnswer: string) => {
      dispatch({ type: "ANSWER", result: { exercise, correct, userAnswer } })
    },
    []
  )

  const lesson = lessons.find((l) => l.id === lessonId)

  // Session complete — show result inline
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
      <div className="px-4 pt-12 text-center">
        <p className="text-text-secondary">Lesson not found.</p>
      </div>
    )
  }

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
      <div className="px-4 pt-12 pb-8 flex flex-col gap-6">
        <motion.div
          className="text-center"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <p className="text-[64px] font-bold text-accent leading-none">{pct}%</p>
          <p className="text-text-secondary mt-2">
            {correctCount} of {exercises.length} correct
          </p>
        </motion.div>

        {weakPoints.length > 0 && (
          <div className="bg-surface rounded-2xl p-5">
            <h3 className="mb-2">Review these</h3>
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
      </div>
    )
  }

  const current = exercises[state.currentIndex]

  return (
    <div className="px-4 pt-8 pb-4 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push("/")}
          className="text-text-secondary text-caption"
        >
          Cancel
        </button>
        <div className="flex-1">
          <ScoreBar current={state.currentIndex} total={exercises.length} />
        </div>
        <span className="text-caption text-text-secondary">
          {state.currentIndex + 1}/{exercises.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={state.currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.2 }}
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
