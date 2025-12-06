"use client"

interface TimerControlsProps {
  isRunning: boolean
  onToggle: () => void
  onReset: () => void
  onOpenConfig: () => void
}

export function TimerControls({ isRunning, onToggle, onReset, onOpenConfig }: TimerControlsProps) {
  return (
    <div className="flex gap-4 opacity-0 transition-opacity hover:opacity-100">
      <button
        onClick={onToggle}
        className="rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
      <button
        onClick={onReset}
        className="rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        Reset
      </button>
      <button
        onClick={onOpenConfig}
        className="rounded-lg bg-white/10 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        Config
      </button>
    </div>
  )
}
