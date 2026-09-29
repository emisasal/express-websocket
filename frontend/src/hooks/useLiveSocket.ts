import { useEffect, useRef, useState } from "react"
import { parseMetricsPayload, type ChartPoint } from "@express-websocket/shared"

export type ConnectionStatus = "connecting" | "open" | "closed" | "error"

export type { ChartPoint }

export function useLiveSocket(url: string) {
  const [data, setData] = useState<ChartPoint[]>([])
  const [status, setStatus] = useState<ConnectionStatus>("connecting")
  const retryRef = useRef<number>(undefined)

  useEffect(() => {
    let cancelled = false
    let socket: WebSocket | null = null

    const clearRetry = () => {
      if (retryRef.current !== undefined) {
        window.clearTimeout(retryRef.current)
        retryRef.current = undefined
      }
    }

    const connect = () => {
      if (cancelled) return
      setStatus("connecting")
      socket = new WebSocket(url)

      socket.onopen = () => {
        if (!cancelled) setStatus("open")
      }

      socket.onmessage = (event) => {
        try {
          const parsed: unknown = JSON.parse(String(event.data))
          const metrics = parseMetricsPayload(parsed)
          if (metrics) setData(metrics)
        } catch {
          // Ignore malformed frames so one bad payload does not drop the stream.
        }
      }

      socket.onerror = () => {
        if (!cancelled) setStatus("error")
      }

      socket.onclose = () => {
        if (cancelled) return
        setStatus("closed")
        clearRetry()
        retryRef.current = window.setTimeout(connect, 2000)
      }
    }

    connect()

    return () => {
      cancelled = true
      clearRetry()
      socket?.close()
    }
  }, [url])

  return { data, status }
}
