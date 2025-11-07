import React from 'react';
import { useCart } from '../../context/CartContext';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} />
        {product.discount && (
          <span className={styles.discountBadge}>-{product.discount}%</span>
        )}
      </div>
      
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        
        <div className={styles.productPricing}>
          <span className={styles.currentPrice}>{product.price.toLocaleString()} som</span>
          {product.originalPrice && (
            <span className={styles.originalPrice}>{product.originalPrice.toLocaleString()} som</span>
          )}
        </div>

        {product.originalPrice && (
          <div className={styles.monthlyPayment}>
            {(product.price / 12).toLocaleString('uz-UZ', { maximumFractionDigits: 0 })} som/oyiga
          </div>
        )}

        <div className={styles.productRating}>
          <span className={styles.rating}>⭐ {product.rating}</span>
          <span className={styles.reviews}>({product.reviews.toLocaleString()} sharh)</span>
        </div>

        <button className={styles.addToCartBtn} onClick={handleAddToCart}>
          Savatga qo'shish
        </button>
      </div>
    </div>
  );
};

export default ProductCard;