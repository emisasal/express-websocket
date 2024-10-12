import { useState } from 'react'
import Barchart from "./components/BarChart"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Barchart />
  )
}

export default App
