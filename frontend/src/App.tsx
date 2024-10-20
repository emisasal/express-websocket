import Chart from "./components/Chart"
import "./App.css"

function App() {
  return (
    <main>
      <header>
        <h1>Real-Time Data Chart</h1>
        <p>
          This chart displays real-time data using WebSockets. The data is
          generated on the server and sent to the client every 5 seconds.
        </p>
      </header>
      <Chart />
    </main>
  )
}

export default App
