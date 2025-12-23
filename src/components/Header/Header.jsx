import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CartIcon from '../Cart/CartIcon';
import CartSidebar from '../Cart/CartSidebar';
import FavoritesSidebar from '../Favorites/FavoritesSidebar';
import LoginModal from '../Auth/LoginModal';
import CityModal from '../City/CityModal';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';

const Header = ({ favorites, onToggleFavorite, allProducts }) => {
  const { t, i18n } = useTranslation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Toshkent');
  const [activeLink, setActiveLink] = useState('/');
  
  const { addToCart } = useCart();
  const { user, login, logout, isAuthenticated } = useAuth();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  // const handleLinkClick = (path) => {
  //   setActiveLink(path);
  // };

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
            <i className="fas fa-map-marker-alt"></i>
            {selectedCity}
          </button>
          <Link 
            to="/delivery-points" 
            className={`${styles.navLink} ${activeLink === '/delivery-points' ? styles.active : ''}`}
          >
            <i className="fas fa-box"></i>
            {t('header.delivery_points')}
          </Link>
          <Link 
            to="/become-seller" 
            className={`${styles.navLink} ${activeLink === '/become-seller' ? styles.active : ''}`}
          >
            <i className="fas fa-user-tie"></i>
            {t('header.become_seller')}
          </Link>
          <Link 
            to="/open-point" 
            className={`${styles.navLink} ${activeLink === '/open-point' ? styles.active : ''}`}
          >
            <i className="fas fa-store"></i>
            {t('header.open_point')}
          </Link>
          <Link 
            to="/faq" 
            className={`${styles.navLink} ${activeLink === '/faq' ? styles.active : ''}`}
          >
            <i className="fas fa-question-circle"></i>
            {t('header.faq')}
          </Link>
          <Link 
            to="/orders" 
            className={`${styles.navLink} ${activeLink === '/orders' ? styles.active : ''}`}
          >
            <i className="fas fa-clipboard-list"></i>
            {t('header.orders')}
          </Link>
          <select 
            className={styles.langSelect}
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="uz">🌐 O'zbekcha</option>
            <option value="ru">🌐 Русский</option>
            <option value="en">🌐 English</option>
          </select>
        </div>
        <div className={styles.mainNav}>
          <Link to="/" className={styles.logo}>
            <i className="fas fa-shopping-bag"></i>
            uzum market
          </Link>
          
          <Link to="/catalog" className={styles.catalogBtn}>
            <i className="fas fa-bars"></i>
            <span>{t('header.catalog')}</span>
          </Link>

          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder={t('header.search_placeholder')} 
            />
            <button><i className="fas fa-search"></i></button>
          </div>

          <div className={styles.userActions}>
            {isAuthenticated ? (
              <div className={styles.userMenu}>
                <span className={styles.userName}>
                  <i className="fas fa-user"></i>
                  {user?.name || t('header.user')}
                </span>
                <button 
                  className={styles.logoutBtn}
                  onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt"></i>
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

        <nav className={styles.categories}>
          <Link 
            to="/weekly" 
            className={`${styles.categoryLink} ${activeLink === '/weekly' ? styles.active : ''}`}
          >
            {t('categories.weekly')}
          </Link>
          <Link 
            to="/winter" 
            className={`${styles.categoryLink} ${activeLink === '/winter' ? styles.active : ''}`}
          >
            {t('categories.winter')}
          </Link>
          <Link 
            to="/hobby" 
            className={`${styles.categoryLink} ${activeLink === '/hobby' ? styles.active : ''}`}
          >
            {t('categories.hobby')}
          </Link>
          <Link 
            to="/tourism" 
            className={`${styles.categoryLink} ${activeLink === '/tourism' ? styles.active : ''}`}
          >
            {t('categories.tourism')}
          </Link>
          <Link 
            to="/electronics" 
            className={`${styles.categoryLink} ${activeLink === '/electronics' ? styles.active : ''}`}
          >
            {t('categories.electronics')}
          </Link>
          <Link 
            to="/appliances" 
            className={`${styles.categoryLink} ${activeLink === '/appliances' ? styles.active : ''}`}
          >
            {t('categories.appliances')}
          </Link>
          <Link 
            to="/clothing" 
            className={`${styles.categoryLink} ${activeLink === '/clothing' ? styles.active : ''}`}
          >
            {t('categories.clothing')}
          </Link>
          <Link 
            to="/shoes" 
            className={`${styles.categoryLink} ${activeLink === '/shoes' ? styles.active : ''}`}
          >
            {t('categories.shoes')}
          </Link>
          <Link 
            to="/accessories" 
            className={`${styles.categoryLink} ${activeLink === '/accessories' ? styles.active : ''}`}
          >
            {t('categories.accessories')}
          </Link>
          <Link 
            to="/more" 
            className={`${styles.categoryLink} ${activeLink === '/more' ? styles.active : ''}`}
          >
            {t('categories.more')} <i className="fas fa-chevron-down"></i>
          </Link>
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