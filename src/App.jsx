import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header/Header';
import PromoBanner from './components/Banner/PromoBanner';
import ProductList from './components/Product/ProductList';
import Footer from './components/Footer/Footer';
import './App.css';
// import './i18next'; // BU QATORNI O'CHIRING YO COMMENT QILING

function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [allProducts, setAllProducts] = useState([]);

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

  const handleProductsLoaded = (products) => {
    setAllProducts(products);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="App">
          <Header 
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            allProducts={allProducts}
          />
          <main className="main-content">
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
    </AuthProvider>
  );
}

export default App;