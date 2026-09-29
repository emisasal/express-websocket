export function getApiUrl(pathname: string): string {
  const base = import.meta.env.VITE_API_BASE ?? ""
  return `${base}${pathname}`
}

export function getWsUrl(): string {
  if (import.meta.env.VITE_WS_URL) {
    return import.meta.env.VITE_WS_URL
  }

  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:"
  return `${protocol}//${window.location.host}/ws`
}
