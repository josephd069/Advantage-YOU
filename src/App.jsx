import React from 'react';
import { BrowserRouter, HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import SearchResults from './pages/SearchResults';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Header />
        <Navbar />
        <main className="bg-green-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog/:category" element={<Catalog />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout/*" element={<Checkout />} />
          </Routes>
        </main>
      </HashRouter>
    </CartProvider>
  );
}