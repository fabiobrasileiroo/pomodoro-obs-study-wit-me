import { Suspense } from "react"
import { ManausClock } from "@/components/manaus-clock"

export default function ClockPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <Suspense
        fallback={
          <div className="text-2xl text-white">Loading...</div>
        }
      >
        <ManausClock />
      </Suspense>
    </div>
  )
}
