// // src/context/CartContext.jsx
// import React, { createContext, useContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // ✅ Add new items as separate entries
//   const addToCart = (movie) => {
//     setCart((prevCart) => [...prevCart, { ...movie, quantity: 1 }]);
//   };

//   // ✅ Remove one item instance
//   const removeFromCart = (index) => {
//     setCart((prevCart) => prevCart.filter((_, i) => i !== index));
//   };

//   // ✅ Get total items count
//   const getTotalItems = () => cart.length;

//   // ✅ Calculate total price
//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.CurrentPrice * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, getTotalItems, getTotalPrice }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

     // Each Add => new line item
  const addToCart = (movie) => {
    // push a new object with quantity=1 (or use existing quantity if you prefer)
    setCart((prevCart) => [...prevCart, { ...movie, quantity: 1 }]);
  };

  // Decrement quantity by 1; if quantity goes to 0 => remove item
  const decrementItem = (id) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const idx = newCart.findIndex((item) => item.id === id);
      if (idx >= 0) {
        if (newCart[idx].quantity > 1) {
          newCart[idx].quantity -= 1;
        } else {
          // quantity is 1 => remove entire item
          newCart.splice(idx, 1);
        }
      }
      return newCart;
    });
  };

  // Increment quantity by 1
  const incrementItem = (id) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const idx = newCart.findIndex((item) => item.id === id);
      if (idx >= 0) {
        newCart[idx].quantity += 1;
      }
      return newCart;
    });
  };

  // Calculate total price
  const getTotalPrice = () => {
    return cart.reduce((sum, item) => {
      const qty = item.quantity || 1;
      const price = item.CurrentPrice || 0;
      return sum + qty * price;
    }, 0);
  };

  // If you want a separate function to remove entire line item at once
  const removeLineItem = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const getTotalItems = () => {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decrementItem,
        incrementItem,
        removeLineItem,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);