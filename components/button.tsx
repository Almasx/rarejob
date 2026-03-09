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
        "rounded-2xl px-6 py-4 font-semibold text-[16px] transition-all active:scale-[0.97] active:brightness-95",
        variant === "primary" && "bg-accent text-white shadow-md",
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
