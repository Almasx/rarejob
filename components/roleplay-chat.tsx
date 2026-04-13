"use client"

import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { cn } from "@/lib/utils"
import type { Scenario } from "@/lib/scenarios"
import { useAction, useMutation } from "convex/react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type RoleplayChatProps = {
  scenario: Scenario
  onComplete: (sessionId: Id<"roleplaySessions">, messages: Message[]) => void
  onClose: () => void
}

export function RoleplayChat({ scenario, onComplete, onClose }: RoleplayChatProps) {
  const startSession = useMutation(api.roleplay.startSession)
  const roleplayChat = useAction(api.openai.roleplayChat)
  const [sessionId, setSessionId] = useState<Id<"roleplaySessions"> | null>(null)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: scenario.firstMessage },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [completed, setCompleted] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Create DB session on mount
  useEffect(() => {
    startSession({
      scenarioId: scenario.id,
      firstMessage: scenario.firstMessage,
    }).then(setSessionId)
  }, [scenario, startSession])

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }, 50)
  }, [])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading || !sessionId || completed) return

    const userMessage: Message = { role: "user", content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)
    scrollToBottom()

    try {
      const result = await roleplayChat({
        sessionId,
        messages,
        userMessage: text,
        scenarioId: scenario.id,
        userRole: scenario.userRole,
        aiRole: scenario.aiRole,
        goal: scenario.goal,
        tutorPrompt: scenario.tutorPrompt,
      })

      const updatedMessages = [...newMessages, { role: "assistant" as const, content: result.text }]
      setMessages(updatedMessages)

      if (result.isComplete) {
        setCompleted(true)
        setTimeout(() => {
          onComplete(sessionId, updatedMessages)
        }, 1500)
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't respond. Please try again." }])
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }, [input, messages, loading, sessionId, completed, roleplayChat, scenario, scrollToBottom, onComplete])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const handleEnd = useCallback(() => {
    if (sessionId) {
      onComplete(sessionId, messages)
    }
  }, [sessionId, messages, onComplete])

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
          <div className="flex-1 min-w-0">
            <h3 className="text-base truncate">{scenario.title}</h3>
            <p className="text-caption text-text-tertiary">
              You: {scenario.userRole} · AI: {scenario.aiRole}
            </p>
          </div>
          <button
            onClick={handleEnd}
            className="text-text-secondary text-sm font-medium active:opacity-60 transition-opacity shrink-0 ml-3"
          >
            End
          </button>
        </div>

        {/* Goal banner */}
        <div className="px-5 py-2 bg-accent/5 border-b border-border">
          <p className="text-caption text-accent font-medium">
            Goal: {scenario.goal}
          </p>
        </div>

        {/* Completion banner */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-5 py-3 bg-accent/10 text-accent text-sm font-semibold text-center"
          >
            Scenario Complete! Evaluating...
          </motion.div>
        )}

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={i > 0 ? { opacity: 0, y: 6 } : false}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed",
                msg.role === "user"
                  ? "self-end bg-accent text-white rounded-br-md"
                  : "self-start bg-surface shadow-sm border border-border rounded-bl-md"
              )}
            >
              {msg.content}
            </motion.div>
          ))}
          {loading && (
            <div className="self-start bg-surface shadow-sm border border-border rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 bg-text-tertiary rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="px-5 pb-6 pt-3 border-t border-border">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type in English..."
              rows={1}
              disabled={completed}
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-[15px] leading-relaxed resize-none outline-none focus:border-accent/40 transition-colors disabled:opacity-50"
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || loading || completed}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
                input.trim() && !loading && !completed
                  ? "bg-accent text-white"
                  : "bg-fill-empty text-text-tertiary"
              )}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowUp size={18} />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
