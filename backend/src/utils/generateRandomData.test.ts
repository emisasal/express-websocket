import { describe, expect, it } from "vitest"
import { parseMetricsPayload } from "@express-websocket/shared"
import { generateRandomData } from "./generateRandomData"

describe("generateRandomData", () => {
  it("matches the shared metrics schema", () => {
    const parsed = parseMetricsPayload(generateRandomData())
    expect(parsed).not.toBeNull()
    expect(parsed).toHaveLength(7)
  })
})
