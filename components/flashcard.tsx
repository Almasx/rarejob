"use client"

import { Flashcard as FlashcardType } from "@/lib/types"
import { motion } from "framer-motion"
import { useState } from "react"

type FlashcardProps = {
  data: FlashcardType
  onRate: (rating: "again" | "good" | "easy") => void
}

export function Flashcard({ data, onRate }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring" as const, duration: 0.6, bounce: 0.15 }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
        onClick={() => !flipped && setFlipped(true)}
        className="cursor-pointer"
      >
        {/* Front face */}
        <div
          className="card-raised p-6 min-h-[380px] flex flex-col"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">
            {data.type === "en-to-jp" ? "English to Japanese" : "Japanese to English"}
          </span>
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-[22px] font-semibold leading-relaxed">{data.front}</p>
              <p className="text-text-tertiary text-caption mt-6">Tap to flip</p>
            </div>
          </div>
        </div>

        {/* Back face */}
        <div
          className="card-raised absolute inset-0 flex flex-col"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="p-6 flex-1 flex flex-col">
            <span className="text-caption text-text-tertiary font-medium tracking-wide uppercase">
              {data.type === "en-to-jp" ? "Japanese" : "English"}
            </span>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-text-tertiary text-[15px] mb-3">{data.front}</p>
                <p className="text-[22px] font-semibold leading-relaxed">{data.back}</p>
              </div>
            </div>
          </div>

          <div className="mx-6 border-t border-border">
            <button
              onClick={() => onRate("again")}
              className="w-full text-left px-0 py-4 text-text-tertiary font-medium text-[15px] border-b border-border active:opacity-60 transition-opacity"
            >
              Again
            </button>
            <button
              onClick={() => onRate("good")}
              className="w-full text-left px-0 py-4 text-text-primary font-medium text-[15px] border-b border-border active:opacity-60 transition-opacity"
            >
              Good
            </button>
            <button
              onClick={() => onRate("easy")}
              className="w-full text-left px-0 py-4 text-accent font-medium text-[15px] active:opacity-60 transition-opacity"
            >
              Easy
            </button>
          </div>
          <div className="h-3" />
        </div>
      </motion.div>
    </div>
  )
}
