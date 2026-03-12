"use client"

import { Button } from "@/components/button"
import { authClient } from "@/lib/auth-client"
import { BookOpen } from "lucide-react"

export default function SignInPage() {
  return (
    <div className="px-5 min-h-dvh flex flex-col items-center justify-center">
      <div className="card-raised px-6 pt-14 pb-6 w-full text-center flex flex-col items-center">
        <div className="w-12 h-12 rounded-2xl bg-fill-empty flex items-center justify-center mb-5">
          <BookOpen size={24} className="text-text-secondary" />
        </div>
        <h2 className="mb-1">RareJob Practices</h2>
        <p className="text-text-secondary text-base mb-6">
          Daily English exercise companion
        </p>
        <Button
          className="w-full"
          onClick={() =>
            authClient.signIn.social({ provider: "google", callbackURL: "/" })
          }
        >
          Continue with Google
        </Button>
      </div>
    </div>
  )
}
