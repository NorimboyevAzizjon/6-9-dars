import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartIcon from '../Cart/CartIcon';
import CartSidebar from '../Cart/CartSidebar';
import FavoritesSidebar from '../Favorites/FavoritesSidebar';
import LoginModal from '../Auth/LoginModal';
import CityModal from '../City/CityModal';
import { useCart } from '../../hooks/useCart';
import styles from './Header.module.css';

const Header = ({ favorites, onToggleFavorite, allProducts }) => {
  const { t, i18n } = useTranslation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Toshkent');
  const [activeLink, setActiveLink] = useState('/');
  const { addToCart } = useCart();

  // Til o'zgartirish funksiyasi
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Link bosilganda active holatini o'zgartirish
  const handleLinkClick = (path) => {
    setActiveLink(path);
  };

  // Shahar tanlash
  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  // Sevimlilardan o'chirish
  const removeFavorite = (productId) => {
    onToggleFavorite(productId);
  };

  // Mahsulotlarni savatga qo'shish
  const handleAddToCartFromFavorites = (product) => {
    addToCart(product);
  };

  // Kirish funksiyasi
  const handleLogin = (phoneNumber) => {
    setIsLoggedIn(true);
  };

  // Chiqish funksiyasi
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <>
      <header className={styles.header}>
        {/* Top info bar */}
        <div className={styles.topInfo}>
          <button 
            className={`${styles.navLink} ${styles.cityBtn} ${activeLink === '/location' ? styles.active : ''}`}
            onClick={() => setIsCityOpen(true)}
          >
            <i className="fas fa-map-marker-alt"></i>
            {selectedCity}
          </button>
          <a 
            href="#delivery-points" 
            className={`${styles.navLink} ${activeLink === '/delivery-points' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/delivery-points')}
          >
            <i className="fas fa-box"></i>
            {t('header.delivery_points')}
          </a>
          <a 
            href="#become-seller" 
            className={`${styles.navLink} ${activeLink === '/become-seller' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/become-seller')}
          >
            <i className="fas fa-user-tie"></i>
            {t('header.become_seller')}
          </a>
          <a 
            href="#open-point" 
            className={`${styles.navLink} ${activeLink === '/open-point' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/open-point')}
          >
            <i className="fas fa-store"></i>
            {t('header.open_point')}
          </a>
          <a 
            href="#faq" 
            className={`${styles.navLink} ${activeLink === '/faq' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/faq')}
          >
            <i className="fas fa-question-circle"></i>
            {t('header.faq')}
          </a>
          <a 
            href="#orders" 
            className={`${styles.navLink} ${activeLink === '/orders' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/orders')}
          >
            <i className="fas fa-clipboard-list"></i>
            {t('header.orders')}
          </a>
          <select 
            className={styles.langSelect}
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="uz">
              <i className="fas fa-globe"></i> {t('common.uzbek')}
            </option>
            <option value="ru">
              <i className="fas fa-globe"></i> {t('common.russian')}
            </option>
            <option value="en">
              <i className="fas fa-globe"></i> {t('common.english')}
            </option>
          </select>
        </div>

        {/* Main navigation */}
        <div className={styles.mainNav}>
          <a 
            href="#home" 
            className={styles.logo}
            onClick={() => handleLinkClick('/')}
          >
            <i className="fas fa-shopping-bag"></i>
            uzum market
          </a>
          
          <a 
            href="#catalog" 
            className={styles.catalogBtn}
            onClick={() => handleLinkClick('/catalog')}
          >
            <i className="fas fa-bars"></i>
            <span>{t('header.catalog')}</span>
          </a>

          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder={t('header.search_placeholder')} 
            />
            <button><i className="fas fa-search"></i></button>
          </div>

          <div className={styles.userActions}>
            {isLoggedIn ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  <i className="fas fa-user"></i>
                  {t('header.user')}
                </span>
                <button 
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  {t('header.logout')}
                </button>
              </div>
            ) : (
              <button 
                className={styles.loginBtn}
                onClick={() => setIsLoginOpen(true)}
              >
                <i className="fas fa-user"></i>
                {t('header.login')}
              </button>
            )}
            <button 
              className={styles.favoritesBtn}
              onClick={() => setIsFavoritesOpen(true)}
            >
              <i className="fas fa-heart"></i>
              {favorites.size > 0 && <span className={styles.badge}>{favorites.size}</span>}
            </button>
            <button 
              className={styles.cartBtn}
              onClick={() => setIsCartOpen(true)}
            >
              <CartIcon />
              {t('header.cart')}
            </button>
          </div>
        </div>

        {/* Categories */}
        <nav className={styles.categories}>
          <a 
            href="#weekly" 
            className={`${styles.categoryLink} ${activeLink === '/weekly' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/weekly')}
          >
            {t('categories.weekly')}
          </a>
          <a 
            href="#winter" 
            className={`${styles.categoryLink} ${activeLink === '/winter' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/winter')}
          >
            {t('categories.winter')}
          </a>
          <a 
            href="#hobby" 
            className={`${styles.categoryLink} ${activeLink === '/hobby' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/hobby')}
          >
            {t('categories.hobby')}
          </a>
          <a 
            href="#tourism" 
            className={`${styles.categoryLink} ${activeLink === '/tourism' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/tourism')}
          >
            {t('categories.tourism')}
          </a>
          <a 
            href="#electronics" 
            className={`${styles.categoryLink} ${activeLink === '/electronics' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/electronics')}
          >
            {t('categories.electronics')}
          </a>
          <a 
            href="#appliances" 
            className={`${styles.categoryLink} ${activeLink === '/appliances' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/appliances')}
          >
            {t('categories.appliances')}
          </a>
          <a 
            href="#clothing" 
            className={`${styles.categoryLink} ${activeLink === '/clothing' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/clothing')}
          >
            {t('categories.clothing')}
          </a>
          <a 
            href="#shoes" 
            className={`${styles.categoryLink} ${activeLink === '/shoes' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/shoes')}
          >
            {t('categories.shoes')}
          </a>
          <a 
            href="#accessories" 
            className={`${styles.categoryLink} ${activeLink === '/accessories' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/accessories')}
          >
            {t('categories.accessories')}
          </a>
          <a 
            href="#more" 
            className={`${styles.categoryLink} ${activeLink === '/more' ? styles.active : ''}`}
            onClick={() => handleLinkClick('/more')}
          >
            {t('categories.more')} <i className="fas fa-chevron-down"></i>
          </a>
        </nav>
      </header>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

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