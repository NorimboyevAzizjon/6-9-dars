import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import PromoBanner from './components/Banner/PromoBanner';
import ProductList from './components/Product/ProductList';
import Footer from './components/Footer/Footer';
import AdminDashboard from './pages/AdminDashboard';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './components/Cart/CartPage';
import LoginPage from './pages/LoginPage';
import SuccessPage from './pages/SuccessPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  const [favorites, setFavorites] = useState(new Set());
  const [allProducts] = useState([]);

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
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={
                <PrivateRoute>
                  <CartPage />
                </PrivateRoute>
              } />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/success" element={
                <PrivateRoute>
                  <SuccessPage />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminDashboard />
                </PrivateRoute>
              } />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;