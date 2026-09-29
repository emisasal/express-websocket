import type { ChartPoint } from "@express-websocket/shared"

const pages = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
]

export function generateRandomData(): ChartPoint[] {
  return pages.map((name) => ({
    name,
    uv: Math.floor(Math.random() * 5000),
    pv: Math.floor(Math.random() * 5000),
  }))
}
