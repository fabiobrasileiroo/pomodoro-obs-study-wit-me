"use client"

import { useTimer } from "@/hooks/use-timer"
import { usePomodoroParams } from "@/hooks/use-pomodoro-params"
import { TimerDisplay } from "@/components/timer-display"
import { SessionCounter } from "@/components/session-counter"
import { TimerControls } from "@/components/timer-controls"
import { WaveIcon } from "@/components/wave-icon"
import { useState } from "react"

export function PomodoroTimer() {
  const params = usePomodoroParams()
  const [isConfigOpen, setIsConfigOpen] = useState(false)
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
            <div className="rounded-full bg-white/10 px-4 py-2 text-md font-medium text-white backdrop-blur-sm shadow-lg border border-white/15 flex items-center ">
              {params.totalSessions && (
                <span className="text-gray-100">
                  Total de sessões: <span className="font-semibold text-gray-200">{params.totalSessions}</span>
                </span>
              )}

              {params.totalSessions && params.sessionDuration && (
                <span className="mx-3 self-stretch w-px " aria-hidden />
              )}

              {params.sessionDuration && (
                <span className="text-gray-100">
                  Duração por sessão: <span className="font-semibold text-gray-200">{params.sessionDuration}</span> min
                </span>
              )}
            </div>
          </div>
        )}

        <TimerControls
          isRunning={isRunning}
          onToggle={toggleTimer}
          onReset={resetTimer}
          onOpenConfig={() => setIsConfigOpen(true)}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-950/20 to-transparent" />

      {isConfigOpen && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
          <div className="w-full max-w-sm rounded-2xl bg-zinc-900/95 p-6 text-white shadow-2xl border border-white/10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Configurações do Timer</h2>
              <button
                className="rounded-full bg-white/10 px-2 py-1 text-xs hover:bg-white/20"
                onClick={() => setIsConfigOpen(false)}
              >
                Fechar
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(event) => {
                event.preventDefault()
                const formData = new FormData(event.currentTarget)

                const duration = Number(formData.get("duration") || params.duration)
                const total = formData.get("total") ? Number(formData.get("total")) : undefined
                const sessionDuration = formData.get("sessionDuration")
                  ? Number(formData.get("sessionDuration"))
                  : undefined

                params.updateParams((prev) => ({
                  ...prev,
                  duration: Number.isNaN(duration) ? prev.duration : duration,
                  total: total ?? prev.total,
                  sessionDuration: sessionDuration ?? prev.sessionDuration,
                }))

                setIsConfigOpen(false)
              }}
            >
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="duration">
                  Duração do timer (min)
                </label>
                <input
                  id="duration"
                  name="duration"
                  type="number"
                  min={1}
                  defaultValue={params.duration}
                  className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="total">
                  Total de sessões (opcional)
                </label>
                <input
                  id="total"
                  name="total"
                  type="number"
                  min={1}
                  defaultValue={params.totalSessions ?? ""}
                  className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="sessionDuration">
                  Duração por sessão (opcional)
                </label>
                <input
                  id="sessionDuration"
                  name="sessionDuration"
                  type="number"
                  min={1}
                  defaultValue={params.sessionDuration ?? ""}
                  className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none focus:border-white/40"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-white/90 px-4 py-2 text-sm font-semibold text-black hover:bg-white"
              >
                Aplicar configurações
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
