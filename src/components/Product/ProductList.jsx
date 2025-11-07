import React from 'react';
import ProductCard from './ProductCard';
import { products } from '../../data/products';
import styles from './ProductList.module.css';

const ProductList = () => {
  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Mashhur mahsulotlar</h2>
        <div className={styles.productsGrid}>
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;