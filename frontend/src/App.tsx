import { lazy, Suspense } from "react"
// import ChartWSCustom from "./components/ChartWSCustom"
import ChartUseWebsocket from "./components/ChartUseWebsocket"
import "./App.css"

const Items = lazy(() => import("./components/Items"))

function App() {
  return (
    <main>
      <header>
        <h1>Websocket Real-Time Data Chart</h1>
        <p>
          The chart displays real-time data using WebSockets. The data is
          generated on the server and sent to the client every 5 seconds.
        </p>
        <p>The items list is fetched from the server using a REST API.</p>
        <br />
      </header>
      <hr />
      {/* <ChartWSCustom /> */}
      <ChartUseWebsocket />
      <hr />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Items />
      </Suspense>
    </main>
  )
}

export default App
