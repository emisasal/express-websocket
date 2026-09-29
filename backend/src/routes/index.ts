import express, { Request, Response } from "express"
import { catalog, getCatalogItemByIdParam } from "../catalog"

const router = express.Router()

router.get("/", (_req: Request, res: Response) => {
  res.status(200).json(catalog)
})

router.get("/:id", (req: Request, res: Response) => {
  const result = getCatalogItemByIdParam(String(req.params.id))
  if (result.status !== 200) {
    res.status(result.status).json({ error: result.error })
    return
  }

  res.status(200).json(result.item)
})

export default router
