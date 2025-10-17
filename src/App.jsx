 import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/CheckoutPage';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import AdminOrders from './pages/AdminOrders';

export default function App() {
  const [cart, setCart] = useState({});

  const addToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: 1 }));
  };

  const increaseQty = (id) => {
    setCart((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const decreaseQty = (id) => {
    setCart((prev) => {
      const newQty = prev[id] - 1;
      if (newQty <= 0) {
        const updatedCart = { ...prev };
        delete updatedCart[id];
        return updatedCart;
      }
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <>
      <Navbar cart={cart} />
      <Routes>
        <Route path="/" element={<Hero />} />

        <Route path="/shop" element={
          <Shop
            cart={cart}
            addToCart={addToCart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        } />

        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />

        <Route path="/cart" element={
          <Cart
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        } />

        <Route path="/checkout" element={
          <Checkout cart={cart} />
        } />

        <Route path="/thankyou" element={<ThankYou />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/orders" element={<AdminOrders />} />

      </Routes>
    </>
  );
}
