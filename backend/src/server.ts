import { startHttpServer } from "./app"
import { log } from "./log"

const PORT = Number(process.env.PORT) || 8080

void startHttpServer({ port: PORT }).catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err)
  log.error("Server exited", { message })
  process.exitCode = 1
})
