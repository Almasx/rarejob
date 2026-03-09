import { WeakPoint } from "@/lib/types"

type WeakPointRowProps = {
  weakPoint: WeakPoint
}

export function WeakPointRow({ weakPoint }: WeakPointRowProps) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="font-semibold text-[15px]">{weakPoint.term}</p>
        <p className="text-caption text-text-tertiary mt-0.5">{weakPoint.translation}</p>
      </div>
      <span className="text-caption text-text-tertiary">
        {weakPoint.wrongCount}x missed
      </span>
    </div>
  )
}
