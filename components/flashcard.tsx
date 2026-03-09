"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flashcard as FlashcardType } from "@/lib/types"
import { ExerciseCard } from "./exercise-card"
import { Button } from "./button"

type FlashcardProps = {
  data: FlashcardType
  onRate: (rating: "again" | "good" | "easy") => void
}

export function Flashcard({ data, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <ExerciseCard>
      <span className="text-caption text-text-tertiary mb-3">
        {data.type === "en-to-jp" ? "EN → JP" : "JP → EN"}
      </span>

      <div
        className="flex-1 flex items-center justify-center cursor-pointer"
        onClick={() => setFlipped(true)}
      >
        <AnimatePresence mode="wait">
          {!flipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 0 }}
              exit={{ rotateY: 90 }}
              transition={{ duration: 0.15 }}
              className="text-center"
            >
              <p className="text-xl font-semibold leading-relaxed">{data.front}</p>
              <p className="text-text-tertiary text-caption mt-4">Tap to reveal</p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90 }}
              animate={{ rotateY: 0 }}
              transition={{ duration: 0.15 }}
              className="text-center"
            >
              <p className="text-text-secondary text-[15px] mb-2">{data.front}</p>
              <p className="text-xl font-semibold leading-relaxed">{data.back}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 mt-4"
        >
          <Button variant="ghost" className="flex-1 bg-red-50 text-red-600" onClick={() => onRate("again")}>
            Again
          </Button>
          <Button variant="ghost" className="flex-1 bg-accent-soft text-accent" onClick={() => onRate("good")}>
            Good
          </Button>
          <Button variant="ghost" className="flex-1 bg-green-50 text-green-700" onClick={() => onRate("easy")}>
            Easy
          </Button>
        </motion.div>
      )}
    </ExerciseCard>
  )
}
