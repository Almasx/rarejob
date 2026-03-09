"use client"

import { motion } from "framer-motion"

type ScoreBarProps = {
  current: number
  total: number
}

export function ScoreBar({ current, total }: ScoreBarProps) {
  const pct = total > 0 ? (current / total) * 100 : 0

  return (
    <div className="w-full h-[6px] bg-text-tertiary/30 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-text-tertiary rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </div>
  )
}
