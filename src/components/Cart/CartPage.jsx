import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleContinueShopping = () => {
    navigate(-1);
  };

  const handleCheckout = () => {
    console.log("Buyurtma berish");
    // Checkout logikasi
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartHeader}>
        <button className={styles.backButton} onClick={handleContinueShopping}>
          ← {t('common.back')}
        </button>
        <h1>{t('cart.my_cart')}</h1>
      </div>

      <div className={styles.cartContent}>
        {items.length === 0 ? (
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
              {items.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img 
                    src={item.image || '/placeholder-product.jpg'} 
                    alt={item.name} 
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <h3>{item.name}</h3>
<<<<<<< HEAD
                    <p className={styles.price}>{item.price?.toLocaleString()} so'm</p>
                    <p className={styles.totalPrice}>
                      Jami: {(item.price * item.quantity).toLocaleString()} so'm
=======
                    <p className={styles.price}>{item.price.toLocaleString()} {t('common.currency')}</p>
                    <p className={styles.totalPrice}>
                      {t('cart.item_total')}: {(item.price * item.quantity).toLocaleString()} {t('common.currency')}
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
                    </p>
                  </div>
                  <div className={styles.quantityControls}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={styles.quantityBtn}
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className={styles.quantityBtn}
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
<<<<<<< HEAD
                <span>Mahsulotlar soni:</span>
                <span>{items.length} ta</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Jami miqdor:</span>
                <span>{items.reduce((total, item) => total + item.quantity, 0)} dona</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Umumiy summa:</span>
                <span className={styles.totalAmount}>{getCartTotal().toLocaleString()} so'm</span>
=======
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
>>>>>>> df3ea054a634e94ed96bee55b159d0e179199223
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