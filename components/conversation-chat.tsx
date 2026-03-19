"use client"

import { api } from "@/convex/_generated/api"
import { cn } from "@/lib/utils"
import { useAction } from "convex/react"
import { motion } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useCallback, useRef, useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
}

type ConversationChatProps = {
  lessonContext: string
  weakPoints?: string[]
  practiceGoals?: string[]
  onClose: () => void
}

export function ConversationChat({ lessonContext, weakPoints, practiceGoals, onClose }: ConversationChatProps) {
  const chat = useAction(api.openai.chat)
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! Let's practice English together. What would you like to talk about?" },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: "user", content: text }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const response = await chat({
        messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        lessonContext,
        weakPoints,
        practiceGoals,
      })
      setMessages([...newMessages, { role: "assistant", content: response }])
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Sorry, I couldn't respond. Please try again." }])
    } finally {
      setLoading(false)
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
      }, 50)
    }
  }, [input, messages, loading, chat, lessonContext])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

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
            <h3 className="text-base">Practice Chat</h3>
            <p className="text-caption text-text-tertiary">AI conversation partner</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary text-base font-medium active:opacity-60 transition-opacity"
          >
            Done
          </button>
        </div>

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
              className="flex-1 bg-surface border border-border rounded-xl px-4 py-3 text-[15px] leading-relaxed resize-none outline-none focus:border-accent/40 transition-colors"
            />
            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center transition-colors shrink-0",
                input.trim() && !loading
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
