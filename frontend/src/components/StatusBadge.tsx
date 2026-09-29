import type { ConnectionStatus } from "../hooks/useLiveSocket"

const labels: Record<ConnectionStatus, string> = {
  connecting: "Connecting…",
  open: "Live",
  closed: "Reconnecting…",
  error: "Connection error",
}

const tones: Record<ConnectionStatus, string> = {
  connecting: "bg-amber-400/20 text-amber-200 ring-amber-400/40",
  open: "bg-emerald-400/15 text-emerald-300 ring-emerald-400/40",
  closed: "bg-amber-400/20 text-amber-200 ring-amber-400/40",
  error: "bg-red-400/15 text-red-300 ring-red-400/40",
}

const dots: Record<ConnectionStatus, string> = {
  connecting: "bg-amber-300 motion-safe:animate-pulse",
  open: "bg-emerald-400",
  closed: "bg-amber-300 motion-safe:animate-pulse",
  error: "bg-red-400",
}

type StatusBadgeProps = {
  status: ConnectionStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <p
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${tones[status]}`}
      aria-live="polite"
    >
      <span
        className={`size-2 rounded-full ${dots[status]}`}
        aria-hidden="true"
      />
      {labels[status]}
    </p>
  )
}
