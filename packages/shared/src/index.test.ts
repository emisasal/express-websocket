import { describe, expect, it } from "vitest"
import {
  parseCatalog,
  parseMetricsPayload,
  serializeMetricsPayload,
} from "./index"

describe("metricsPayloadSchema", () => {
  it("accepts a valid series", () => {
    const payload = [{ name: "Page A", pv: 10, uv: 4 }]
    expect(parseMetricsPayload(payload)).toEqual(payload)
    expect(JSON.parse(serializeMetricsPayload(payload))).toEqual(payload)
  })

  it("rejects a renamed field", () => {
    expect(parseMetricsPayload([{ name: "Page A", views: 10, uv: 4 }])).toBe(
      null,
    )
  })
})

describe("catalogSchema", () => {
  it("parses a catalog snapshot", () => {
    const catalog = {
      items: [
        {
          id: 1,
          name: "Widget A",
          category: "Electronics",
          price: 29.99,
          inStock: true,
        },
      ],
    }
    expect(parseCatalog(catalog)).toEqual(catalog)
  })

  it("rejects a malformed item", () => {
    expect(parseCatalog({ items: [{ id: "1", name: "X" }] })).toBe(null)
  })
})
