import { startHttpServer } from "./app"

const PORT = Number(process.env.PORT) || 8080

void startHttpServer({ port: PORT }).then(({ port }) => {
  console.log(`HTTP/WS server listening on ${port}`)
  if (process.env.NODE_ENV === "production") {
    console.log("Serving UI from frontend/dist")
  }
})
