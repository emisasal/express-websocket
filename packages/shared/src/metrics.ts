import { z } from "zod"

export const chartPointSchema = z.object({
  name: z.string().min(1),
  pv: z.number().finite(),
  uv: z.number().finite(),
})

export const metricsPayloadSchema = z.array(chartPointSchema)

export type ChartPoint = z.infer<typeof chartPointSchema>

export function parseMetricsPayload(input: unknown): ChartPoint[] | null {
  const result = metricsPayloadSchema.safeParse(input)
  return result.success ? result.data : null
}

export function serializeMetricsPayload(points: ChartPoint[]): string {
  return JSON.stringify(metricsPayloadSchema.parse(points))
}
