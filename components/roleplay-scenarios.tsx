"use client"

import { cn } from "@/lib/utils"
import { SCENARIOS, type Scenario } from "@/lib/scenarios"
import { motion } from "framer-motion"
import { X } from "lucide-react"

type RoleplayScenariosProps = {
  onSelect: (scenario: Scenario) => void
  onClose: () => void
}

const difficultyColors = {
  beginner: "bg-accent/10 text-accent",
  intermediate: "bg-yellow-500/10 text-yellow-700",
  advanced: "bg-red-500/10 text-red-600",
}

export function RoleplayScenarios({ onSelect, onClose }: RoleplayScenariosProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
    >
      <div className="mx-auto w-full max-w-[430px] flex flex-col h-dvh">
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-border">
          <div>
            <h3 className="text-base">Roleplay</h3>
            <p className="text-caption text-text-tertiary">Choose a scenario to practice</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary active:opacity-60 transition-opacity p-1"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => onSelect(scenario)}
              className="card-raised p-5 text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <h3 className="text-base font-semibold">{scenario.title}</h3>
                <span className={cn(
                  "text-[11px] font-medium px-2 py-0.5 rounded-full capitalize",
                  difficultyColors[scenario.difficulty]
                )}>
                  {scenario.difficulty}
                </span>
                {scenario.curriculumSource && (
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-accent text-white">
                    RareJob Lesson
                  </span>
                )}
              </div>
              <p className="text-caption text-text-tertiary mb-1">{scenario.titleJp}</p>
              {scenario.curriculumSource && (
                <p className="text-caption text-text-tertiary mb-3">{scenario.curriculumSource}</p>
              )}
              {!scenario.curriculumSource && <div className="mb-2" />}
              <p className="text-sm text-text-secondary mb-3">{scenario.goal}</p>
              <div className="flex gap-3 text-caption text-text-tertiary">
                <span>You: <span className="text-text-secondary font-medium">{scenario.userRole}</span></span>
                <span>AI: <span className="text-text-secondary font-medium">{scenario.aiRole}</span></span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
