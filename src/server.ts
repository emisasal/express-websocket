import express from "express"
import WebSocket from "ws"
import * as fs from "fs"

const PORT = (process.env.PORT as unknown as number) || 8080

const app = express()

// const wss = new WebSocket.Server({ port: PORT })
const wss = new WebSocket.Server({ port: PORT })

wss.on("error", console.error)

wss.on("connection", (ws) => {
  const graphData = fs.readFileSync("src/data/graphData.json", "utf8")

  ws.send(graphData)
})

// Chat
// wss.on("connection", (ws) => {
//   console.log("New client connected")
//   ws.send("Welcome New Client!")

//   ws.on("message", (message) => {
//     console.log(`Received: ${message}`)

//     wss.clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message)
//       }
//     })
//   })

//   ws.on("close", () => {
//     console.log("Client disconnected")
//   })
// })

// Start the server
const port = 3000
app.listen(port, () => {
  console.log(`Server started on http://localhost:${PORT}`)
})
