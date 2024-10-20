import { useEffect, useRef, useState } from "react"

export const useWebsocketCustom = (url: string) => {
  const [isReady, setIsReady] = useState(false)
  const [data, setData] = useState()

  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    const socket = new WebSocket(url)

    socket.onopen = () => setIsReady(true)
    socket.onmessage = (event) => {
      setData(JSON.parse(event.data))
    }
    socket.onclose = () => setIsReady(false)

    ws.current = socket

    return () => socket.close()
  }, [data, url])

  return [isReady, data, (ws.current as WebSocket)?.send.bind(ws.current)]
}
// The useWebsocket hook takes a URL and returns an array with three elements:
// "isReady" is a boolean that indicates whether the connection is ready
// "data" is the data received from the server
// "send" is a function that sends data to the server

//  ToDo: Reconnect to the websocket when the connection is lost