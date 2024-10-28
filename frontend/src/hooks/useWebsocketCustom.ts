import { useCallback, useEffect, useRef, useState } from "react"

export const useWebsocketCustom = (url: string) => {
  const [data, setData] = useState()
  const [status, setStatus] = useState("DISCONNECTED")

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(url)

    socket.onopen = () => setStatus("CONNECTED")
    socket.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }
    socket.onclose = () => setStatus("DISCONNECTED")
    socket.onerror = () => {
      setStatus("ERROR")
      socket.close()
    }

    ws.current = socket

    return () => {
      socket.close()
    }
  }, [data, url])

  const send = useCallback(() => {
    if (ws.current?.readyState === WebSocket.OPEN && data !== undefined) {
      ws.current.send(data)
    }
  }, [ws.current, data])

  return [data, status, send]
}

// The useWebsocket hook takes a URL and returns an array with three elements:
// "isReady" is a boolean that indicates whether the connection is ready
// "data" is the data received from the server
// "send" is a function that sends data to the server

//  ToDo: Reconnect to the websocket when the connection is lost
