import express, { Request, Response } from "express"
import * as fs from "fs"

const router = express.Router()

// Create a new item
router.post("/", (req: Request, res: Response) => {
  // Your code to create a new item goes here
})

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

// Update an item by ID
router.put("/:id", (req: Request, res: Response) => {
  // Your code to update an item by ID goes here
})

// Delete an item by ID
router.delete("/:id", (req: Request, res: Response) => {
  // Your code to delete an item by ID goes here
})

export default router
