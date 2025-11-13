import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Footer.module.css';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>{t('footer.about')}</h3>
          <ul>
            <li>{t('footer.delivery_points')}</li>
            <li>{t('footer.contact')}</li>
            <li>{t('footer.faq')}</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>{t('footer.for_users')}</h3>
          <ul>
            <li>{t('footer.delivery_points')}</li>
            <li>{t('footer.contact')}</li>
            <li>{t('footer.faq')}</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>{t('footer.for_business')}</h3>
          <ul>
            <li>{t('footer.sell_on_uzum')}</li>
            <li>{t('footer.seller_login')}</li>
            <li>{t('footer.open_delivery_point')}</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>{t('footer.download_app')}</h3>
          <div className={styles.appButtons}>
            <button className={styles.appStore}>
              <span>{t('common.app_store')}</span>
            </button>
            <button className={styles.googlePlay}>
              <span>{t('common.google_play')}</span>
            </button>
          </div>
          
          <div className={styles.socialSection}>
            <h3>{t('footer.social_media')}</h3>
            <div className={styles.socialIcons}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Telegram">
                <i className="fab fa-telegram"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className={styles.socialIcon} aria-label="Facebook">
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerLinks}>
          <a href="#">{t('footer.privacy')}</a>
          <a href="#">{t('footer.user_agreement')}</a>
        </div>

        <div className={styles.copyright}>
          {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
};

export default Footer;