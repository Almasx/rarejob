"use client"

import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { useAction } from "convex/react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Loader2, Sparkles, X } from "lucide-react"
import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"

const SUGGESTIONS = [
  "Cooking & Food",
  "Sports & Fitness",
  "Music & Entertainment",
  "Shopping & Fashion",
  "Technology",
  "Health & Wellness",
]

type CreateLessonProps = {
  level: number
  chapter: number
  onClose: () => void
}

export function CreateLesson({ level, chapter, onClose }: CreateLessonProps) {
  const router = useRouter()
  const generate = useAction(api.openai.generateLesson)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleGenerate = useCallback(async (interest: string) => {
    const text = interest.trim()
    if (!text || loading) return

    setLoading(true)
    setError("")

    try {
      const lessonKey = await generate({ interest: text, level, chapter })
      router.push(`/exercise/${lessonKey}`)
    } catch {
      setError("Failed to generate. Please try again.")
      setLoading(false)
    }
  }, [loading, generate, level, chapter, router])

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
            <h3 className="text-base">Create Lesson</h3>
            <p className="text-caption text-text-tertiary">Pick a topic you're interested in</p>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-text-secondary active:opacity-60 transition-opacity p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
          {/* Loading state */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 flex flex-col items-center justify-center gap-4 py-20"
              >
                <Loader2 size={32} className="text-accent animate-spin" />
                <div className="text-center">
                  <p className="font-semibold text-base mb-1">Generating your lesson</p>
                  <p className="text-caption text-text-tertiary">This takes about 15-30 seconds</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-5"
              >
                {/* Suggestions */}
                <div>
                  <p className="text-caption text-text-tertiary font-medium mb-3">Popular topics</p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        onClick={() => handleGenerate(s)}
                        className="px-3.5 py-2 rounded-full bg-surface border border-border text-sm font-medium active:scale-[0.97] transition-transform"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Or custom input */}
                <div>
                  <p className="text-caption text-text-tertiary font-medium mb-3">Or type your own</p>
                  <div className="flex items-end gap-2">
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleGenerate(input)
                        }
                      }}
                      placeholder="e.g. Anime, Travel, Coffee..."
                      className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-[15px] leading-relaxed outline-none focus:border-accent/40 transition-colors"
                    />
                    <motion.button
                      onClick={() => handleGenerate(input)}
                      disabled={!input.trim()}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
                        input.trim()
                          ? "bg-accent text-white"
                          : "bg-fill-empty text-text-tertiary"
                      )}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ArrowUp size={18} />
                    </motion.button>
                  </div>
                </div>

                {error && (
                  <p className="text-sm text-red-500">{error}</p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}
