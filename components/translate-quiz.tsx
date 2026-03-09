"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { TranslateItem } from "@/lib/types"
import { ExerciseCard } from "./exercise-card"
import { cn, shuffleArray } from "@/lib/utils"
import { useMemo } from "react"

type TranslateQuizProps = {
  data: TranslateItem
  onAnswer: (correct: boolean) => void
}

export function TranslateQuiz({ data, onAnswer }: TranslateQuizProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const choices = useMemo(
    () => shuffleArray([data.correct, ...data.wrong]),
    [data]
  )

  const handleSelect = (choice: string) => {
    if (selected) return
    setSelected(choice)
    setTimeout(() => onAnswer(choice === data.correct), 800)
  }

  return (
    <ExerciseCard>
      <span className="text-caption text-text-tertiary mb-1">Translate</span>
      <p className="text-xl font-semibold mb-6 leading-relaxed">{data.sentenceJp}</p>

      <div className="flex flex-col gap-3 mt-auto">
        {choices.map((choice) => {
          const isCorrect = choice === data.correct
          const isSelected = choice === selected
          const showResult = selected !== null

          return (
            <motion.button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={cn(
                "text-left px-4 py-3 rounded-xl text-[15px] transition-colors",
                !showResult && "bg-background",
                showResult && isCorrect && "bg-accent-soft text-accent font-medium",
                showResult && isSelected && !isCorrect && "bg-red-50 text-red-600",
                showResult && !isSelected && !isCorrect && "bg-background opacity-50"
              )}
              whileTap={!selected ? { scale: 0.98 } : undefined}
            >
              {choice}
            </motion.button>
          )
        })}
      </div>
    </ExerciseCard>
  )
}
