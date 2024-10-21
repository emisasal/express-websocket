import { useEffect, useState } from "react"
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import useWebSocket, { ReadyState } from "react-use-websocket"
import styles from "./chart.module.css"

interface ChartData {
  name: string
  pv: number
  uv: number
}

const ChartUseWebsocket = () => {
  const WS_URL = "ws://localhost:8080"
  const [data, setData] = useState<ChartData[]>([])

  const { lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      shouldReconnect: () => true,
    }
  )

  useEffect(() => {
    console.log("lastJsonMessage", lastJsonMessage)
    if (lastJsonMessage !== null) {
      setData(prev => prev = lastJsonMessage as ChartData[])
    }
  }, [lastJsonMessage])

  const containerProps = {
    width: "90%",
    height: "100%",
    aspect: 3,
  }

  //   Not updating the chart

  return (
    <div className={styles.container}>
      <h2>React Use Websocket Chart</h2>
      <h3>ws://localhost:8080</h3>
      <div className={styles.status}>
        <p>
          Websocket status:{" "}
          {readyState === ReadyState.OPEN ? "Connected" : "Disconnected"}
        </p>
      </div>
      <ResponsiveContainer {...containerProps}>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="pv"
            fill="#8884d8"
            activeBar={<Rectangle fill="pink" stroke="blue" />}
          />
          <Bar
            dataKey="uv"
            fill="#82ca9d"
            activeBar={<Rectangle fill="gold" stroke="purple" />}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ChartUseWebsocket
