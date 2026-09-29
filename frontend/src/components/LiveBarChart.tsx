import { useMemo } from "react"
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartOptions,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useLiveSocket } from "../hooks/useLiveSocket"
import type { ChartPoint } from "@express-websocket/shared"
import { getWsUrl } from "../config"
import { StatusBadge } from "./StatusBadge"

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const reduceMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: reduceMotion ? false : { duration: 350 },
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#d4d4d8",
        boxWidth: 12,
        usePointStyle: true,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: "#18181b",
      borderColor: "#3f3f46",
      borderWidth: 1,
      titleColor: "#fafafa",
      bodyColor: "#e4e4e7",
    },
  },
  scales: {
    x: {
      ticks: { color: "#a1a1aa" },
      grid: { color: "rgba(63, 63, 70, 0.6)" },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#a1a1aa" },
      grid: { color: "rgba(63, 63, 70, 0.6)" },
    },
  },
}

function toChartData(points: ChartPoint[]) {
  return {
    labels: points.map((point) => point.name),
    datasets: [
      {
        label: "Page views",
        data: points.map((point) => point.pv),
        backgroundColor: "#2dd4bf",
        borderRadius: 6,
      },
      {
        label: "Unique visitors",
        data: points.map((point) => point.uv),
        backgroundColor: "#38bdf8",
        borderRadius: 6,
      },
    ],
  }
}

export function LiveBarChart() {
  const { data, status } = useLiveSocket(getWsUrl())
  const chartData = useMemo(() => toChartData(data), [data])

  return (
    <section
      className="flex min-h-0 flex-col rounded-2xl border border-zinc-800 bg-zinc-900/70 p-5 shadow-sm"
      aria-labelledby="chart-heading"
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 id="chart-heading" className="text-lg font-semibold text-pretty">
            Live Page Metrics
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            Canvas chart via Chart.js. Values refresh from{" "}
            <code translate="no" className="text-zinc-300">
              /ws
            </code>{" "}
            every 5 seconds.
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="h-72">
        {data.length === 0 ? (
          <p className="flex h-72 items-center justify-center text-sm text-zinc-400">
            Waiting for the first update…
          </p>
        ) : (
          <Bar
            aria-label="Bar chart of page views and unique visitors by page"
            options={options}
            data={chartData}
          />
        )}
      </div>
    </section>
  )
}
