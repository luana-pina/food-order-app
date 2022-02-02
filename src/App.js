import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./context/CartContext/CartProvider";

function App() {
  const [showCart, setShowCart] = useState(false);

  function handleShowCart() {
    setShowCart(true);
  }
  function handleCloseCart() {
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart && <Cart onClose={handleCloseCart} />}
      <Header onShowCart={handleShowCart} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
