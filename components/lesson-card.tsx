"use client"

import Link from "next/link"
import { Lesson } from "@/lib/types"
import { Button } from "./button"

type LessonCardProps = {
  lesson: Lesson
  completed: boolean
}

const typeLabel: Record<string, string> = {
  LISTENING: "Listening",
  SPEAKING: "Speaking",
  REVIEW: "Review",
}

export function LessonCard({ lesson, completed }: LessonCardProps) {
  return (
    <div className="bg-surface rounded-2xl p-5">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-caption text-text-secondary font-medium">
          Lesson {lesson.number}
        </span>
        <span className="text-caption text-text-tertiary">
          {typeLabel[lesson.lessonType]}
        </span>
        {completed && (
          <span className="text-caption text-accent font-medium ml-auto">Done</span>
        )}
      </div>

      <h2 className="mb-0.5">{lesson.title}</h2>
      <p className="text-text-secondary text-caption mb-1">{lesson.titleJp}</p>
      <p className="text-text-secondary text-[15px] mb-4">{lesson.goal}</p>

      <Link href={`/exercise/${lesson.id}`}>
        <Button className="w-full">{completed ? "Practice Again" : "Start Practice"}</Button>
      </Link>
    </div>
  )
}
