// DummyJSON API bilan ishlash
const API_BASE_URL = 'https://dummyjson.com'

// Mahsulotlarni olish
export const getProducts = async (limit = 30, skip = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products?limit=${limit}&skip=${skip}`)
    const data = await response.json()
    
    // API formatini loyihamizga moslashtirish
    return data.products.map(product => ({
      id: product.id,
      name: product.title,
      category: product.category,
      price: Math.round(product.price * 12500), // Dollar -> So'm (taxminiy kurs)
      description: product.description,
      image_url: product.thumbnail,
      rating: product.rating,
      stock: product.stock,
      brand: product.brand
    }))
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
    return []
  }
}

// Bitta mahsulotni olish
export const getProductById = async (id) => {
  try {
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

// Mahsulot qo'shish (Fake - faqat response qaytaradi)
export const addProduct = async (productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: productData.name,
        category: productData.category,
        price: productData.price / 12500,
        description: productData.description,
        thumbnail: productData.image_url
      })
    })
    const data = await response.json()
    
    return {
      id: data.id,
      name: data.title,
      category: data.category,
      price: Math.round(data.price * 12500),
      description: data.description,
      image_url: data.thumbnail
    }
  } catch (error) {
    console.error('Mahsulot qo\'shishda xatolik:', error)
    throw error
  }
}

// Mahsulot o'chirish (Fake)
export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE'
    })
    const data = await response.json()
    return data.isDeleted
  } catch (error) {
    console.error('O\'chirishda xatolik:', error)
    throw error
  }
}

// Mahsulot yangilash (Fake)
export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: productData.name,
        category: productData.category,
        price: productData.price / 12500,
        description: productData.description
      })
    })
    const data = await response.json()
    
    return {
      id: data.id,
      name: data.title,
      category: data.category,
      price: Math.round(data.price * 12500),
      description: data.description,
      image_url: data.thumbnail
    }
  } catch (error) {
    console.error('Yangilashda xatolik:', error)
    throw error
  }
}
