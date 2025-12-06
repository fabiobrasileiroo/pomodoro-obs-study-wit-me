import { cn } from "@/lib/utils"

interface SessionCounterProps {
  studySessions: number
  breakSessions: number
  totalSessions?: number | null
  hideBreak?: boolean
}

export function SessionCounter({ studySessions, breakSessions, totalSessions, hideBreak }: SessionCounterProps) {
  const showTotal = totalSessions != null
  return (
    <div className="flex gap-8 text-center items-center">
      <div className="flex flex-col space-y-2 items-center">
        <div className="text-5xl font-bold text-white tracking-wider">
          {showTotal ? `${studySessions}/${totalSessions}` : studySessions}
        </div>
        <div className={cn("text-md font-medium uppercase tracking-wider text-white/80 w-40",
          hideBreak && "w-80"
        )}>Sessões de Estudo</div>
      </div>
      {!hideBreak && (
        <>
          <div className="h-16 w-px bg-white/20" />
          <div className="flex flex-col space-y-2 items-center">
            <div className="text-5xl font-bold text-white">{breakSessions}</div>
            <div className="text-md font-medium uppercase tracking-wider text-white/80">Breaks</div>
          </div>
        </>
      )}
    </div>
  )
}
