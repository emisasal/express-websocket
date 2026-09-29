import axios from "axios"
import { catalogSchema, type Item } from "@express-websocket/shared"
import { getApiUrl } from "./config"

export async function fetchCatalog(signal?: AbortSignal): Promise<Item[]> {
  const response = await axios.get(getApiUrl("/api"), { signal })
  return catalogSchema.parse(response.data).items
}
