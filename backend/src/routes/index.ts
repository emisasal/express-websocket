import express, { Request, Response } from "express"
import { catalog } from "../catalog"

const router = express.Router()

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(catalog)
})

router.get("/:id", (req: Request, res: Response) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) {
    res.status(400).json({ error: "Invalid item id" })
    return
  }

  const item = catalog.items.find((entry) => entry.id === id)
  if (!item) {
    res.status(404).json({ error: "Item not found" })
    return
  }

  res.status(200).json(item)
})

export default router
