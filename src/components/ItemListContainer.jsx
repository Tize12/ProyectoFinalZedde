import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProducts, getProductsByCategory } from "../firebase/firestore"
import ItemList from "./ItemList"

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    const fetchProducts = categoryId
      ? getProductsByCategory(categoryId)
      : getProducts()

    fetchProducts
      .then((data) => setItems(data))
      .catch((err) => {
        console.error(err)
        setError("No se pudieron cargar los productos.")
      })
      .finally(() => setLoading(false))
  }, [categoryId])

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⏳</div>
        <p style={{ color: "#aaa", fontSize: "1.1rem" }}>Cargando productos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⚠️</div>
        <p style={{ color: "#ff6b6b", fontSize: "1.1rem" }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "32px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
      <h2 style={{ color: "#fff", marginBottom: "8px" }}>{greeting}</h2>
      {categoryId && (
        <p style={{ color: "#6c63ff", marginBottom: "0", textTransform: "capitalize" }}>
          Categoría: {categoryId}
        </p>
      )}
      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px", color: "#aaa" }}>
          <div style={{ fontSize: "3rem", marginBottom: "16px" }}>🎮</div>
          <p>No hay productos en esta categoría.</p>
        </div>
      ) : (
        <ItemList items={items} />
      )}
    </div>
  )
}

export default ItemListContainer
