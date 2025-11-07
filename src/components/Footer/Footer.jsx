import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>Biz haqimizda</h3>
          <ul>
            <li>Topshirish punktlari</li>
            <li>Vakansiyalar</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Foydalanuvchilarga</h3>
          <ul>
            <li>Biz bilan bog'lanish</li>
            <li>Savol-Javob</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Tadbirkoriarga</h3>
          <ul>
            <li>Uzumda soting</li>
            <li>Sotuvchi kabinetiga kirish</li>
            <li>Topshirish punktini ochish</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Ilovani yuklab olish</h3>
          <div className={styles.appButtons}>
            <button className={styles.appStore}>App Store</button>
            <button className={styles.googlePlay}>Google Play</button>
          </div>
          <div className={styles.socialLinks}>
            <span>Uzum ijtimoiy tarmoqlarda</span>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          <a href="#">Maxfiylik kelishuvi</a>
          <a href="#">Foydalanuvchi kelishuvi</a>
        </div>
        <div className={styles.copyright}>
          © 2025 "UZUM MARKET". STIR 309376127. Barcha huquqlar himoyalangan
        </div>
      </div>
    </footer>
  );
};

export default Footer;