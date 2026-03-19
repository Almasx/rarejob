"use client"

import { Component, type ReactNode } from "react"
import { Button } from "./button"

type Props = { children: ReactNode }
type State = { hasError: boolean }

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="px-5 py-20 flex flex-col items-center gap-4">
          <div className="card-raised p-6 text-center w-full">
            <h2 className="mb-2">Something went wrong</h2>
            <p className="text-text-secondary text-base mb-6">
              An unexpected error occurred. Please try again.
            </p>
            <Button
              className="w-full"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.href = "/"
              }}
            >
              Go Home
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
