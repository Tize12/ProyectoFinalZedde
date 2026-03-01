import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"

const CartWidget = () => {
  const { getTotalItems } = useContext(CartContext)
  const total = getTotalItems()

  return (
    <Link to="/cart" style={{ textDecoration: "none" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: total > 0 ? "#6c63ff" : "#1e1e2e",
        padding: "8px 16px",
        borderRadius: "20px",
        cursor: "pointer",
        transition: "background-color 0.2s",
        border: "1px solid #6c63ff"
      }}>
        <span style={{ fontSize: "1.2rem" }}>🛒</span>
        <span style={{ color: "#fff", fontWeight: "bold" }}>{total}</span>
      </div>
    </Link>
  )
}

export default CartWidget
