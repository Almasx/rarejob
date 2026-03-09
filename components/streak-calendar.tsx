"use client"

import { formatDate } from "@/lib/utils"

type StreakCalendarProps = {
  practiceHistory: Record<string, boolean>
}

export function StreakCalendar({ practiceHistory }: StreakCalendarProps) {
  const today = new Date()
  const weeks = 12
  const days: { date: string; practiced: boolean; isToday: boolean }[] = []

  // Build grid: 12 weeks (84 days) ending today
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
    <div className="flex flex-col gap-2">
      <div className="flex gap-[3px] flex-wrap" style={{ display: "grid", gridTemplateColumns: `repeat(${weeks}, 1fr)`, gridTemplateRows: "repeat(7, 1fr)" }}>
        {days.map((day) => (
          <div
            key={day.date}
            title={day.date}
            className="rounded-[3px] aspect-square"
            style={{
              backgroundColor: day.practiced
                ? "var(--accent)"
                : day.isToday
                  ? "var(--accent-soft)"
                  : "var(--border)",
              opacity: day.practiced ? 1 : 0.5,
              minWidth: 0,
            }}
          />
        ))}
      </div>
    </div>
  )
}
