"use client"

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react"
import { UserProgress, WeakPoint } from "./types"
import { formatDate } from "./utils"

const STORAGE_KEY = "rarejob-progress"

const initialProgress: UserProgress = {
  streak: 0,
  lastPracticeDate: null,
  completedLessons: [],
  weakPoints: [],
  practiceHistory: {},
}

type Action =
  | { type: "COMPLETE_SESSION"; lessonId: string; weakPoints: WeakPoint[] }
  | { type: "LOAD"; progress: UserProgress }

function calculateStreak(history: Record<string, boolean>, today: string, prevStreak: number): number {
  const todayDate = new Date(today)
  const yesterday = new Date(todayDate)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = formatDate(yesterday)

  if (history[today]) {
    // Already practiced today — check if yesterday was also practiced
    if (history[yesterdayStr] || prevStreak === 1) return prevStreak
    return 1
  }
  // Practicing now
  if (history[yesterdayStr]) return prevStreak + 1
  return 1
}

function reducer(state: UserProgress, action: Action): UserProgress {
  switch (action.type) {
    case "LOAD":
      return action.progress
    case "COMPLETE_SESSION": {
      const today = formatDate(new Date())
      const newHistory = { ...state.practiceHistory, [today]: true }
      const newStreak = calculateStreak(newHistory, today, state.streak)
      const newCompleted = state.completedLessons.includes(action.lessonId)
        ? state.completedLessons
        : [...state.completedLessons, action.lessonId]

      // Merge weak points
      const wpMap = new Map<string, WeakPoint>()
      for (const wp of state.weakPoints) wpMap.set(wp.term, wp)
      for (const wp of action.weakPoints) {
        const existing = wpMap.get(wp.term)
        if (existing) {
          wpMap.set(wp.term, { ...existing, wrongCount: existing.wrongCount + wp.wrongCount })
        } else {
          wpMap.set(wp.term, wp)
        }
      }

      return {
        streak: newStreak,
        lastPracticeDate: today,
        completedLessons: newCompleted,
        weakPoints: Array.from(wpMap.values()),
        practiceHistory: newHistory,
      }
    }
    default:
      return state
  }
}

const ProgressContext = createContext<{
  progress: UserProgress
  completeSession: (lessonId: string, weakPoints: WeakPoint[]) => void
}>({
  progress: initialProgress,
  completeSession: () => {},
})

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, dispatch] = useReducer(reducer, initialProgress)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        dispatch({ type: "LOAD", progress: JSON.parse(stored) })
      } catch {
        // ignore corrupted data
      }
    }
  }, [])

  useEffect(() => {
    if (progress.lastPracticeDate !== null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
    }
  }, [progress])

  const completeSession = (lessonId: string, weakPoints: WeakPoint[]) => {
    dispatch({ type: "COMPLETE_SESSION", lessonId, weakPoints })
  }

  return (
    <ProgressContext.Provider value={{ progress, completeSession }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}
