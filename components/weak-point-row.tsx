import { WeakPoint } from "@/lib/types"

type WeakPointRowProps = {
  weakPoint: WeakPoint
}

export function WeakPointRow({ weakPoint }: WeakPointRowProps) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="font-medium">{weakPoint.term}</p>
        <p className="text-caption text-text-secondary">{weakPoint.translation}</p>
      </div>
      <span className="text-caption text-red-500 font-medium">
        {weakPoint.wrongCount}x wrong
      </span>
    </div>
  )
}
