"use client"

import { parseAsInteger, parseAsBoolean, parseAsString, useQueryStates } from "nuqs"

export function usePomodoroParams() {
  const [params] = useQueryStates(
    {
      duration: parseAsInteger.withDefault(25),
      autostart: parseAsBoolean.withDefault(false),
      type: parseAsString.withDefault("pomodoro"),
      hidetext: parseAsBoolean.withDefault(false),
      study: parseAsInteger.withDefault(0),
      break: parseAsInteger.withDefault(0),
    },
    {
      urlKeys: {
        autostart: "autostart",
        hidetext: "hidetext",
      },
    },
  )

  return {
    duration: params.duration,
    autoStart: params.autostart,
    type: params.type as "pomodoro" | "break",
    hideText: params.hidetext,
    studySessions: params.study,
    breakSessions: params.break,
  }
}
