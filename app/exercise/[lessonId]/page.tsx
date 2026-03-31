"use client"

import { ExerciseTimer } from "@/components/exercise-timer"
import { FillBlank } from "@/components/fill-blank"
import { Flashcard } from "@/components/flashcard"
import { ScoreBar } from "@/components/score-bar"
import { SessionResult } from "@/components/session-result"
import { Shadowing } from "@/components/shadowing"
import { TranslateQuiz } from "@/components/translate-quiz"
import { api } from "@/convex/_generated/api"
import { Exercise, AnswerResult, Flashcard as FlashcardType, TranslateItem, FillBlankItem, ShadowingItem } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { useMutation, useQuery } from "convex/react"
import { AnimatePresence, motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useMemo, useReducer } from "react"
import useMeasure from "react-use-measure"

const EXERCISE_DURATION = 5 * 60 // 5 minutes

type State = {
  currentIndex: number
  answers: AnswerResult[]
  submitted: boolean
  timeUp: boolean
  sessionId: string | null
}

type Action =
  | { type: "ANSWER"; result: AnswerResult }
  | { type: "SUBMITTED" }
  | { type: "TIME_UP" }
  | { type: "SET_SESSION_ID"; sessionId: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ANSWER":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        answers: [...state.answers, action.result],
      }
    case "SUBMITTED":
      return { ...state, submitted: true }
    case "TIME_UP":
      return { ...state, timeUp: true }
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.sessionId }
  }
}

function mapAnswerForMutation(a: AnswerResult) {
  if (a.exercise.type === "flashcard") {
    return {
      exerciseType: "flashcard" as const,
      question: a.exercise.data.front,
      correctAnswer: a.exercise.data.back,
      userAnswer: a.userAnswer,
      correct: a.correct,
    }
  }
  if (a.exercise.type === "translate") {
    return {
      exerciseType: "translate" as const,
      question: a.exercise.data.sentenceJp,
      correctAnswer: a.exercise.data.correct,
      userAnswer: a.userAnswer,
      correct: a.correct,
    }
  }
  if (a.exercise.type === "shadowing") {
    return {
      exerciseType: "shadowing" as const,
      question: a.exercise.data.lineEn,
      correctAnswer: a.exercise.data.lineEn,
      userAnswer: a.userAnswer,
      correct: a.correct,
    }
  }
  return {
    exerciseType: "fill-blank" as const,
    question: a.exercise.data.sentence,
    correctAnswer: a.exercise.data.blank,
    userAnswer: a.userAnswer,
    correct: a.correct,
  }
}

const springGentle = { type: "spring" as const, duration: 0.4, bounce: 0 }

export default function ExercisePage() {
  const params = useParams()
  const router = useRouter()
  const lessonId = params.lessonId as string

  const lesson = useQuery(api.lessons.getByKey, { lessonKey: lessonId })
  const completeSession = useMutation(api.sessions.complete)

  const exercises = useMemo(() => {
    if (!lesson) return []
    const all: Exercise[] = [
      ...lesson.dialogue.map((d) => ({
        type: "shadowing" as const,
        data: d as ShadowingItem,
      })),
      ...lesson.flashcards.map((f) => ({ type: "flashcard" as const, data: f as FlashcardType })),
      ...lesson.translate.map((t) => ({ type: "translate" as const, data: t as TranslateItem })),
      ...lesson.fillBlank.map((fb) => ({ type: "fill-blank" as const, data: fb as FillBlankItem })),
    ]
    return shuffleArray(all).slice(0, 10)
  }, [lesson])

  const [measureRef, bounds] = useMeasure()
  const [state, dispatch] = useReducer(reducer, {
    currentIndex: 0,
    answers: [],
    submitted: false,
    timeUp: false,
    sessionId: null,
  })

  const handleAnswer = useCallback(
    (exercise: Exercise, correct: boolean, userAnswer: string) => {
      dispatch({ type: "ANSWER", result: { exercise, correct, userAnswer } })
    },
    []
  )

  const handleTimeUp = useCallback(() => {
    dispatch({ type: "TIME_UP" })
  }, [])

  // Submit once when all answers are in or time is up
  const done = (state.currentIndex >= exercises.length && exercises.length > 0) || state.timeUp
  if (done && !state.submitted) {
    dispatch({ type: "SUBMITTED" })
    if (state.answers.length > 0) {
      completeSession({
        lessonKey: lessonId,
        answers: state.answers.map(mapAnswerForMutation),
      }).then((result) => {
        if (result?.sessionId) {
          dispatch({ type: "SET_SESSION_ID", sessionId: result.sessionId })
        }
      })
    }
  }

  if (lesson === undefined) {
    return (
      <div className="px-5 pt-10 pb-6 flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-5 rounded bg-fill-empty animate-pulse" />
          <div className="flex-1 h-2 rounded-full bg-fill-empty animate-pulse" />
          <div className="w-10 h-5 rounded bg-fill-empty animate-pulse" />
          <div className="w-8 h-5 rounded bg-fill-empty animate-pulse" />
        </div>
        <div className="card-raised p-6 flex flex-col gap-4">
          <div className="h-5 w-2/3 rounded bg-fill-empty animate-pulse" />
          <div className="h-4 w-full rounded bg-fill-empty animate-pulse" />
          <div className="h-4 w-5/6 rounded bg-fill-empty animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-fill-empty animate-pulse mt-4" />
          <div className="h-12 w-full rounded-xl bg-fill-empty animate-pulse" />
        </div>
      </div>
    )
  }

  if (!lesson || exercises.length === 0) {
    return (
      <div className="px-5 pt-14 text-center">
        <p className="text-text-secondary">Lesson not found.</p>
      </div>
    )
  }

  if (done) {
    return <SessionResult answers={state.answers} lessonTitle={lesson.title} sessionId={state.sessionId} />
  }

  const current = exercises[state.currentIndex]

  return (
    <div className="px-5 pt-10 pb-6 flex flex-col gap-5">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/")}
          className="text-text-secondary text-base font-medium active:opacity-60 transition-opacity"
        >
          Cancel
        </button>
        <div className="flex-1">
          <ScoreBar current={state.currentIndex} total={exercises.length} />
        </div>
        <ExerciseTimer
          durationSeconds={EXERCISE_DURATION}
          onTimeUp={handleTimeUp}
          paused={done}
        />
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
              {current.type === "shadowing" && (
                <Shadowing
                  dialogue={current.data}
                  onRate={(rating) => handleAnswer(current, rating !== "again", current.data.lineEn)}
                />
              )}
              {current.type === "flashcard" && (
                <Flashcard
                  data={current.data}
                  onRate={(rating) => handleAnswer(current, rating !== "again", current.data.back)}
                />
              )}
              {current.type === "translate" && (
                <TranslateQuiz
                  data={current.data}
                  onAnswer={(correct, selected) => handleAnswer(current, correct, selected)}
                />
              )}
              {current.type === "fill-blank" && (
                <FillBlank
                  data={current.data}
                  onAnswer={(correct, selected) => handleAnswer(current, correct, selected)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
