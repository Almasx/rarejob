"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { JournalEntryCard } from "./journal-entry-card"

type GrammarJournalProps = {
  onClose: () => void
}

export function GrammarJournal({ onClose }: GrammarJournalProps) {
  const entries = useQuery(api.journal.listForUser)

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <div className="mx-auto w-full max-w-[430px] flex flex-col h-dvh">
        {/* Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-base">Grammar Journal</h3>
            <p className="text-caption text-text-tertiary">Learn from your mistakes</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary active:opacity-60 transition-opacity p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5">
          {entries === undefined ? (
            <div className="py-10 flex flex-col gap-3">
              <div className="h-16 rounded-xl bg-fill-empty animate-pulse" />
              <div className="h-16 rounded-xl bg-fill-empty animate-pulse" />
              <div className="h-16 rounded-xl bg-fill-empty animate-pulse" />
            </div>
          ) : entries.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-[28px] mb-2">📝</p>
              <h3 className="mb-1">No entries yet</h3>
              <p className="text-text-secondary text-base">
                Complete an exercise session to see grammar explanations for your mistakes.
              </p>
            </div>
          ) : (
            entries.map((journal) => (
              <div key={journal._id} className="mb-2">
                <div className="pt-4 pb-1">
                  <span className="text-caption text-text-tertiary font-medium">
                    {new Date(journal.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="divide-y divide-border">
                  {journal.entries.map((entry, i) => (
                    <JournalEntryCard key={i} entry={entry} />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </motion.div>
  )
}
