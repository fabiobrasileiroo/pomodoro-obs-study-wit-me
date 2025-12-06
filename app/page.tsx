import { Suspense } from "react"
import { PomodoroTimer } from "@/components/pomodoro-timer"

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-black">
          <div className="text-2xl text-white">Loading...</div>
        </div>
      }
    >
      <PomodoroTimer />
    </Suspense>
  )
}
