import React from 'react';
import { CartProvider } from './context/CartContext'; // .jsx qo'shish shart emas
import Header from './components/Header/Header';
import PromoBanner from './components/Banner/PromoBanner';
import ProductList from './components/Product/ProductList';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <Header />
        <main>
          <PromoBanner />
          <ProductList />
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;