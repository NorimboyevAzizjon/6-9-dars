import React from 'react';
import styles from './PromoBanner.module.css';

const PromoBanner = () => {
  return (
    <div className={styles.promoBanner}>
      <div className={styles.bannerContent}>
        <div className={styles.bannerText}>
          <h1>Bavi</h1>
          <h2>Ko'p funksiyali kislorodli tozalagich, 350 gr</h2>
          
          <div className={styles.pricing}>
            <span className={styles.originalPrice}>49 990 som</span>
            <span className={styles.discount}>-21%</span>
            <span className={styles.currentPrice}>39 990 som</span>
          </div>

          <div className={styles.features}>
            <p>✅ Kiyim va bolalar buyumlaridagi dog'larni ketkazadi</p>
            <p>✅ Yog', ohak va kuygan qatlamni ketkazadi</p>
            <p>✅ Mebel va gilamlarni tozalaydi</p>
          </div>
        </div>
        
        <div className={styles.bannerImage}>
          <div className={styles.productImagePlaceholder}>
            <span>350 gr</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBanner;