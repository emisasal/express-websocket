import axios from "axios"
import styles from "./items.module.css"
import { useEffect, useState } from "react"

type Item = {
  id: number
  name: string
  category: string
  price: number
  inStock: boolean
}

const Items = () => {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:8080/api")
      setItems(response?.data?.items)
    }
    fetchItems()
  }, [])

  return (
    <div className={styles.container}>
      <h2>HTTP Items List</h2>
      <h3>http://localhost:8080/api</h3>

      <ul>
        {items?.map((item: Item) => (
          <li key={item.id}>{`id: ${item.id} - name: ${item.name} - category: ${item.category} - price: ${item.price} - inStock: ${item.inStock}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default Items
