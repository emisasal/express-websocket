import path from "node:path"
import http from "node:http"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { WebSocket, WebSocketServer } from "ws"
import { serializeMetricsPayload } from "@express-websocket/shared"
import routes from "./routes"
import { generateRandomData } from "./utils/generateRandomData"

const isProd = process.env.NODE_ENV === "production"

const frontendDist = path.resolve(
  process.env.FRONTEND_DIST ??
    path.join(__dirname, "..", "..", "frontend", "dist"),
)

export function createApp() {
  const app = express()

  app.use(cors())
  if (process.env.NODE_ENV !== "test") {
    app.use(morgan("dev"))
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

  wss.on("error", (err) => console.error(err))

  function broadcast(payload: string) {
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(payload)
      }
    }
  }

  const interval = setInterval(() => {
    randomData = serializeMetricsPayload(generateRandomData())
    broadcast(randomData)
  }, metricsIntervalMs)

  wss.on("connection", (socket) => {
    socket.on("error", (err) => console.error(err))
    socket.send(randomData)
  })

  return new Promise((resolve, reject) => {
    server.once("error", reject)
    server.listen(port, () => {
      const address = server.address()
      if (!address || typeof address === "string") {
        reject(new Error("Server did not bind a TCP port"))
        return
      }

      resolve({
        port: address.port,
        server,
        close: () =>
          new Promise((closeResolve, closeReject) => {
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
