"use client"

import { useState, useEffect, useCallback } from "react"

interface UseTimerProps {
  duration: number
  autoStart: boolean
}

export function useTimer({ duration, autoStart }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isRunning, setIsRunning] = useState(autoStart)

  useEffect(() => {
    setTimeLeft(duration * 60)
    setIsRunning(autoStart)
  }, [duration, autoStart])

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const resetTimer = useCallback(() => {
    setTimeLeft(duration * 60)
    setIsRunning(false)
  }, [duration])

  return {
    timeLeft,
    isRunning,
    toggleTimer,
    resetTimer,
  }
}
