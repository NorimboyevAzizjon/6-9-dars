import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { products as localProducts } from '../../data/products';
import styles from './ProductList.module.css';

const ProductList = ({ onToggleFavorite, favorites, onProductsLoaded }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      setProducts(localProducts || []);
    } catch (err) {
      setError('Mahsulotlarni olishda xatolik: ' + (err.message || '')); 
    }
    setIsLoading(false);
  }, []);

  const formattedProducts = products?.map(product => ({
    id: product.id,
    name: product.name || product.title,
    price: product.price,
    originalPrice: product.original_price || product.price,
    discount: product.discount || 0,
    image: product.image || product.thumbnail,
    category: product.category,
    rating: product.rating,
    reviews: product.reviews,
    description: product.description,
    inStock: product.in_stock ?? true,
    brand: product.brand || product.category,
    monthlyPrice: product.price ? Math.round(product.price / 12).toLocaleString() : ''
  })) || [];

  useEffect(() => {
    if (formattedProducts.length > 0 && onProductsLoaded) {
      onProductsLoaded(formattedProducts);
    }
  }, [formattedProducts, onProductsLoaded]);

  // Kategoriyalar bo'yicha filtrlash
  const smartphones = formattedProducts.filter(p => p.category === "smartphones");
  const laptops = formattedProducts.filter(p => p.category === "laptops");
  const fragrances = formattedProducts.filter(p => p.category === "fragrances");
  const skincare = formattedProducts.filter(p => p.category === "skincare");
  const homeDecoration = formattedProducts.filter(p => p.category === "home-decoration");
  const groceries = formattedProducts.filter(p => p.category === "groceries");
  const furniture = formattedProducts.filter(p => p.category === "furniture");

  if (isLoading) {
    return (
      <div className={styles.productList}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.spinner}></div>
            Mahsulotlar yuklanmoqda...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.productList}>
        <div className={styles.container}>
          <div className={styles.error}>
            Xatolik: {error}
            <br />
            <button 
              onClick={() => window.location.reload()} 
              className={styles.retryBtn}
            >
              Qayta urinish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.productList}>
      <div className={styles.container}>
        
        {/* Barcha mahsulotlar */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Barcha mahsulotlar</h2>
          <span className={styles.productCount}>({formattedProducts.length} mahsulot)</span>
        </div>
        
        <div className={styles.productsGrid}>
          {formattedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites?.has(product.id)}
            />
          ))}
        </div>

        {/* Kategoriyalar bo'yicha */}
        {smartphones.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Smartfonlar va gadjetlar</h3>
              <span className={styles.productCount}>({smartphones.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {smartphones.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {laptops.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Noutbuklar va kompyuterlar</h3>
              <span className={styles.productCount}>({laptops.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {laptops.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {skincare.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Go'zallik va parvarish</h3>
              <span className={styles.productCount}>({skincare.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {skincare.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {fragrances.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Atirlar</h3>
              <span className={styles.productCount}>({fragrances.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {fragrances.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {homeDecoration.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Uy-ro'zg'or buyumlari</h3>
              <span className={styles.productCount}>({homeDecoration.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {homeDecoration.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {groceries.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Oziq-ovqat mahsulotlari</h3>
              <span className={styles.productCount}>({groceries.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {groceries.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {furniture.length > 0 && (
          <div className={styles.categorySection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.categoryTitle}>Mebel</h3>
              <span className={styles.productCount}>({furniture.length} mahsulot)</span>
            </div>
            <div className={styles.productsGrid}>
              {furniture.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites?.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductList;