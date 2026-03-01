import { useContext, useState } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import CartItem from "./CartItem"
import CheckoutForm from "./CheckoutForm"

const Cart = () => {
  const { cart, clearCart, getTotalPrice, getTotalItems } = useContext(CartContext)
  const [orderId, setOrderId] = useState(null)

  if (orderId) {
    return (
      <div style={{
        textAlign: "center",
        padding: "80px 32px",
        backgroundColor: "#0f0f1a",
        minHeight: "100vh"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
        <h2 style={{ color: "#51cf66", marginBottom: "8px" }}>¡Compra realizada!</h2>
        <p style={{ color: "#aaa", marginBottom: "16px" }}>Tu pedido fue confirmado exitosamente.</p>
        <div style={{
          display: "inline-block",
          backgroundColor: "#1e1e2e",
          border: "1px solid #6c63ff",
          borderRadius: "12px",
          padding: "16px 32px",
          marginBottom: "32px"
        }}>
          <p style={{ color: "#aaa", margin: "0 0 4px", fontSize: "0.9rem" }}>Número de orden</p>
          <p style={{ color: "#6c63ff", fontWeight: "bold", fontSize: "1.2rem", margin: 0 }}>{orderId}</p>
        </div>
        <br />
        <Link
          to="/"
          style={{
            backgroundColor: "#6c63ff",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Seguir comprando 🎮
        </Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div style={{
        textAlign: "center",
        padding: "80px 32px",
        backgroundColor: "#0f0f1a",
        minHeight: "100vh"
      }}>
        <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🛒</div>
        <h2 style={{ color: "#fff", marginBottom: "8px" }}>Tu carrito está vacío</h2>
        <p style={{ color: "#aaa", marginBottom: "32px" }}>¡Agregá productos y volvé acá!</p>
        <Link
          to="/"
          style={{
            backgroundColor: "#6c63ff",
            color: "#fff",
            padding: "12px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold"
          }}
        >
          Ver productos 🎮
        </Link>
      </div>
    )
  }

  return (
    <div style={{ padding: "32px", backgroundColor: "#0f0f1a", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ color: "#fff", margin: 0 }}>
          🛒 Carrito ({getTotalItems()} {getTotalItems() === 1 ? "producto" : "productos"})
        </h2>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "transparent",
            color: "#ff6b6b",
            border: "1px solid #ff6b6b",
            padding: "8px 16px",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Vaciar carrito
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {cart.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div style={{
          backgroundColor: "#1e1e2e",
          borderRadius: "16px",
          padding: "24px",
          border: "1px solid #2e2e3e",
          position: "sticky",
          top: "80px"
        }}>
          <h3 style={{ color: "#fff", margin: "0 0 16px" }}>Resumen</h3>
          {cart.map(item => (
            <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#aaa", fontSize: "0.9rem" }}>{item.name} ×{item.quantity}</span>
              <span style={{ color: "#fff", fontSize: "0.9rem" }}>${(item.price * item.quantity).toLocaleString("es-AR")}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid #2e2e3e", marginTop: "16px", paddingTop: "16px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#fff", fontWeight: "bold" }}>Total</span>
              <span style={{ color: "#6c63ff", fontWeight: "bold", fontSize: "1.3rem" }}>
                ${getTotalPrice().toLocaleString("es-AR")}
              </span>
            </div>
          </div>
          <div style={{ marginTop: "24px" }}>
            <CheckoutForm onOrderConfirmed={setOrderId} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
