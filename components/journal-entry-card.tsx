"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

type JournalEntry = {
  question: string
  userAnswer: string
  correctAnswer: string
  exerciseType: string
  explanationEn: string
  explanationJp: string
  grammarRule: string
  exampleCorrect: string
}

export function JournalEntryCard({ entry }: { entry: JournalEntry }) {
  const [expanded, setExpanded] = useState(false)
  const [showJp, setShowJp] = useState(false)

  return (
    <div className="py-4">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left flex items-start gap-3"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-caption text-text-tertiary font-medium uppercase tracking-wide">
              {entry.grammarRule}
            </span>
          </div>
          <p className="text-base font-medium truncate">{entry.question}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-caption text-wrong line-through">{entry.userAnswer}</span>
            <span className="text-caption text-accent">{entry.correctAnswer}</span>
          </div>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 mt-1"
        >
          <ChevronDown size={16} className="text-text-tertiary" />
        </motion.div>
      </button>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-3 pl-0 overflow-hidden"
        >
          <div className="bg-surface rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-caption text-text-tertiary font-medium">Explanation</span>
              <button
                onClick={() => setShowJp(!showJp)}
                className="text-caption text-accent font-medium active:opacity-60"
              >
                {showJp ? "English" : "日本語"}
              </button>
            </div>
            <p className="text-[15px] leading-relaxed text-text-primary">
              {showJp ? entry.explanationJp : entry.explanationEn}
            </p>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-caption text-text-tertiary">Example: </span>
              <span className="text-[15px] text-text-secondary">{entry.exampleCorrect}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
