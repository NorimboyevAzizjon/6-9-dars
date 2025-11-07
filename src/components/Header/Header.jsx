import React from 'react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      {/* Top info bar */}
      <div className={styles.topInfo}>
        <span>📍 Toshkent</span>
        <span>📦 Topshirish punktlari</span>
        <span>💼 Sotuvchi bo'lish</span>
        <span>🏪 Topshirish punktini ochish</span>
        <span>❓ Savol-javob</span>
        <span>📋 Buyurtmalarim</span>
        <select className={styles.langSelect}>
          <option>O'zbekcha</option>
          <option>Русский</option>
        </select>
      </div>

      {/* Main navigation */}
      <div className={styles.mainNav}>
        <div className={styles.logo}>uzum market</div>
        
        <button className={styles.catalogBtn}>
          <span>☰</span>
          <span>Katalog</span>
        </button>

        <div className={styles.searchBar}>
          <input 
            type="text" 
            placeholder="Mahsulotlar va turkumlar izlash" 
          />
          <button>Q</button>
        </div>

        <div className={styles.userActions}>
          <button className={styles.loginBtn}>Kirish</button>
          <button className={styles.favoritesBtn}>❤️</button>
          <button className={styles.cartBtn}>🛒 Savat</button>
        </div>
      </div>

      {/* Categories */}
      <nav className={styles.categories}>
        <a href="#">Hafta tovarlari</a>
        <a href="#">Qishki kolleksiya</a>
        <a href="#">Xobbi va ijod</a>
        <a href="#">Turizm, baliq ovi va ovchilik</a>
        <a href="#">Elektronika</a>
        <a href="#">Maishiy texnika</a>
        <a href="#">Kiyim</a>
        <a href="#">Poyabzallar</a>
        <a href="#">Aksessuarlar</a>
        <a href="#">Yana ▼</a>
      </nav>
    </header>
  );
};

export default Header;