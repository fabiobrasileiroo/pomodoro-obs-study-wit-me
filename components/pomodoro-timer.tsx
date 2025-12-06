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
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* <WaveIcon type={params.type} /> */}

        <TimerDisplay timeLeft={timeLeft} hideText={params.hideText} />

        <div className="text-2xl font-medium text-white/80">
          {params.type === "break" ? "☕ Break Time" : "📚 Focus Time"}
        </div>

        <SessionCounter studySessions={params.studySessions} breakSessions={params.breakSessions} />

        <TimerControls isRunning={isRunning} onToggle={toggleTimer} onReset={resetTimer} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/20 to-transparent" />
    </div>
  )
}
