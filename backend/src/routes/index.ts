import express, { Request, Response } from "express"
import * as fs from "fs"

const router = express.Router()

// Get all items
router.get("/", (req: Request, res: Response) => {
  const data = fs.readFileSync("src/mocks/mockData.json", "utf8")
  const items = JSON.parse(data)

  res.status(200).send(items)
})

// Get a single item by ID
router.get("/:id", (req: Request, res: Response) => {
  const itemId = req.params.id
  const data = fs.readFileSync("src/mocks/mockData.json", "utf8")
  const items = JSON.parse(data)

  const item = items.items.filter((item: any) => item.id === Number(itemId))

  res.status(200).send(item[0])
})

export default router
