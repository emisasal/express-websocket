import { useEffect, useState } from "react"
import type { Item } from "@express-websocket/shared"
import { fetchCatalog } from "../api"

type ItemsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: Item[] }

const priceFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})

export function Items() {
  const [state, setState] = useState<ItemsState>({ status: "loading" })

  useEffect(() => {
    const controller = new AbortController()

    const fetchItems = async () => {
      try {
        const items = await fetchCatalog(controller.signal)
        setState({ status: "ready", items })
      } catch (error) {
        if (controller.signal.aborted) return
        if (
          typeof error === "object" &&
          error !== null &&
          "code" in error &&
          error.code === "ERR_CANCELED"
        ) {
          return
        }
        setState({
          status: "error",
          message:
            "Could not load catalog. Check that the API is running, then refresh.",
        })
      }
    }

    void fetchItems()
    return () => controller.abort()
  }, [])

  return (
    <section
      className="rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm"
      aria-labelledby="catalog-heading"
    >
      <h2 id="catalog-heading" className="text-lg font-semibold text-pretty">
        Product Catalog
      </h2>
      <p className="mt-1 text-sm text-zinc-400">
        Snapshot from{" "}
        <code translate="no" className="text-zinc-300">
          /api
        </code>
      </p>

      {state.status === "loading" ? (
        <p className="mt-6 text-sm text-zinc-400">Loading catalog…</p>
      ) : null}

      {state.status === "error" ? (
        <p className="mt-6 text-sm text-red-300" role="alert">
          {state.message}
        </p>
      ) : null}

      {state.status === "ready" && state.items.length === 0 ? (
        <p className="mt-6 text-sm text-zinc-400">
          No products in the catalog yet.
        </p>
      ) : null}

      {state.status === "ready" && state.items.length > 0 ? (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
            <caption className="sr-only">
              Products available from the HTTP API
            </caption>
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400">
                <th scope="col" className="py-2 pr-4 font-medium">
                  Product
                </th>
                <th scope="col" className="py-2 pr-4 font-medium">
                  Category
                </th>
                <th scope="col" className="py-2 pr-4 font-medium tabular-nums">
                  Price
                </th>
                <th scope="col" className="py-2 font-medium">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-zinc-800/80 last:border-0"
                >
                  <td
                    className="max-w-40 truncate py-3 pr-4 font-medium"
                    title={item.name}
                  >
                    {item.name}
                  </td>
                  <td className="py-3 pr-4 text-zinc-300">{item.category}</td>
                  <td className="py-3 pr-4 text-zinc-200 tabular-nums">
                    {priceFormat.format(item.price)}
                  </td>
                  <td className="py-3">
                    <span
                      className={
                        item.inStock
                          ? "rounded-full bg-emerald-400/15 px-2 py-0.5 text-emerald-300"
                          : "rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400"
                      }
                    >
                      {item.inStock ? "In stock" : "Out of stock"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}
