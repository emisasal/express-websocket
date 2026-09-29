import path from "node:path"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import { WebSocket, Server as WebSocketServer } from "ws"
import routes from "./routes"
import { generateRandomData } from "./utils/generateRandomData"

const PORT = Number(process.env.PORT) || 8080
const isProd = process.env.NODE_ENV === "production"
const frontendDist = path.resolve(
  process.env.FRONTEND_DIST ??
    path.join(__dirname, "..", "..", "frontend", "dist"),
)

const app = express()

app.use(cors())
app.use(morgan("dev"))
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

const server = app.listen(PORT, () => {
  console.log(`HTTP/WS server listening on ${PORT}`)
  if (isProd) {
    console.log(`Serving UI from ${frontendDist}`)
  }
})

let randomData = JSON.stringify(generateRandomData())

const wss = new WebSocketServer({ server, path: "/ws" })

wss.on("error", (err) => console.error(err))

function broadcast(payload: string) {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(payload)
    }
  }
}

setInterval(() => {
  randomData = JSON.stringify(generateRandomData())
  broadcast(randomData)
}, 5000)

wss.on("connection", (socket) => {
  socket.on("error", (err) => console.error(err))
  socket.send(randomData)
})
