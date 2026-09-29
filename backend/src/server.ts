import express from "express"
import cors from "cors"
import morgan from "morgan"
import { WebSocket, Server as WebSocketServer } from "ws"
import routes from "./routes"
import { generateRandomData } from "./utils/generateRandomData"

const PORT = 8080

const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/api", routes)

// Start the http server
const server = app.listen(PORT, () => {
  console.log(`HTTP/WS server listening on ${PORT}`)
})

let randomData = JSON.stringify(generateRandomData())

const wss = new WebSocketServer({ server })

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
