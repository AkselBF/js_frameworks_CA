import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/components/Layout/index';
import Home from './common/pages/Home/index';
import Product from './common/pages/Product/index';
import Contact from './common/pages/Contact/index';
import Cart from './common/pages/Cart/index';
import Checkout from './common/pages/Checkout/index';
import CheckoutSuccess from './common/pages/CheckoutSuccess/index';

const App: React.FC = () => {
  const [cart, setCart] = useState<any[]>([]);

  // Function to add items to the cart
  const addToCart = (item: any) => {
    setCart([...cart, item]);
  };

  // Function to remove item from cart
  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <Layout cartItemCount={cart.length}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout clearCart={clearCart} />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
