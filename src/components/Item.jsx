import { Link } from "react-router-dom"

const Item = ({ item }) => {
  return (
    <div style={{
      backgroundColor: "#1e1e2e",
      borderRadius: "12px",
      overflow: "hidden",
      border: "1px solid #2e2e3e",
      transition: "transform 0.2s, border-color 0.2s",
      cursor: "pointer"
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "#6c63ff"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "#2e2e3e"}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100%", height: "180px", objectFit: "cover" }}
      />
      <div style={{ padding: "16px" }}>
        <h3 style={{ margin: "0 0 8px", color: "#fff", fontSize: "1rem" }}>{item.name}</h3>
        <p style={{ margin: "0 0 4px", color: "#aaa", fontSize: "0.85rem" }}>
          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
        </p>
        <p style={{ margin: "0 0 12px", color: "#6c63ff", fontWeight: "bold", fontSize: "1.1rem" }}>
          ${item.price.toLocaleString("es-AR")}
        </p>
        {item.stock === 0 ? (
          <span style={{ color: "#ff6b6b", fontSize: "0.85rem" }}>Sin stock</span>
        ) : (
          <Link
            to={`/item/${item.id}`}
            style={{
              display: "inline-block",
              backgroundColor: "#6c63ff",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "500"
            }}
          >
            Ver detalle
          </Link>
        )}
      </div>
    </div>
  )
}

export default Item