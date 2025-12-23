import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { addToCart } = useCart();

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			setError(null);
			const { data, error } = await supabase.from('products').select('*').eq('id', id).single();
			if (error) setError(error.message);
			else setProduct(data);
			setLoading(false);
		};
		fetchProduct();
	}, [id]);

	if (loading) return <div>Yuklanmoqda...</div>;
	if (error) return <div>Xatolik: {error}</div>;
	if (!product) return <div>Mahsulot topilmadi</div>;

	return (
		<div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #eee', padding: 24 }}>
			<h1 style={{ marginBottom: 16 }}>{product.name || product.title}</h1>
			<img src={product.image || product.thumbnail} alt={product.name} style={{ width: '100%', maxHeight: 320, objectFit: 'contain', marginBottom: 16 }} />
			<div style={{ fontSize: 24, fontWeight: 600, marginBottom: 12 }}>{product.price?.toLocaleString()} so'm</div>
			<div style={{ marginBottom: 20, color: '#555' }}>{product.description}</div>
			<button 
				style={{ padding: '10px 24px', background: '#7000ff', color: '#fff', border: 'none', borderRadius: 6, fontSize: 18, cursor: 'pointer' }}
				onClick={() => addToCart(product)}
			>
				Savatchaga qo'shish
			</button>
		</div>
	);
};

export default ProductDetailPage;
