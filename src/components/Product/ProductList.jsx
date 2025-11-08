import React, { useEffect } from 'react';
import ProductCard from './ProductCard';
import { useFetch } from '../../hooks/useFetch';
import styles from './ProductList.module.css';

const ProductList = ({ onToggleFavorite, favorites, onProductsLoaded }) => {
  const { data: products, isLoading, error } = useFetch('https://dummyjson.com/products');

  // API dan kelgan ma'lumotlarni formatlaymiz
  const formattedProducts = products?.map(product => ({
    id: product.id,
    name: product.title,
    price: Math.round(product.price * 13000), // USD dan UZS ga
    originalPrice: Math.round(product.price * 13000 * 1.2), // 20% chegirma
    discount: 20,
    image: product.thumbnail,
    category: product.category,
    rating: product.rating,
    reviews: product.stock,
    description: product.description,
    inStock: product.stock > 0
  })) || [];

  // Mahsulotlar yuklanganda App.jsx ga yuboramiz
  useEffect(() => {
    if (formattedProducts.length > 0) {
      onProductsLoaded(formattedProducts);
    }
  }, [formattedProducts, onProductsLoaded]);

  // Mahsulotlarni kategoriyalarga ajratamiz
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
            Xatolik {error}
            <br />
            <small>Internet aloqasini tekshiring</small>
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
              isFavorite={favorites.has(product.id)}
            />
          ))}
        </div>

        {/* Smartfonlar */}
        {smartphones.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Smartfonlar va gadjetlar</h3>
            <div className={styles.productsGrid}>
              {smartphones.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Noutbuklar */}
        {laptops.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Noutbuklar va kompyuterlar</h3>
            <div className={styles.productsGrid}>
              {laptops.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Go'zallik */}
        {skincare.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Go'zallik va parvarish</h3>
            <div className={styles.productsGrid}>
              {skincare.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Atirlar */}
        {fragrances.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Atirlar</h3>
            <div className={styles.productsGrid}>
              {fragrances.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Uy-ro'zg'or */}
        {homeDecoration.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Uy-ro'zg'or buyumlari</h3>
            <div className={styles.productsGrid}>
              {homeDecoration.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Oziq-ovqat */}
        {groceries.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}>Oziq-ovqat mahsulotlari</h3>
            <div className={styles.productsGrid}>
              {groceries.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mebel */}
        {furniture.length > 0 && (
          <div className={styles.categorySection}>
            <h3 className={styles.categoryTitle}> Mebel</h3>
            <div className={styles.productsGrid}>
              {furniture.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={favorites.has(product.id)}
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