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
            <li>{t('footer.vacancies')}</li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>{t('footer.for_users')}</h3>
          <ul>
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
            <button className={styles.appStore}>{t('common.app_store')}</button>
            <button className={styles.googlePlay}>{t('common.google_play')}</button>
          </div>
          <div className={styles.socialLinks}>
            <span>{t('footer.social_media')}</span>
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