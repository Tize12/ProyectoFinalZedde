import { useState, useContext } from "react"
import { CartContext } from "../context/CartContext"
import { createOrder } from "../firebase/firestore"

const CheckoutForm = ({ onOrderConfirmed }) => {
  const { cart, getTotalPrice, clearCart } = useContext(CartContext)
  const [formData, setFormData] = useState({ name: "", lastName: "", email: "", emailConfirm: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio"
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido"
    if (formData.email !== formData.emailConfirm) newErrors.emailConfirm = "Los emails no coinciden"
    return newErrors
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setLoading(true)

    const order = {
      buyer: {
        name: formData.name,
        lastName: formData.lastName,
        email: formData.email
      },
      items: cart.map(item => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: getTotalPrice()
    }

    try {
      const orderId = await createOrder(order)
      clearCart()
      onOrderConfirmed(orderId)
    } catch (err) {
      console.error("Error al crear la orden:", err)
      alert("Hubo un error al procesar la compra. Intentá de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    backgroundColor: "#2e2e3e",
    border: "1px solid #3e3e4e",
    borderRadius: "8px",
    color: "#fff",
    fontSize: "1rem",
    boxSizing: "border-box"
  }

  const labelStyle = { color: "#aaa", fontSize: "0.9rem", marginBottom: "4px", display: "block" }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <h3 style={{ color: "#fff", margin: "0 0 8px" }}>Datos del comprador</h3>

      <div>
        <label style={labelStyle}>Nombre</label>
        <input name="name" value={formData.name} onChange={handleChange} style={inputStyle} placeholder="Juan" />
        {errors.name && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: "4px 0 0" }}>{errors.name}</p>}
      </div>

      <div>
        <label style={labelStyle}>Apellido</label>
        <input name="lastName" value={formData.lastName} onChange={handleChange} style={inputStyle} placeholder="Pérez" />
        {errors.lastName && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: "4px 0 0" }}>{errors.lastName}</p>}
      </div>

      <div>
        <label style={labelStyle}>Email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} style={inputStyle} placeholder="juan@email.com" />
        {errors.email && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: "4px 0 0" }}>{errors.email}</p>}
      </div>

      <div>
        <label style={labelStyle}>Confirmar Email</label>
        <input name="emailConfirm" type="email" value={formData.emailConfirm} onChange={handleChange} style={inputStyle} placeholder="juan@email.com" />
        {errors.emailConfirm && <p style={{ color: "#ff6b6b", fontSize: "0.8rem", margin: "4px 0 0" }}>{errors.emailConfirm}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        style={{
          backgroundColor: loading ? "#444" : "#6c63ff",
          color: "#fff",
          border: "none",
          padding: "14px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "8px"
        }}
      >
        {loading ? "Procesando orden..." : "Confirmar compra ✅"}
      </button>
    </form>
  )
}

export default CheckoutForm
