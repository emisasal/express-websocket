import ResizableBox from "../ResizableBox"
// import useDemoConfig from "../useDemoConfig"
import React, { useState } from "react"
import { AxisOptions, Chart } from "react-charts"

export default function Bar() {
  // const { data, randomizeData } = useDemoConfig({
  //   series: 3,
  //   dataType: "ordinal",
  // })

  const [data, setData] =useState([])

  const socket = new WebSocket("ws://localhost:8080")

  socket.onmessage = (event) => {
    // const data = JSON.parse(event.data);
    
    setData(JSON.parse(event.data))
  };

  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  )

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  )

  return (
    <>
      {/* <button onClick={randomizeData}>Randomize Data</button>
      <br />
      <br /> */}
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  )
}
