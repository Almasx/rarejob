"use client"

import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

const BOOKING_URL = "https://www.rarejob.com/reservation/"

type Props = {
  variant?: "card" | "inline"
  headline?: string
  subtext?: string
  className?: string
}

export function BookRareJobCta({
  variant = "card",
  headline,
  subtext,
  className,
}: Props) {
  const defaultHeadline =
    variant === "card"
      ? "Book a live tutor session"
      : "Ready for a live session?"
  const defaultSubtext =
    variant === "card"
      ? "Practice today's skills with a real RareJob tutor"
      : "Book a RareJob tutor and try this with a real person"

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "rounded-[20px] p-5 flex items-center gap-4 text-left",
        "bg-accent/8 border border-accent/30",
        "active:scale-[0.98] transition-transform",
        className,
      )}
    >
      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0">
        <ArrowUpRight size={18} className="text-white" strokeWidth={2.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-base text-accent">{headline ?? defaultHeadline}</p>
        <p className="text-caption text-accent/70">{subtext ?? defaultSubtext}</p>
      </div>
    </a>
  )
}
