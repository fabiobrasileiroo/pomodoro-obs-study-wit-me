import { formatTime } from "@/lib/utils"

interface TimerDisplayProps {
  timeLeft: number
  hideText?: boolean
}

export function TimerDisplay({ timeLeft, hideText }: TimerDisplayProps) {
  return (
    <div className="text-center">
      <div className="mb-2 font-mono text-9xl font-bold tracking-wider text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
        {formatTime(timeLeft)}
      </div>

      {/* {!hideText && (
        <h1 className="text-5xl font-light tracking-wide text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          Estude comigo
        </h1>
      )} */}
    </div>
  )
}
