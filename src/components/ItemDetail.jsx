import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import ItemCount from "./ItemCount"

const ItemDetail = ({ item }) => {
  const { addToCart, isInCart } = useContext(CartContext)
  const [added, setAdded] = useState(false)

  const handleAdd = (quantity) => {
    addToCart(item, quantity)
    setAdded(true)
  }

  return (
    <div style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
      backgroundColor: "#1e1e2e",
      borderRadius: "16px",
      padding: "32px",
      border: "1px solid #2e2e3e"
    }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "320px", maxWidth: "100%", borderRadius: "12px", objectFit: "cover" }}
      />
      <div style={{ flex: 1, minWidth: "240px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <p style={{ color: "#6c63ff", margin: 0, textTransform: "capitalize", fontSize: "0.9rem" }}>
          {item.category}
        </p>
        <h2 style={{ color: "#fff", margin: 0, fontSize: "1.8rem" }}>{item.name}</h2>
        <p style={{ color: "#aaa", margin: 0, lineHeight: "1.6" }}>{item.description}</p>
        <p style={{ color: "#6c63ff", fontSize: "2rem", fontWeight: "bold", margin: 0 }}>
          ${item.price.toLocaleString("es-AR")}
        </p>

        {item.stock === 0 ? (
          <p style={{ color: "#ff6b6b", fontWeight: "bold" }}>❌ Sin stock disponible</p>
        ) : added || isInCart(item.id) ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p style={{ color: "#51cf66", fontWeight: "bold", margin: 0 }}>
              ✅ Producto agregado al carrito
            </p>
            <Link
              to="/cart"
              style={{
                display: "inline-block",
                backgroundColor: "#51cf66",
                color: "#fff",
                padding: "12px 28px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: "bold",
                textAlign: "center"
              }}
            >
              Ir al carrito 🛒
            </Link>
          </div>
        ) : (
          <ItemCount stock={item.stock} onAdd={handleAdd} />
        )}
      </div>
    </div>
  )
}

export default ItemDetail
