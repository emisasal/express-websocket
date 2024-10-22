import { useEffect, useRef, useState } from "react"

export const useWebsocketCustom = (url: string) => {
  const [data, setData] = useState()
  const [status, setStatus] = useState("DISCONNECTED")

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(url)

    socket.onerror = () => setStatus("ERROR")
    socket.onopen = () => setStatus("CONNECTED")
    socket.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }
    socket.onclose = () => setStatus("DISCONNECTED")

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [data, url])

  return [data, status, (ws.current as WebSocket)?.send.bind(ws.current)]
}

// The useWebsocket hook takes a URL and returns an array with three elements:
// "isReady" is a boolean that indicates whether the connection is ready
// "data" is the data received from the server
// "send" is a function that sends data to the server

//  ToDo: Reconnect to the websocket when the connection is lost
