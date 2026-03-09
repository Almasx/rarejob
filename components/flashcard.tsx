"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Flashcard as FlashcardType } from "@/lib/types"

type FlashcardProps = {
  data: FlashcardType
  onRate: (rating: "again" | "good" | "easy") => void
}

export function Flashcard({ data, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="card-raised overflow-hidden">
      <div
        className="p-6 cursor-pointer"
        onClick={() => !flipped && setFlipped(true)}
      >
        <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">
          {data.type === "en-to-jp" ? "English to Japanese" : "Japanese to English"}
        </span>

        <div className="flex items-center justify-center py-14">
          <AnimatePresence mode="wait">
            {!flipped ? (
              <motion.div
                key="front"
                initial={{ rotateY: 0 }}
                exit={{ rotateY: 90 }}
                transition={{ duration: 0.15 }}
                className="text-center"
              >
                <p className="text-[22px] font-semibold leading-relaxed">{data.front}</p>
                <p className="text-text-tertiary text-caption mt-6">Tap to reveal</p>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.15 }}
                className="text-center"
              >
                <p className="text-text-tertiary text-[15px] mb-3">{data.front}</p>
                <p className="text-[22px] font-semibold leading-relaxed">{data.back}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {flipped && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mx-6 border-t border-border"
        >
          <button
            onClick={() => onRate("again")}
            className="w-full text-left px-0 py-4.5 text-text-tertiary font-medium text-[15px] border-b border-border active:opacity-60 transition-opacity"
          >
            Again
          </button>
          <button
            onClick={() => onRate("good")}
            className="w-full text-left px-0 py-4.5 text-text-primary font-medium text-[15px] border-b border-border active:opacity-60 transition-opacity"
          >
            Good
          </button>
          <button
            onClick={() => onRate("easy")}
            className="w-full text-left px-0 py-4.5 text-accent font-medium text-[15px] active:opacity-60 transition-opacity"
          >
            Easy
          </button>
          <div className="h-4" />
        </motion.div>
      )}
    </div>
  )
}
