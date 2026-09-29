import { Items } from "./components/Items"
import { LiveBarChart } from "./components/LiveBarChart"

function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zinc-100 focus:px-3 focus:py-2 focus:text-zinc-950 focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-dvh max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="text-sm font-medium tracking-wide text-teal-300 uppercase">
            Express &amp; WebSocket
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-pretty sm:text-4xl">
            Live Metrics Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-base text-pretty text-zinc-400">
            Watch page metrics update over a WebSocket, then review the product
            catalog from the REST API. Chart and list sit in separate panels so
            neither covers the other.
          </p>
        </header>
        <main id="main" className="grid flex-1 gap-6 lg:grid-cols-5">
          <div className="min-w-0 lg:col-span-3">
            <LiveBarChart />
          </div>
          <div className="min-w-0 lg:col-span-2">
            <Items />
          </div>
        </main>
      </div>
    </>
  )
}

export default App
