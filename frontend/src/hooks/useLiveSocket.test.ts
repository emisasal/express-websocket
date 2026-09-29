import { act, renderHook, waitFor } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { useLiveSocket } from "./useLiveSocket"

class MockWebSocket {
  static instances: MockWebSocket[] = []
  onopen: ((event?: Event) => void) | null = null
  onmessage: ((event: { data: string }) => void) | null = null
  onerror: (() => void) | null = null
  onclose: (() => void) | null = null

  constructor(public url: string) {
    MockWebSocket.instances.push(this)
    queueMicrotask(() => this.onopen?.())
  }

  close() {
    queueMicrotask(() => this.onclose?.())
  }

  emit(data: unknown) {
    this.onmessage?.({ data: JSON.stringify(data) })
  }
}

describe("useLiveSocket", () => {
  afterEach(() => {
    MockWebSocket.instances = []
    vi.unstubAllGlobals()
  })

  it("stores schema-valid metrics from the socket", async () => {
    vi.stubGlobal("WebSocket", MockWebSocket)
    const { result } = renderHook(() => useLiveSocket("ws://example.test/ws"))

    await waitFor(() => expect(result.current.status).toBe("open"))

    act(() => {
      MockWebSocket.instances[0]?.emit([{ name: "Page A", pv: 12, uv: 3 }])
    })

    await waitFor(() =>
      expect(result.current.data).toEqual([{ name: "Page A", pv: 12, uv: 3 }]),
    )
  })

  it("ignores frames that fail the shared schema", async () => {
    vi.stubGlobal("WebSocket", MockWebSocket)
    const { result } = renderHook(() => useLiveSocket("ws://example.test/ws"))

    await waitFor(() => expect(result.current.status).toBe("open"))

    act(() => {
      MockWebSocket.instances[0]?.emit([{ name: "Page A" }])
    })

    expect(result.current.data).toEqual([])
  })
})
