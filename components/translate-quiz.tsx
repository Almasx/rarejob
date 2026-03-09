"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { TranslateItem } from "@/lib/types"
import { cn, shuffleArray } from "@/lib/utils"

type TranslateQuizProps = {
  data: TranslateItem
  onAnswer: (correct: boolean) => void
}

const letters = ["a", "b", "c"]

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
    <div className="card-raised overflow-hidden">
      <div className="p-6 pb-14">
        <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">Translate</span>
        <p className="text-[22px] font-semibold mt-5 leading-relaxed">{data.sentenceJp}</p>
      </div>

      <div className="mx-6 border-t border-border">
        {choices.map((choice, i) => {
          const isCorrect = choice === data.correct
          const isSelected = choice === selected
          const showResult = selected !== null
          const isLast = i === choices.length - 1

          return (
            <motion.button
              key={choice}
              onClick={() => handleSelect(choice)}
              className={cn(
                "w-full text-left px-0 py-4.5 text-[15px] flex gap-3 items-baseline transition-all",
                !isLast && "border-b border-border",
                !showResult && "active:opacity-60",
                showResult && isCorrect && "text-accent font-semibold",
                showResult && isSelected && !isCorrect && "text-wrong",
                showResult && !isSelected && !isCorrect && "opacity-30"
              )}
              whileTap={!selected ? { scale: 0.99 } : undefined}
            >
              <span className={cn(
                "text-text-tertiary text-caption font-medium w-4",
                showResult && isCorrect && "text-accent",
              )}>
                {letters[i]}
              </span>
              <span>{choice}</span>
            </motion.button>
          )
        })}
      </div>
      <div className="h-2" />
    </div>
  )
}
