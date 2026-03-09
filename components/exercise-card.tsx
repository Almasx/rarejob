"use client"

import { cn } from "@/lib/utils"

type ExerciseCardProps = {
  children: React.ReactNode
  className?: string
}

export function ExerciseCard({ children, className }: ExerciseCardProps) {
  return (
    <div className={cn("bg-surface rounded-2xl p-5 min-h-[320px] flex flex-col", className)}>
      {children}
    </div>
  )
}
