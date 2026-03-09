"use client"

import Link from "next/link"
import { Button } from "./button"
import { FunctionReturnType } from "convex/server"
import { api } from "@/convex/_generated/api"

type LessonSummary = FunctionReturnType<typeof api.lessons.list>[number]

type LessonCardProps = {
  lesson: LessonSummary
  completed: boolean
}

const typeLabel: Record<string, string> = {
  LISTENING: "Listening",
  SPEAKING: "Speaking",
  REVIEW: "Review",
}

export function LessonCard({ lesson, completed }: LessonCardProps) {
  return (
    <div className="card-raised p-6">
      <div className="mb-3">
        <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">
          Lesson {lesson.lessonNumber} &middot; {typeLabel[lesson.lessonType]}
        </span>
      </div>

      <h2 className="mb-1">{lesson.title}</h2>
      <p className="text-text-tertiary text-caption mb-2">{lesson.titleJp}</p>
      <p className="text-text-secondary text-base mb-6 leading-relaxed">{lesson.goal}</p>

      <Link href={`/exercise/${lesson.lessonKey}`}>
        <Button className="w-full">{completed ? "Practice Again" : "Start"}</Button>
      </Link>
    </div>
  )
}
