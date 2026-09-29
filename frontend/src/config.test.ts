import { describe, expect, it } from "vitest"
import { getApiUrl, getWsUrl } from "./config"

describe("getApiUrl", () => {
  it("prefixes an optional API base", () => {
    expect(getApiUrl("/api")).toBe("/api")
  })
})

describe("getWsUrl", () => {
  it("uses the current host and /ws", () => {
    expect(getWsUrl()).toBe("ws://localhost:3000/ws")
  })
})
