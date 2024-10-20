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
import { useWebsocket } from "../hooks/useWebsocket"
import styles from "./chart.module.css"

const Chart = () => {
  const [isReady, websocketData] = useWebsocket("ws://localhost:8080")

  const data = Array.isArray(websocketData) ? websocketData : []

  const containerProps = {
    width: "90%",
    heigth: "100%",
    aspect: 2.5,
  }

  return (
    <div className={styles.container}>
      <div className={styles.status}>
        <p>Websocket status: {isReady ? "Connected" : "Disconnected"}</p>
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

export default Chart
