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
        "rounded-xl px-6 py-3.5 font-semibold text-[16px] transition-all active:scale-[0.98] active:brightness-95",
        variant === "primary" && "bg-accent text-white",
        variant === "ghost" && "text-text-secondary",
        props.disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
