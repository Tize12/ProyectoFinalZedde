import { useContext } from "react"
import { CartContext } from "../context/CartContext"

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext)

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "16px",
      backgroundColor: "#1e1e2e",
      padding: "16px",
      borderRadius: "12px",
      border: "1px solid #2e2e3e"
    }}>
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "70px", height: "70px", borderRadius: "8px", objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: "0 0 4px", color: "#fff" }}>{item.name}</h4>
        <p style={{ margin: 0, color: "#aaa", fontSize: "0.85rem" }}>
          ${item.price.toLocaleString("es-AR")} × {item.quantity}
        </p>
      </div>
      <p style={{ color: "#6c63ff", fontWeight: "bold", fontSize: "1.1rem", margin: 0, minWidth: "100px", textAlign: "right" }}>
        ${(item.price * item.quantity).toLocaleString("es-AR")}
      </p>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          backgroundColor: "transparent",
          color: "#ff6b6b",
          border: "1px solid #ff6b6b",
          borderRadius: "8px",
          padding: "6px 12px",
          cursor: "pointer",
          fontSize: "0.9rem"
        }}
      >
        🗑️
      </button>
    </div>
  )
}

export default CartItem
