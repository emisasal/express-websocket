import { describe, expect, it } from "vitest"
import { getCatalogItemByIdParam } from "./catalog"

describe("getCatalogItemByIdParam", () => {
  it("returns an item for a known id", () => {
    const result = getCatalogItemByIdParam("1")
    expect(result.status).toBe(200)
    if (result.status === 200) {
      expect(result.item.name).toBe("Widget A")
    }
  })

  it("returns 400 for a non-integer id", () => {
    expect(getCatalogItemByIdParam("abc")).toEqual({
      status: 400,
      error: "Invalid item id",
    })
  })

  it("returns 404 when the item is missing", () => {
    expect(getCatalogItemByIdParam("999")).toEqual({
      status: 404,
      error: "Item not found",
    })
  })
})
