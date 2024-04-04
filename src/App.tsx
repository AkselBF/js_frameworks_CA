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
    // Check if the item already exists in the cart
    const existingItemIndex = cart.findIndex(cartItem => cartItem.id === item.id);

    if (existingItemIndex !== -1) {
      // If the item exists, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // If the item does not exist, add it to the cart with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Function to update item quantity in cart
  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity = quantity;
      setCart(updatedCart);
    }
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
      <Layout cartItemCount={cart.reduce((total, item) => total + item.quantity, 0)}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} cart={cart} />} />
          <Route path="/product/:id" element={<Product addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} updateItemQuantity={updateItemQuantity} removeFromCart={removeFromCart} />} />
          <Route path="/checkout" element={<Checkout clearCart={clearCart} />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
