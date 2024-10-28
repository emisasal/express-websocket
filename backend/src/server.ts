import express from "express"
import cors from "cors"
import morgan from "morgan"
import { Server as WebSocketServer } from "ws"
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

// Generate random data
let randomData: Buffer | string = JSON.stringify(generateRandomData())

// Update random data every 5 seconds
setInterval(() => {
  const newData = JSON.stringify(generateRandomData())
  if (newData !== randomData) {
    randomData = JSON.stringify(generateRandomData())
  }
}, 5000)

// Start the websocket server with the http server
const wss = new WebSocketServer({ server })

// Handle errors
wss.on("error", (err) => console.error(err))

// Handle new connections
wss.on("connection", (ws) => {
  ws.on("error", (err) => console.error(err))

  ws.send(randomData)

  ws.on("message", (message) => {
    console.log(`Received: ${message}`)
    //  Handle message data
  })
})

// Handle disconnections
wss.on("close", () => {
  console.log("Client disconnected")
})
