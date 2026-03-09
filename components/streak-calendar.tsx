"use client"

import { formatDate } from "@/lib/utils"

type StreakCalendarProps = {
  practiceHistory: Record<string, boolean>
  streak: number
}

export function StreakCalendar({ practiceHistory, streak }: StreakCalendarProps) {
  const today = new Date()
  const weeks = 10
  const days: { date: string; practiced: boolean; isToday: boolean }[] = []

  for (let i = weeks * 7 - 1; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const dateStr = formatDate(d)
    days.push({
      date: dateStr,
      practiced: !!practiceHistory[dateStr],
      isToday: i === 0,
    })
  }

  return (
    <div className="card-raised p-6">
      <div className="flex items-end justify-between mb-5">
        <div>
          <span className="text-[44px] font-bold leading-none tracking-tight">{streak}</span>
          <p className="text-text-secondary text-caption mt-1">
            {streak === 1 ? "day" : "days"} in a row
          </p>
        </div>
        <p className="text-caption text-text-tertiary">
          {today.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
        </p>
      </div>

      <div
        className="gap-[4px]"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${weeks}, 1fr)`,
          gridTemplateRows: "repeat(7, 1fr)",
        }}
      >
        {days.map((day) => (
          <div
            key={day.date}
            title={day.date}
            className="rounded-[5px] aspect-square transition-colors"
            style={{
              backgroundColor: day.practiced
                ? "var(--accent)"
                : day.isToday
                  ? "var(--accent-soft)"
                  : "var(--fill-empty)",
              minWidth: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
