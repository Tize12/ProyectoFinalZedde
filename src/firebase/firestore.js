import { db } from "./config"
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
  limit
} from "firebase/firestore"

export const getProducts = async () => {
  const productsRef = collection(db, "products")
  const snapshot = await getDocs(productsRef)
  return snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }))
}

export const getProductsByCategory = async (category) => {
  const productsRef = collection(db, "products")
  const q = query(productsRef, where("category", "==", category))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(doc => ({ firestoreId: doc.id, ...doc.data() }))
}

export const getProductById = async (id) => {
  const productsRef = collection(db, "products")
  const q = query(productsRef, where("id", "==", Number(id)), limit(1))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return null
  const docSnap = snapshot.docs[0]
  return { firestoreId: docSnap.id, ...docSnap.data() }
}

export const createOrder = async (order) => {
  const ordersRef = collection(db, "orders")
  const docRef = await addDoc(ordersRef, {
    ...order,
    date: serverTimestamp()
  })
  return docRef.id
}