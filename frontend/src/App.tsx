import { lazy, Suspense } from "react"
import Chart from "./components/Chart"
import "./App.css"

const Items = lazy(() => import("./components/Items"))

function App() {
  return (
    <main>
      <header>
        <h1>Websocket Real-Time Data Chart</h1>
        <p>
          Chart displaying real-time data using WebSockets. The data is
          generated on the server and sent to the client every 5 seconds.
        </p>
        <br />
      </header>
      <hr />
      <Chart />
      <hr />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Items />
      </Suspense>
    </main>
  )
}

export default App
