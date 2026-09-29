type LogLevel = "debug" | "info" | "warn" | "error"

const levelRank: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

function configuredLevel(): LogLevel {
  const value = process.env.LOG_LEVEL?.toLowerCase()
  if (
    value === "debug" ||
    value === "info" ||
    value === "warn" ||
    value === "error"
  ) {
    return value
  }
  return "info"
}

function shouldLog(level: LogLevel) {
  if (process.env.NODE_ENV === "test") return false
  return levelRank[level] >= levelRank[configuredLevel()]
}

function format(
  level: LogLevel,
  message: string,
  extra?: Record<string, unknown>,
) {
  const payload =
    extra && Object.keys(extra).length > 0 ? ` ${JSON.stringify(extra)}` : ""
  return `${new Date().toISOString()} [${level}] ${message}${payload}`
}

export const log = {
  debug(message: string, extra?: Record<string, unknown>) {
    if (shouldLog("debug")) console.log(format("debug", message, extra))
  },
  info(message: string, extra?: Record<string, unknown>) {
    if (shouldLog("info")) console.log(format("info", message, extra))
  },
  warn(message: string, extra?: Record<string, unknown>) {
    if (shouldLog("warn")) console.warn(format("warn", message, extra))
  },
  error(message: string, extra?: Record<string, unknown>) {
    if (shouldLog("error")) console.error(format("error", message, extra))
  },
}
