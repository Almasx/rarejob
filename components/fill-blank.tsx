"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { FillBlankItem } from "@/lib/types"
import { cn, shuffleArray } from "@/lib/utils"

type FillBlankProps = {
  data: FillBlankItem
  onAnswer: (correct: boolean) => void
}

const letters = ["a", "b", "c", "d"]

export function FillBlank({ data, onAnswer }: FillBlankProps) {
  const [selected, setSelected] = useState<string | null>(null)

  const choices = useMemo(
    () => shuffleArray([...data.options]),
    [data]
  )

  const handleSelect = (choice: string) => {
    if (selected) return
    setSelected(choice)
    const correct = choice === data.blank
    setTimeout(() => onAnswer(correct), correct ? 2000 : 4000)
  }

  const parts = data.sentence.split("___")

  return (
    <div className="card-raised overflow-hidden">
      <div className="p-6 pb-12">
        <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">Fill in the blank</span>
        <p className="text-[22px] font-semibold mt-5 leading-snug">
          {parts[0]}
          <span
            className={cn(
              "inline-block min-w-[80px] border-b-2 mx-1 text-center align-baseline transition-colors",
              selected === data.blank
                ? "border-accent text-accent"
                : selected
                  ? "border-wrong text-wrong"
                  : "border-text-tertiary"
            )}
          >
            {selected || "\u00A0"}
          </span>
          {parts[1]}
        </p>
      </div>

      <div className="mx-6 border-t border-border">
        {choices.map((option, i) => {
          const isCorrect = option === data.blank
          const isSelected = option === selected
          const showResult = selected !== null
          const isLast = i === choices.length - 1

          return (
            <motion.button
              key={option}
              onClick={() => handleSelect(option)}
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
              <span>{option}</span>
            </motion.button>
          )
        })}
      </div>
      <div className="h-2" />
    </div>
  )
}
