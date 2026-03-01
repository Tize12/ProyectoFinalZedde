import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../firebase/firestore"
import ItemDetail from "./ItemDetail"

const ItemDetailContainer = () => {
  const { itemId } = useParams()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    getProductById(itemId)
      .then((data) => {
        if (!data) setError("Producto no encontrado.")
        else setItem(data)
      })
      .catch((err) => {
        console.error(err)
        setError("No se pudo cargar el producto.")
      })
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>⏳</div>
        <p style={{ color: "#aaa", fontSize: "1.1rem" }}>Cargando producto...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "80px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px" }}>😕</div>
        <p style={{ color: "#ff6b6b", fontSize: "1.1rem" }}>{error}</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "32px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
      <ItemDetail item={item} />
    </div>
  )
}

export default ItemDetailContainer
