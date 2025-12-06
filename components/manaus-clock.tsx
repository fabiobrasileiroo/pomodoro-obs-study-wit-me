"use client"

import { useState, useEffect } from "react"

export function ManausClock() {
  const [time, setTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const manausTime = new Date(
        now.toLocaleString("en-US", {
          timeZone: "America/Manaus",
        })
      )

      const hours = String(manausTime.getHours()).padStart(2, "0")
      const minutes = String(manausTime.getMinutes()).padStart(2, "0")
      const seconds = String(manausTime.getSeconds()).padStart(2, "0")

      setTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-6xl font-bold text-white tabular-nums tracking-wide">{time}</div>
      <div className="text-md font-medium uppercase tracking-wider text-white/80">Horário de Manaus</div>
    </div>
  )
}
