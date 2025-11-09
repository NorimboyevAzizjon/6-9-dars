import React from "react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleContinueShopping = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    console.log("Buyurtma berish");
  };

  // Takrorlanmaydigan mahsulotlar ro'yxati
  const uniqueCartItems = cartItems.reduce((acc, item) => {
    const existingItem = acc.find(i => i.id === item.id);
    if (existingItem) {
      // Agar mahsulot allaqachon ro'yxatda bo'lsa, faqat miqdorini yangilaymiz
      existingItem.quantity = item.quantity;
    } else {
      // Yangi mahsulot qo'shamiz
      acc.push({ ...item });
    }
    return acc;
  }, []);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <button className={styles.backButton} onClick={handleContinueShopping}>
          ← {t('common.back')}
        </button>
        <h1>{t('cart.my_cart')}</h1>
      </div>

      <div className={styles.cartContent}>
        {uniqueCartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <i className="fas fa-shopping-cart"></i>
            <h2>{t('cart.empty')}</h2>
            <p>{t('cart.add_products')}</p>
            <button
              className={styles.shopButton}
              onClick={handleContinueShopping}
            >
              {t('cart.continue_shopping')}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {uniqueCartItems.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img src={item.image} alt={item.name} />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
                    <p className={styles.price}>{item.price.toLocaleString()} {t('common.currency')}</p>
                    <p className={styles.totalPrice}>
                      {t('cart.item_total')}: {(item.price * item.quantity).toLocaleString()} {t('common.currency')}
                    </p>
                  </div>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                    title={t('cart.remove')}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.summaryRow}>
                <span>{t('cart.products_count')}:</span>
                <span>{uniqueCartItems.length} {t('cart.pcs')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>{t('cart.total_quantity')}:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} {t('cart.items')}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>{t('cart.total_amount')}:</span>
                <span>{getCartTotal().toLocaleString()} {t('common.currency')}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                {t('cart.checkout')}
              </button>
              <button className={styles.clearButton} onClick={clearCart}>
                {t('cart.clear')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;