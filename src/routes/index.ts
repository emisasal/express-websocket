import express, { Request, Response } from "express"
import * as fs from "fs"

const router = express.Router()

// Get all items
router.get("/", (req: Request, res: Response) => {
  // Read the JSON file
  const data = fs.readFileSync("src/data/mocks.json", "utf8")
  const items = JSON.parse(data)

  // Return all items
  res.json(items)
})

// Get a single item by ID
router.get("/:id", (req: Request, res: Response) => {
  // Read the JSON file
  const data = fs.readFileSync("src/data/mocks.json", "utf8")
  const items = JSON.parse(data)

  // Find the item by ID
  const itemId = req.params.id

  const item = items.users.filter((item: any) => item.id === Number(itemId))

  // Return the item
  res.json(item[0])
})

export default router
