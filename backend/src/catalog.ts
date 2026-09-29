import catalogJson from "./mocks/mockData.json"
import {
  catalogSchema,
  type Catalog,
  type Item,
} from "@express-websocket/shared"

export type { Catalog, Item }

export const catalog: Catalog = catalogSchema.parse(catalogJson)

export function getCatalogItemByIdParam(
  idParam: string,
): { status: 200; item: Item } | { status: 400 | 404; error: string } {
  const id = Number(idParam)
  if (!Number.isInteger(id)) {
    return { status: 400, error: "Invalid item id" }
  }

  const item = catalog.items.find((entry) => entry.id === id)
  if (!item) {
    return { status: 404, error: "Item not found" }
  }

  return { status: 200, item }
}
