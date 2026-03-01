// SCRIPT PARA CARGAR PRODUCTOS A FIRESTORE
// Ejecutar UNA SOLA VEZ desde cualquier componente temporalmente,
// o desde la consola del navegador.
//
// Uso: importar y llamar seedProducts() una vez, luego borrar la llamada.

import { db } from "./config"
import { collection, addDoc } from "firebase/firestore"
import products from "../data/products"

export const seedProducts = async () => {
  const productsRef = collection(db, "products")

  try {
    for (const product of products) {
      await addDoc(productsRef, product)
      console.log(`✅ Producto cargado: ${product.name}`)
    }
    console.log("🎉 Todos los productos fueron cargados a Firestore!")
  } catch (error) {
    console.error("❌ Error al cargar productos:", error)
  }
}
