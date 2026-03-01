import CartWidget from "./CartWidget"
import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "16px 32px",
      backgroundColor: "#0f0f1a",
      color: "#fff",
      borderBottom: "2px solid #6c63ff",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h2 style={{ margin: 0, color: "#6c63ff", fontSize: "1.6rem" }}>
          🎮 PixelStore
        </h2>
      </Link>

      <ul style={{
        display: "flex",
        gap: "20px",
        listStyle: "none",
        margin: 0,
        padding: 0
      }}>
        <li>
          <Link to="/" style={{ textDecoration: "none", color: "#ccc", fontWeight: "500" }}>
            Inicio
          </Link>
        </li>
        <li>
          <Link to="/category/consolas" style={{ textDecoration: "none", color: "#ccc", fontWeight: "500" }}>
            Consolas
          </Link>
        </li>
        <li>
          <Link to="/category/juegos" style={{ textDecoration: "none", color: "#ccc", fontWeight: "500" }}>
            Juegos
          </Link>
        </li>
        <li>
          <Link to="/category/accesorios" style={{ textDecoration: "none", color: "#ccc", fontWeight: "500" }}>
            Accesorios
          </Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  )
}

export default NavBar
