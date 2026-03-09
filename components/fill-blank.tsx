"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { FillBlankItem } from "@/lib/types"
import { ExerciseCard } from "./exercise-card"
import { cn, shuffleArray } from "@/lib/utils"

type FillBlankProps = {
  data: FillBlankItem
  onAnswer: (correct: boolean) => void
}

export function FillBlank({ data, onAnswer }: FillBlankProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const choices = useMemo(
    () => shuffleArray([...data.options]),
    [data]
  )

  const handleSelect = (choice: string) => {
    if (selected) return
    setSelected(choice)
    setTimeout(() => onAnswer(choice === data.blank), 800)
  }

  // Display sentence with blank highlighted
  const parts = data.sentence.split("___")

  return (
    <ExerciseCard>
      <span className="text-caption text-text-tertiary mb-1">Fill in the blank</span>

      <p className="text-xl font-semibold mb-6 leading-relaxed">
        {parts[0]}
        <span
          className={cn(
            "inline-block min-w-[80px] border-b-2 mx-1 text-center pb-0.5",
            selected === data.blank
              ? "border-accent text-accent"
              : selected
                ? "border-red-400 text-red-600"
                : "border-text-tertiary"
          )}
        >
          {selected || "\u00A0"}
        </span>
        {parts[1]}
      </p>

      <div className="grid grid-cols-2 gap-2 mt-auto">
        {choices.map((option) => {
          const isCorrect = option === data.blank
          const isSelected = option === selected
          const showResult = selected !== null

          return (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
              className={cn(
                "px-4 py-3 rounded-xl text-[15px] text-center transition-colors",
                !showResult && "bg-background",
                showResult && isCorrect && "bg-accent-soft text-accent font-medium",
                showResult && isSelected && !isCorrect && "bg-red-50 text-red-600",
                showResult && !isSelected && !isCorrect && "bg-background opacity-50"
              )}
              whileTap={!selected ? { scale: 0.98 } : undefined}
            >
              {option}
            </motion.button>
          )
        })}
      </div>
    </ExerciseCard>
  )
}
