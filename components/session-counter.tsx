interface SessionCounterProps {
  studySessions: number
  breakSessions: number
}

export function SessionCounter({ studySessions, breakSessions }: SessionCounterProps) {
  return (
    <div className="flex gap-8 text-center mr-17">
      <div className="flex flex-col space-y-2 items-center">
        <div className="text-5xl font-bold text-white">{studySessions}</div>
        <div className="text-md font-medium uppercase tracking-wider text-white/70  w-40">Sessões de Estudo</div>
      </div>
      <div className="h-16 w-px bg-white/20" />
      <div className="flex flex-col space-y-2 items-center">
        <div className="text-5xl font-bold text-white">{breakSessions}</div>
        <div className="text-md font-medium uppercase tracking-wider text-white/70">Breaks</div>
      </div>
    </div>
  )
}
