"use client"

import { cn } from "@/lib/utils"

type ExerciseCardProps = {
  children: React.ReactNode
  className?: string
}

export function ExerciseCard({ children, className }: ExerciseCardProps) {
  return (
    <div className={cn("card-raised p-6 min-h-[360px] flex flex-col", className)}>
      {children}
    </div>
  )
}
