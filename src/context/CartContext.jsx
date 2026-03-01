import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item, quantity) => {
    const existingItem = cart.find((p) => p.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p
        )
      );
    } else {
      setCart([...cart, { ...item, quantity }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter((p) => p.id !== itemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const isInCart = (itemId) => {
    return cart.some((p) => p.id === itemId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
