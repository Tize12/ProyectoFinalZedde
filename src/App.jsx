import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import ItemListContainer from "./components/ItemListContainer"
import ItemDetailContainer from "./components/ItemDetailContainer"
import Cart from "./components/Cart";



function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Bienvenidos a mi tienda" />}
        />

        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Filtrando productos" />}
        />

        <Route
          path="/item/:itemId"
          element={<ItemDetailContainer />}
        />
        
        <Route path="/cart" element={<Cart />} />     

        <Route
          path="*"
          element={<h2>404 - Página no encontrada</h2>}
        />
      </Routes>
    </>
  )
}

export default App
