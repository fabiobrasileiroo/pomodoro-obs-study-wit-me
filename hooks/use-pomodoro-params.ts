"use client"

import { parseAsInteger, parseAsBoolean, parseAsString, useQueryStates } from "nuqs"

export function usePomodoroParams() {
  const [params, setParams] = useQueryStates(
    {
      duration: parseAsInteger.withDefault(25),
      sessionDuration: parseAsInteger,
      autostart: parseAsBoolean.withDefault(false),
      type: parseAsString.withDefault("pomodoro"),
      hidetext: parseAsBoolean.withDefault(false),
      study: parseAsInteger.withDefault(0),
      break: parseAsInteger.withDefault(0),
      total: parseAsInteger,
      hidebreak: parseAsBoolean.withDefault(false),
    },
    {
      urlKeys: {
        autostart: "autostart",
        hidetext: "hidetext",
        hidebreak: "hidebreak",
      },
    },
  )

  return {
    duration: params.duration,
    sessionDuration: params.sessionDuration,
    autoStart: params.autostart,
    type: params.type as "pomodoro" | "break",
    hideText: params.hidetext,
    studySessions: params.study,
    breakSessions: params.break,
    totalSessions: params.total,
    hideBreak: params.hidebreak,

    updateParams: setParams,
  }
}
