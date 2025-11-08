import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import PromoBanner from './components/Banner/PromoBanner';
import ProductList from './components/Product/ProductList';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [allProducts, setAllProducts] = useState([]);

  // Sevimlilarga qo'shish/o'chirish
  const toggleFavorite = (productId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  };

  // Mahsulotlarni olish
  const handleProductsLoaded = (products) => {
    setAllProducts(products);
  };

  return (
    <CartProvider>
      <div className="App">
        <Header 
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          allProducts={allProducts}
        />
        <main>
          <PromoBanner />
          <ProductList 
            onToggleFavorite={toggleFavorite}
            favorites={favorites}
            onProductsLoaded={handleProductsLoaded}
          />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
