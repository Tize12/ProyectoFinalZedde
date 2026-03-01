import { useState } from "react"

const ItemCount = ({ stock, onAdd }) => {
  const [count, setCount] = useState(1)

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  const increase = () => {
    if (count < stock) setCount(count + 1)
  }

  const btnStyle = {
    width: "36px",
    height: "36px",
    backgroundColor: "#2e2e3e",
    color: "#fff",
    border: "1px solid #6c63ff",
    borderRadius: "8px",
    fontSize: "1.2rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <button style={btnStyle} onClick={decrease} disabled={count <= 1}>−</button>
        <span style={{ color: "#fff", fontSize: "1.2rem", fontWeight: "bold", minWidth: "24px", textAlign: "center" }}>
          {count}
        </span>
        <button style={btnStyle} onClick={increase} disabled={count >= stock}>+</button>
      </div>
      <p style={{ color: "#aaa", fontSize: "0.85rem", margin: 0 }}>
        Stock disponible: {stock} unidades
      </p>
      <button
        onClick={() => onAdd(count)}
        style={{
          backgroundColor: "#6c63ff",
          color: "#fff",
          border: "none",
          padding: "12px 28px",
          borderRadius: "8px",
          fontSize: "1rem",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Agregar al carrito 🛒
      </button>
    </div>
  )
}

export default ItemCount
