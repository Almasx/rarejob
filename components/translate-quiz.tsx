"use client"

import { TranslateItem } from "@/lib/types"
import { cn, shuffleArray } from "@/lib/utils"
import { motion } from "framer-motion"
import { useMemo, useState } from "react"

type TranslateQuizProps = {
  data: TranslateItem
  onAnswer: (correct: boolean, selected: string) => void
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
    const correct = choice === data.correct
    setTimeout(() => onAnswer(correct, choice), correct ? 2000 : 4000)
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
                "w-full text-left px-0 py-4.5 text-base flex gap-3 items-baseline transition-all outline-none text-text-primary",
                !isLast && "border-b border-border",
                !showResult && "active:opacity-60",
                showResult && isCorrect && "!text-accent",
                showResult && isSelected && !isCorrect && "!text-wrong",
                showResult && !isSelected && !isCorrect && "!text-text-tertiary"
              )}
              whileTap={!selected ? { scale: 0.99 } : undefined}
            >
              <span className="text-caption font-medium w-4 text-inherit">
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
