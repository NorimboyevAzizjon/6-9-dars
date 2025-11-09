import React from "react";
import { useCart } from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import styles from "./CartPage.module.css";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();
  const navigate = useNavigate();

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
          ← Orqaga
        </button>
        <h1>Mening Savatim</h1>
      </div>

      <div className={styles.cartContent}>
        {uniqueCartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <i className="fas fa-shopping-cart"></i>
            <h2>Savat bo'sh</h2>
            <p>Savatga mahsulot qo'shing</p>
            <button
              className={styles.shopButton}
              onClick={handleContinueShopping}
            >
              Xarid qilishni davom etish
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
                    <p className={styles.price}>${item.price}</p>
                    <p className={styles.totalPrice}>
                      Jami: ${(item.price * item.quantity).toFixed(2)}
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
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.cartSummary}>
              <div className={styles.summaryRow}>
                <span>Mahsulotlar soni:</span>
                <span>{uniqueCartItems.length} ta</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Jami miqdor:</span>
                <span>{cartItems.reduce((total, item) => total + item.quantity, 0)} dona</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Umumiy summa:</span>
                <span>${getCartTotal()}</span>
              </div>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
              >
                Buyurtma berish
              </button>
              <button className={styles.clearButton} onClick={clearCart}>
                Savatni tozalash
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;