import { z } from "zod"

export const itemSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
  category: z.string().min(1),
  price: z.number().finite(),
  inStock: z.boolean(),
})

export const catalogSchema = z.object({
  items: z.array(itemSchema),
})

export type Item = z.infer<typeof itemSchema>
export type Catalog = z.infer<typeof catalogSchema>

export function parseCatalog(input: unknown): Catalog | null {
  const result = catalogSchema.safeParse(input)
  return result.success ? result.data : null
}
