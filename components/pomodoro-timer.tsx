"use client"

import { useTimer } from "@/hooks/use-timer"
import { usePomodoroParams } from "@/hooks/use-pomodoro-params"
import { TimerDisplay } from "@/components/timer-display"
import { SessionCounter } from "@/components/session-counter"
import { TimerControls } from "@/components/timer-controls"
import { WaveIcon } from "@/components/wave-icon"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
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
                const typeValue = formData.get("type") as string | null
                const type = (typeValue === "pomodoro" || typeValue === "break" ? typeValue : params.type) as
                  | "pomodoro"
                  | "break"
                const autostart = formData.get("autostart") === "on"
                const hidetext = formData.get("hidetext") === "on"
                const study = formData.get("study") ? Number(formData.get("study")) : undefined
                const breakSessions = formData.get("break") ? Number(formData.get("break")) : undefined

                params.updateParams((prev) => ({
                  ...prev,
                  duration: Number.isNaN(duration) ? prev.duration : duration,
                  total: total ?? prev.total,
                  sessionDuration: sessionDuration ?? prev.sessionDuration,
                  type,
                  autostart,
                  hidetext,
                  study: study ?? prev.study,
                  break: breakSessions ?? prev.break,
                }))

                setIsConfigOpen(false)
              }}
            >
              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="duration">
                  Duração do timer (min)
                </label>
                <Input id="duration" name="duration" type="number" min={1} defaultValue={params.duration} />
              </div>

              <div className="space-y-1">
                <span className="text-xs uppercase tracking-wide text-white/60">Modo</span>
                <div className="mt-1 flex gap-4 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="pomodoro"
                      checked={params.type === "pomodoro"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          params.updateParams({ type: "pomodoro" })
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <span>Pomodoro</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      value="break"
                      checked={params.type === "break"}
                      onChange={(e) => {
                        if (e.target.checked) {
                          params.updateParams({ type: "break" })
                        }
                      }}
                      className="cursor-pointer"
                    />
                    <span>Break</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="total">
                  Total de sessões (opcional)
                </label>
                <Input id="total" name="total" type="number" min={1} defaultValue={params.totalSessions ?? ""} />
              </div>

              <div className="space-y-1">
                <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="sessionDuration">
                  Duração por sessão (opcional)
                </label>
                <Input
                  id="sessionDuration"
                  name="sessionDuration"
                  type="number"
                  min={1}
                  defaultValue={params.sessionDuration ?? ""}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <label className="flex items-center gap-2">
                  <Checkbox name="autostart" defaultChecked={params.autoStart} />
                  <span className="text-xs">Auto start</span>
                </label>
                <label className="flex items-center gap-2">
                  <Checkbox name="hidetext" defaultChecked={params.hideText} />
                  <span className="text-xs">Esconder texto</span>
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="study">
                    Sessões de estudo
                  </label>
                  <Input id="study" name="study" type="number" min={0} defaultValue={params.studySessions} />
                </div>
                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-wide text-white/60" htmlFor="break">
                    Breaks
                  </label>
                  <Input id="break" name="break" type="number" min={0} defaultValue={params.breakSessions} />
                </div>
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
