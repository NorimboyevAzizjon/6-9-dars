import React, { useState } from 'react';
<<<<<<< HEAD
import { useCart } from '../../context/CartContext';
=======
import { useCart } from '../../hooks/useCart';
import { useTranslation } from 'react-i18next';
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
import styles from './CartSidebar.module.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { 
    items, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart 
  } = useCart();
  
  const [favorites, setFavorites] = useState(new Set());
  const { t } = useTranslation();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  // Mahsulot narxini hisoblash
  const calculateMonthlyPrice = (price) => {
    return Math.round(price / 12).toLocaleString();
  };

  // Chegirma foizini hisoblash
  const calculateDiscount = (originalPrice, currentPrice) => {
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.cartOverlay} onClick={handleOverlayClick}>
      <div className={styles.cartSidebar}>
        <div className={styles.cartHeader}>
<<<<<<< HEAD
          <h2>Savat ({items.reduce((total, item) => total + item.quantity, 0)})</h2>
=======
          <h2>{t('cart.title')} ({cart.items.reduce((total, item) => total + item.quantity, 0)})</h2>
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
          <button className={styles.closeBtn} onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className={styles.cartItems}>
<<<<<<< HEAD
          {items.length === 0 ? (
            <div className={styles.emptyCart}>
              <i className="fas fa-shopping-cart"></i>
              <p>Savat bo'sh</p>
              <span>Mahsulot qo'shish uchun "Savatchaga" tugmasini bosing</span>
            </div>
=======
          {cart.items.length === 0 ? (
            <p className={styles.emptyCart}>{t('cart.empty')}</p>
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
          ) : (
            items.map(item => (
              <div key={item.id} className={styles.cartItem}>
                {/* Mahsulot rasmi */}
                <img 
                  src={item.image || '/placeholder-product.jpg'} 
                  alt={item.name} 
                  className={styles.itemImage} 
                />
                
<<<<<<< HEAD
                <div className={styles.itemContent}>
                  {/* Mahsulot nomi va reyting */}
                  <div className={styles.productHeader}>
                    <h4 className={styles.productName}>{item.name}</h4>
                    <div className={styles.rating}>
                      <span className={styles.ratingStars}>★★★★★</span>
                      <span className={styles.ratingCount}>({item.reviews || '17840'})</span>
                    </div>
                  </div>

                  {/* Mahsulot brendi */}
                  {item.brand && (
                    <div className={styles.brand}>
                      <span>{item.brand}</span>
=======
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={styles.itemPrice}>{item.price.toLocaleString()} {t('common.currency')}</span>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className={styles.discountBadge}>{t('cart.priceGuarantee')}</span>
                    )}
                  </div>

                  {item.originalPrice && item.originalPrice > item.price && (
                    <div className={styles.monthlyInfo}>
                      {(item.price / 12).toLocaleString()} {t('common.currency')} {t('cart.monthly')}
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
                    </div>
                  )}

                  {/* Narx va chegirma */}
                  <div className={styles.priceSection}>
                    <div className={styles.currentPrice}>
                      {item.price?.toLocaleString()} so'm
                    </div>
                    
                    {item.originalPrice && item.originalPrice > item.price && (
                      <div className={styles.discountInfo}>
                        <span className={styles.originalPrice}>
                          {item.originalPrice?.toLocaleString()} so'm
                        </span>
                        <span className={styles.discountPercent}>
                          -{calculateDiscount(item.originalPrice, item.price)}%
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Oylik to'lov */}
                  <div className={styles.monthlyPayment}>
                    <span className={styles.monthlyPrice}>
                      {calculateMonthlyPrice(item.price)} so'm/oyiga
                    </span>
                    <div className={styles.installmentOptions}>
                      <span className={styles.installmentBadge}>24 oy</span>
                      <span className={styles.installmentBadge}>12 oy</span>
                      <span className={styles.installmentBadge}>6 oy</span>
                      <span className={styles.installmentBadge}>3 oy</span>
                    </div>
                  </div>

                  {/* Yetkazib berish */}
                  <div className={styles.deliveryInfo}>
                    <i className="fas fa-shipping-fast"></i>
                    <span>Ertaga yetkazib beramiz</span>
                  </div>

                  {/* Chegirma va bonuslar */}
                  <div className={styles.promoBadges}>
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className={styles.discountBadge}>ARZON NARX</span>
                    )}
                    <span className={styles.originalBadge}>ORIGINAL</span>
                    <span className={styles.superBadge}>SUPER</span>
                  </div>

                  {/* Miqdor boshqaruvi */}
                  <div className={styles.quantitySection}>
                    <div className={styles.quantityControls}>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className={styles.quantityBtn}
                        disabled={item.quantity <= 1}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className={styles.quantity}>{item.quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className={styles.quantityBtn}
                        disabled={item.quantity >= (item.maxQuantity || 5)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                    
                    <div className={styles.quantityLimit}>
                      {item.maxQuantity && `Maksimum ${item.maxQuantity} dona`}
                    </div>
                  </div>

                  {/* Xarid qilish statistikasi */}
                  <div className={styles.purchaseStats}>
                    <span>Bu haftada {item.weeklyPurchases || '202'} kishi sotib oldi</span>
                  </div>
                </div>

<<<<<<< HEAD
                {/* Harakatlar tugmalari */}
                <div className={styles.itemActions}>
                  <button 
                    onClick={() => toggleFavorite(item.id)}
                    className={`${styles.favoriteBtn} ${favorites.has(item.id) ? styles.favoriteActive : ''}`}
                    title="Sevimlilarga qo'shish"
                  >
                    <i className={`fas ${favorites.has(item.id) ? 'fa-heart' : 'fa-heart'}`}></i>
                  </button>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className={styles.removeBtn}
                    title="O'chirish"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
=======
                <button 
                  onClick={() => toggleFavorite(item.id)}
                  className={`${styles.favoriteBtn} ${favorites.has(item.id) ? styles.favoriteActive : ''}`}
                  title={t('cart.addToFavorites')}
                >
                  <i className={`fas ${favorites.has(item.id) ? 'fa-heart' : 'fa-heart'}`}></i>
                </button>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className={styles.removeBtn}
                  title={t('cart.remove')}
                >
                  <i className="fas fa-trash"></i>
                </button>
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className={styles.cartFooter}>
<<<<<<< HEAD
            {/* Promo kod */}
            <div className={styles.promoSection}>
              <input 
                type="text" 
                placeholder="Promo kodni kiriting" 
                className={styles.promoInput}
              />
              <button className={styles.applyPromoBtn}>
                Qo'llash
              </button>
=======
            <div className={styles.cartTotal}>
              <span>{t('cart.total')}:</span>
              <strong>{getCartTotal().toLocaleString()} {t('common.currency')}</strong>
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
            </div>

            {/* Umumiy summa */}
            <div className={styles.cartTotal}>
              <div className={styles.totalRow}>
                <span>Mahsulotlar:</span>
                <span>{getCartTotal().toLocaleString()} so'm</span>
              </div>
              <div className={styles.totalRow}>
                <span>Yetkazish:</span>
                <span className={styles.freeDelivery}>Bepul</span>
              </div>
              <div className={styles.finalTotal}>
                <span>Jami:</span>
                <strong>{getCartTotal().toLocaleString()} so'm</strong>
              </div>
            </div>
            
            {/* Harakat tugmalari */}
            <div className={styles.cartActions}>
              <button className={styles.clearBtn} onClick={clearCart}>
                {t('cart.clear')}
              </button>
              <button className={styles.checkoutBtn}>
                <i className="fas fa-credit-card"></i>
                {t('cart.checkout')}
              </button>
            </div>

            {/* Qo'shimcha ma'lumotlar */}
            <div className={styles.additionalInfo}>
              <div className={styles.securePayment}>
                <i className="fas fa-shield-alt"></i>
                <span>Xavfsiz to'lov</span>
              </div>
              <div className={styles.returnPolicy}>
                <i className="fas fa-undo"></i>
                <span>Qaytarish 10 kun</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;