import { FunctionReturnType } from "convex/server"
import { api } from "@/convex/_generated/api"

type Dashboard = FunctionReturnType<typeof api.progress.getDashboard>
type WeakPoint = Dashboard["weakPoints"][number]

type WeakPointRowProps = {
  weakPoint: WeakPoint
}

export function WeakPointRow({ weakPoint }: WeakPointRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-semibold text-base">{weakPoint.term}</p>
        <p className="text-caption text-text-tertiary mt-0.5">{weakPoint.translation}</p>
      </div>
      <span className="text-caption text-text-tertiary">
        {weakPoint.wrongCount}x missed
      </span>
    </div>
  )
}
