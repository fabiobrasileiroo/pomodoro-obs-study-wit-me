"use client"

import { useTimer } from "@/hooks/use-timer"
import { usePomodoroParams } from "@/hooks/use-pomodoro-params"
import { TimerDisplay } from "@/components/timer-display"
import { SessionCounter } from "@/components/session-counter"
import { TimerControls } from "@/components/timer-controls"
import { WaveIcon } from "@/components/wave-icon"

export function PomodoroTimer() {
  const params = usePomodoroParams()
  const { timeLeft, isRunning, toggleTimer, resetTimer } = useTimer({
    duration: params.duration,
    autoStart: params.autoStart,
  })

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black">
      <div className="relative z-10 flex flex-col items-center gap-8 pb-20">
        {/* <WaveIcon type={params.type} /> */}

        <TimerDisplay timeLeft={timeLeft} hideText={params.hideText} />

        <div className="text-2xl font-medium mb-2 text-white/80">
          {params.type === "break" ? "☕ Break Time" : "📚 Focus Time"}
        </div>

        <SessionCounter studySessions={params.studySessions} breakSessions={params.breakSessions} />

        {(params.totalSessions || params.sessionDuration) && (
          <div className="mt-2 flex items-center justify-center">
            <div className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-sm shadow-lg border border-white/15 flex items-center">
              {params.totalSessions && (
                <span className="text-gray-100">
                  Total de sessões: <span className="font-semibold text-gray-200">{params.totalSessions}</span>
                </span>
              )}

              {params.totalSessions && params.sessionDuration && (
                <span className="mx-3 self-stretch w-px bg-white/15" aria-hidden />
              )}

              {params.sessionDuration && (
                <span className="text-gray-100">
                  Duração por sessão: <span className="font-semibold text-gray-200">{params.sessionDuration}</span> min
                </span>
              )}
            </div>
          </div>
        )}

        <TimerControls isRunning={isRunning} onToggle={toggleTimer} onReset={resetTimer} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/20 to-transparent" />
    </div>
  )
}
