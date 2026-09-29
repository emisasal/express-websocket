import catalogJson from "./mocks/mockData.json"

export type Item = {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
}

export type Catalog = {
  items: Item[]
}

export const catalog: Catalog = catalogJson
