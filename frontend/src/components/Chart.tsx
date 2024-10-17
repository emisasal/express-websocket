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
  const [isReady, data] = useWebsocket("ws://localhost:8080")

  const containerProps = {
    width: "100%",
    heigth: "100%",
    aspect: 1.3,
  }

  return (
    <div className={styles.container}>
      <div>
        <h1>Real-Time Data Chart</h1>
        <p>
          This chart displays real-time data using WebSockets. The data is
          generated on the server and sent to the client every 5 seconds.
        </p>
        <p>{isReady ? "Connected" : "Disconnected"}</p>
      </div>

      <ResponsiveContainer {...containerProps}>
        <BarChart
          width={500}
          height={250}
          data={data as any}
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
