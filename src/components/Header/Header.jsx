import React, { useState } from 'react';
// import { Link, useNavigate, useLocation } from "react-router-dom"; // O'CHIRILDI
import CartIcon from '../Cart/CartIcon';
import FavoritesSidebar from '../Favorites/FavoritesSidebar';
import LoginModal from '../Auth/LoginModal';
import CityModal from '../City/CityModal';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = ({ favorites, onToggleFavorite, allProducts }) => {
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Toshkent');
  const [activeLink, setActiveLink] = useState('/');
  
  // useNavigate o'rniga oddiy function
  const navigate = (path) => {
    setActiveLink(path);
    console.log('Navigate to:', path);
    // Haqiqiy loyihada: window.location.href = path;
  };

  const { addToCart } = useCart();
  const { user, login, logout, isAuthenticated } = useAuth();

  const changeLanguage = (lng) => {
    console.log('Til o\'zgartirildi:', lng);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const removeFavorite = (productId) => {
    onToggleFavorite(productId);
  };

  const handleAddToCartFromFavorites = (product) => {
    addToCart(product);
  };

  const handleLogin = async (phoneNumber, password) => {
    const result = await login(phoneNumber, password);
    if (result.success) {
      setIsLoginOpen(false);
    }
    return result;
  };

  const handleLogout = () => {
    logout();
  };

  // Oddiy Link komponenti
  const Link = ({ to, children, className, onClick }) => (
    <a 
      href={to} 
      className={className}
      onClick={(e) => {
        e.preventDefault();
        setActiveLink(to);
        if (onClick) onClick();
      }}
    >
      {children}
    </a>
  );

  return (
    <>
      <header className={styles.header}>
        <div className={styles.topInfo}>
          <button 
            className={`${styles.navLink} ${styles.cityBtn} ${activeLink === '/location' ? styles.active : ''}`}
            onClick={() => setIsCityOpen(true)}
          >
            📍 {selectedCity}
          </button>
          <Link 
            to="/delivery-points" 
            className={`${styles.navLink} ${activeLink === '/delivery-points' ? styles.active : ''}`}
          >
            📦 Yetkazib berish punktlari
          </Link>
          <Link 
            to="/become-seller" 
            className={`${styles.navLink} ${activeLink === '/become-seller' ? styles.active : ''}`}
          >
            👔 Sotuvchi bo'lish
          </Link>
          <Link 
            to="/open-point" 
            className={`${styles.navLink} ${activeLink === '/open-point' ? styles.active : ''}`}
          >
            🏪 Punkt ochish
          </Link>
          <Link 
            to="/faq" 
            className={`${styles.navLink} ${activeLink === '/faq' ? styles.active : ''}`}
          >
            ❓ Savol-Javob
          </Link>
          <Link 
            to="/orders" 
            className={`${styles.navLink} ${activeLink === '/orders' ? styles.active : ''}`}
          >
            📋 Buyurtmalar
          </Link>
          <select 
            defaultValue="uz"
            onChange={(e) => changeLanguage(e.target.value)}
            className={styles.langSelect}
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Main navigation */}
        <div className={styles.mainNav}>
          <Link to="/" className={styles.logo}>
            🛍️ uzum market
          </Link>
          
          <Link to="/catalog" className={styles.catalogBtn}>
            ☰ Katalog
          </Link>

          <div className={styles.searchBar}>
            <input type="text" placeholder="Mahsulotlar va kategoriyalar qidirish" />
            <button>🔍</button>
          </div>

          <div className={styles.userActions}>
            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  👤 {user?.name || 'Foydalanuvchi'}
                </span>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  Chiqish
                </button>
              </div>
            ) : (
              <button className={styles.loginBtn} onClick={() => setIsLoginOpen(true)}>
                👤 Kirish
              </button>
            )}
            <button className={styles.favoritesBtn} onClick={() => setIsFavoritesOpen(true)}>
              ❤️
              {favorites.size > 0 && <span className={styles.badge}>{favorites.size}</span>}
            </button>
            <button className={styles.cartBtn} onClick={() => navigate('/cart')}>
              🛒 Savat
            </button>
          </div>
        </div>

        {/* Categories */}
        <nav className={styles.categories}>
          <Link to="/weekly" className={`${styles.categoryLink} ${activeLink === '/weekly' ? styles.active : ''}`}>
            Haftalik taklif
          </Link>
          <Link to="/winter" className={`${styles.categoryLink} ${activeLink === '/winter' ? styles.active : ''}`}>
            Qishki mahsulotlar
          </Link>
          <Link to="/hobby" className={`${styles.categoryLink} ${activeLink === '/hobby' ? styles.active : ''}`}>
            Hobbi
          </Link>
          <Link to="/tourism" className={`${styles.categoryLink} ${activeLink === '/tourism' ? styles.active : ''}`}>
            Turizm
          </Link>
          <Link to="/electronics" className={`${styles.categoryLink} ${activeLink === '/electronics' ? styles.active : ''}`}>
            Elektronika
          </Link>
          <Link to="/appliances" className={`${styles.categoryLink} ${activeLink === '/appliances' ? styles.active : ''}`}>
            Maishiy texnika
          </Link>
          <Link to="/clothing" className={`${styles.categoryLink} ${activeLink === '/clothing' ? styles.active : ''}`}>
            Kiyimlar
          </Link>
          <Link to="/shoes" className={`${styles.categoryLink} ${activeLink === '/shoes' ? styles.active : ''}`}>
            Oyoq kiyim
          </Link>
          <Link to="/accessories" className={`${styles.categoryLink} ${activeLink === '/accessories' ? styles.active : ''}`}>
            Aksessuarlar
          </Link>
          <Link to="/more" className={`${styles.categoryLink} ${activeLink === '/more' ? styles.active : ''}`}>
            Boshqalar ▼
          </Link>
        </nav>
      </header>

      <FavoritesSidebar 
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        products={allProducts}
        onRemoveFavorite={removeFavorite}
        onAddToCart={handleAddToCartFromFavorites}
      />

      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      <CityModal 
        isOpen={isCityOpen}
        onClose={() => setIsCityOpen(false)}
        onCitySelect={handleCitySelect}
      />
    </>
  );
};

export default Header;