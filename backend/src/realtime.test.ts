import { afterEach, describe, expect, it } from "vitest"
import WebSocket from "ws"
import { parseMetricsPayload } from "@express-websocket/shared"
import { startHttpServer, type RunningServer } from "./app"

describe("live metrics websocket", () => {
  let running: RunningServer | undefined

  afterEach(async () => {
    await running?.close()
    running = undefined
  })

  it("sends a schema-valid payload on connect and again after the interval", async () => {
    running = await startHttpServer({ port: 0, metricsIntervalMs: 40 })

    const frames: unknown[] = []
    const socket = new WebSocket(`ws://127.0.0.1:${running.port}/ws`)

    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(
        () => reject(new Error("Timed out waiting for frames")),
        2000,
      )
      socket.on("error", reject)
      socket.on("message", (data) => {
        frames.push(JSON.parse(String(data)))
        if (frames.length >= 2) {
          clearTimeout(timer)
          socket.close()
          resolve()
        }
      })
    })

    expect(parseMetricsPayload(frames[0])).not.toBeNull()
    expect(parseMetricsPayload(frames[1])).not.toBeNull()
  })
})
