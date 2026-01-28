// Supabase + DummyJSON API bilan ishlash
import { supabase } from './supabase'

const API_BASE_URL = 'https://dummyjson.com'

// Supabase'da mahsulotlar jadvalidan olish
const getSupabaseProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Supabase products error:', error)
    return []
  }
}

// Mahsulotlarni olish (Supabase + DummyJSON fallback)
export const getProducts = async (limit = 30, skip = 0) => {
  try {
    // Avval Supabase'dan olishga harakat qilamiz
    const supabaseProducts = await getSupabaseProducts()
    
    // Agar Supabase'da mahsulotlar bo'lsa
    if (supabaseProducts.length > 0) {
      return supabaseProducts
    }
    
    // Aks holda DummyJSON'dan olamiz
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    
    // API formatini loyihamizga moslashtirish
    const apiProducts = data.products.map(product => ({
      id: product.id,
      name: product.title,
      category: product.category,
      price: Math.round(product.price * 12500), // Dollar -> So'm (taxminiy kurs)
      description: product.description,
      image_url: product.thumbnail,
      images: product.images,
      thumbnail: product.thumbnail,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      discountPercentage: product.discountPercentage
    }))
    
    return apiProducts
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
    return []
  }
}

// Bitta mahsulotni olish
export const getProductById = async (id) => {
  try {
    // Supabase'dan qidirish
    const { data: supabaseProduct } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (supabaseProduct) {
      return supabaseProduct
    }
    
    // DummyJSON'dan olish
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    const product = await response.json()
    
    if (product.message) {
      return null // Mahsulot topilmadi
    }
    
    return {
      id: product.id,
      name: product.title,
      category: product.category,
      price: Math.round(product.price * 12500),
      description: product.description,
      image_url: product.thumbnail,
      images: product.images,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand,
      reviews: product.reviews
    }
  } catch (error) {
    console.error('Mahsulotni olishda xatolik:', error)
    return null
  }
}

// Kategoriya bo'yicha mahsulotlarni olish
export const getProductsByCategory = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`)
    const data = await response.json()
    
    return data.products.map(product => ({
      id: product.id,
      name: product.title,
      category: product.category,
      price: Math.round(product.price * 12500),
      description: product.description,
      image_url: product.thumbnail,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand
    }))
  } catch (error) {
    console.error('Kategoriya mahsulotlarini olishda xatolik:', error)
    return []
  }
}

// Barcha kategoriyalarni olish
export const getCategories = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/categories`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Kategoriyalarni olishda xatolik:', error)
    return []
  }
}

// Mahsulotlarni qidirish
export const searchProducts = async (query) => {
  try {
    // Supabase'dan qidirish
    const { data: supabaseResults } = await supabase
      .from('products')
      .select('*')
      .ilike('name', `%${query}%`)
    
    if (supabaseResults && supabaseResults.length > 0) {
      return supabaseResults
    }
    
    // DummyJSON'dan qidirish
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`)
    const data = await response.json()
    
    return data.products.map(product => ({
      id: product.id,
      name: product.title,
      category: product.category,
      price: Math.round(product.price * 12500),
      description: product.description,
      image_url: product.thumbnail,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand
    }))
  } catch (error) {
    console.error('Qidirishda xatolik:', error)
    return []
  }
}

// Mahsulot qo'shish (Supabase'ga saqlaydi)
export const addProduct = async (productData) => {
  try {
    const newProduct = {
      name: productData.name,
      category: productData.category,
      price: parseFloat(productData.price),
      description: productData.description,
      image_url: productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
      images: [productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image'],
      thumbnail: productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: 4.5,
      stock: 100,
      brand: productData.brand || 'TechStore'
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert([newProduct])
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Mahsulot qo\'shishda xatolik:', error)
    throw error
  }
}

// Mahsulot o'chirish (Supabase'dan)
export const deleteProduct = async (id) => {
  try {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    
    return true
  } catch (error) {
    console.error('O\'chirishda xatolik:', error)
    throw error
  }
}

// Mahsulot yangilash (Supabase'da)
export const updateProduct = async (id, productData) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .update({
        name: productData.name,
        category: productData.category,
        price: parseFloat(productData.price),
        description: productData.description,
        image_url: productData.image_url
      })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Yangilashda xatolik:', error)
    throw error
  }
}
