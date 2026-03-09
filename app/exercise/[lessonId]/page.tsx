"use client"

import { FillBlank } from "@/components/fill-blank"
import { Flashcard } from "@/components/flashcard"
import { ScoreBar } from "@/components/score-bar"
import { SessionResult } from "@/components/session-result"
import { TranslateQuiz } from "@/components/translate-quiz"
import { api } from "@/convex/_generated/api"
import { getUserId } from "@/lib/userId"
import { Exercise, AnswerResult, Flashcard as FlashcardType, TranslateItem, FillBlankItem } from "@/lib/types"
import { shuffleArray } from "@/lib/utils"
import { useMutation, useQuery } from "convex/react"
import { AnimatePresence, motion } from "framer-motion"
import { useParams, useRouter } from "next/navigation"
import { useCallback, useMemo, useReducer } from "react"
import useMeasure from "react-use-measure"

type State = {
  currentIndex: number
  answers: AnswerResult[]
  submitted: boolean
}

type Action =
  | { type: "ANSWER"; result: AnswerResult }
  | { type: "SUBMITTED" }

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
  const userId = getUserId()

  const lesson = useQuery(api.lessons.getByKey, { lessonKey: lessonId })
  const completeSession = useMutation(api.sessions.complete)

  const exercises = useMemo(() => {
    if (!lesson) return []
    const all: Exercise[] = [
      ...lesson.flashcards.map((f) => ({ type: "flashcard" as const, data: f as FlashcardType })),
      ...lesson.translate.map((t) => ({ type: "translate" as const, data: t as TranslateItem })),
      ...lesson.fillBlank.map((fb) => ({ type: "fill-blank" as const, data: fb as FillBlankItem })),
    ]
    return shuffleArray(all).slice(0, 10)
  }, [lesson])

  const [measureRef, bounds] = useMeasure()
  const [state, dispatch] = useReducer(reducer, { currentIndex: 0, answers: [], submitted: false })

  const handleAnswer = useCallback(
    (exercise: Exercise, correct: boolean, userAnswer: string) => {
      dispatch({ type: "ANSWER", result: { exercise, correct, userAnswer } })
    },
    []
  )

  // Submit once when all answers are in, derived from state
  const done = state.currentIndex >= exercises.length && exercises.length > 0
  if (done && !state.submitted) {
    dispatch({ type: "SUBMITTED" })
    completeSession({
      userId,
      lessonKey: lessonId,
      answers: state.answers.map(mapAnswerForMutation),
    })
  }

  if (lesson === undefined) {
    return (
      <div className="px-5 pt-14 text-center">
        <div className="card-raised p-6 animate-pulse h-[300px]" />
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
    return <SessionResult answers={state.answers} lessonTitle={lesson.title} />
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
