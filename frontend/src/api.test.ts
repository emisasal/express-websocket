import { describe, expect, it, vi } from "vitest"
import { fetchCatalog } from "./api"

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}))

import axios from "axios"

describe("fetchCatalog", () => {
  it("returns items from a valid API payload", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: {
        items: [
          {
            id: 1,
            name: "Widget A",
            category: "Electronics",
            price: 29.99,
            inStock: true,
          },
        ],
      },
    })

    await expect(fetchCatalog()).resolves.toEqual([
      {
        id: 1,
        name: "Widget A",
        category: "Electronics",
        price: 29.99,
        inStock: true,
      },
    ])
  })

  it("rejects a payload that does not match the catalog schema", async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({
      data: { items: [{ id: "1" }] },
    })

    await expect(fetchCatalog()).rejects.toThrow()
  })
})
