"use client"

import { useEffect, useState } from "react"

type ExerciseTimerProps = {
  durationSeconds: number
  onTimeUp: () => void
  paused?: boolean
}

export function ExerciseTimer({ durationSeconds, onTimeUp, paused }: ExerciseTimerProps) {
  const [remaining, setRemaining] = useState(durationSeconds)

  useEffect(() => {
    if (paused) return
    if (remaining <= 0) {
      onTimeUp()
      return
    }
    const timer = setTimeout(() => setRemaining((r) => r - 1), 1000)
    return () => clearTimeout(timer)
  }, [remaining, paused, onTimeUp])

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  const isLow = remaining <= 30

  return (
    <span className={`text-caption font-medium tabular-nums ${isLow ? "text-wrong" : "text-text-tertiary"}`}>
      {mins}:{secs.toString().padStart(2, "0")}
    </span>
  )
}
