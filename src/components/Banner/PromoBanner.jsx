import React from 'react';
import styles from './PromoBanner.module.css';
import Heroimg from '../../assets/img/div.swiper-container.png'

const PromoBanner = () => {
  return (
    <div className={styles.promoBanner}>
      <div className={styles.bannerContent}>
        <img src={Heroimg} alt="" />
      </div>
    </div>
  );
};

export default PromoBanner;