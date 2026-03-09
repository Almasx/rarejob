"use client"

import { cn } from "@/lib/utils"

type ButtonProps = {
  variant?: "primary" | "ghost"
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ variant = "primary", children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-xl px-6 py-3 font-semibold text-[15px] transition-all active:scale-[0.97]",
        variant === "primary" && "bg-accent text-white",
        variant === "ghost" && "bg-transparent text-text-secondary",
        props.disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
