/*
import './App.css'

function App() {
  return (
    <>
      
    </>
  )
}

export default App
*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './common/components/Layout/index';
import Home from './common/pages/Home/index';
import Product from './common/pages/Product/index';
import Contact from './common/pages/Contact/index';
import Cart from './common/pages/Cart/index';
import Checkout from './common/pages/Checkout/index';
import CheckoutSuccess from './common/pages/CheckoutSuccess/index';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/success" element={<CheckoutSuccess />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;

/*
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Layout from './common/components/Layout/index';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        {}
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold">Page Content</h1>
          <p>This is the main content area.</p>
        </div>
      </Layout>
    </Router>
  );
};

export default App;
*/