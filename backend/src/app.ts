import path from "node:path"
import http from "node:http"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { WebSocket, WebSocketServer } from "ws"
import { serializeMetricsPayload } from "@express-websocket/shared"
import routes from "./routes"
import { generateRandomData } from "./utils/generateRandomData"
import { log } from "./log"

const isProd = process.env.NODE_ENV === "production"

const frontendDist = path.resolve(
  process.env.FRONTEND_DIST ??
    path.join(__dirname, "..", "..", "frontend", "dist"),
)

export function createApp() {
  const app = express()

  app.use(cors())
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan(isProd ? "combined" : "dev"))
  }
  app.use(express.json())
  app.use("/api", routes)

  if (isProd) {
    app.use(express.static(frontendDist))
    app.get(/.*/, (req, res, next) => {
      if (req.path.startsWith("/api") || req.path === "/ws") {
        next()
        return
      }
      res.sendFile(path.join(frontendDist, "index.html"), (err) => {
        if (err) next(err)
      })
    })
  }

  return app
}

export type RunningServer = {
  port: number
  server: http.Server
  close: () => Promise<void>
}

export function startHttpServer(options?: {
  port?: number
  metricsIntervalMs?: number
}): Promise<RunningServer> {
  const port = options?.port ?? (Number(process.env.PORT) || 8080)
  const metricsIntervalMs =
    options?.metricsIntervalMs ??
    (Number(process.env.METRICS_INTERVAL_MS) || 5000)

  const app = createApp()
  const server = http.createServer(app)
  let randomData = serializeMetricsPayload(generateRandomData())
  const wss = new WebSocketServer({ server, path: "/ws" })
  let nextClientId = 1

  wss.on("error", (err) => {
    log.error("WebSocket server error", { message: err.message })
  })

  function broadcast(payload: string) {
    let sent = 0
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload)
        sent += 1
      }
    }
    log.debug("Broadcast metrics", {
      clients: sent,
      intervalMs: metricsIntervalMs,
      bytes: Buffer.byteLength(payload),
    })
  }

  const interval = setInterval(() => {
    randomData = serializeMetricsPayload(generateRandomData())
    broadcast(randomData)
  }, metricsIntervalMs)

  wss.on("connection", (socket, request) => {
    const id = nextClientId
    nextClientId += 1
    log.info("WebSocket connected", {
      id,
      clients: wss.clients.size,
      ip: request.socket.remoteAddress,
    })

    socket.on("error", (err) => {
      log.error("WebSocket client error", { id, message: err.message })
    })

    socket.on("close", (code) => {
      log.info("WebSocket disconnected", {
        id,
        code,
        clients: wss.clients.size,
      })
    })

    socket.send(randomData)
  })

  return new Promise((resolve, reject) => {
    server.once("error", (err) => {
      log.error("HTTP server failed to bind", { message: err.message, port })
      reject(err)
    })
    server.listen(port, () => {
      const address = server.address()
      if (!address || typeof address === "string") {
        reject(new Error("Server did not bind a TCP port"))
        return
      }

      const boundPort = address.port
      log.info("Server listening", {
        port: boundPort,
        env: process.env.NODE_ENV ?? "development",
        http: `http://127.0.0.1:${boundPort}`,
        ws: `ws://127.0.0.1:${boundPort}/ws`,
        metricsIntervalMs,
      })
      if (isProd) {
        log.info("Serving frontend", { dir: frontendDist })
      }

      resolve({
        port: boundPort,
        server,
        close: () =>
          new Promise((closeResolve, closeReject) => {
            log.info("Server shutting down", { port: boundPort })
            clearInterval(interval)
            wss.close()
            server.close((err) => {
              if (err) closeReject(err)
              else closeResolve()
            })
          }),
      })
    })
  })
}
