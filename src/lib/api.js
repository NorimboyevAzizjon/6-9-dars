// DummyJSON API bilan ishlash + localStorage
const API_BASE_URL = 'https://dummyjson.com'

// LocalStorage dan qo'shilgan mahsulotlarni olish
const getLocalProducts = () => {
  const stored = localStorage.getItem('custom_products')
  return stored ? JSON.parse(stored) : []
}

// LocalStorage ga mahsulot qo'shish
const saveLocalProducts = (products) => {
  localStorage.setItem('custom_products', JSON.stringify(products))
}

// Mahsulotlarni olish
export const getProducts = async (limit = 30, skip = 0) => {
  try {
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
    
    // LocalStorage dagi qo'shilgan mahsulotlarni ham qo'shamiz
    const localProducts = getLocalProducts()
    
    return [...localProducts, ...apiProducts]
  } catch (error) {
    console.error('Mahsulotlarni olishda xatolik:', error)
    return getLocalProducts()
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

// Mahsulot qo'shish (localStorage ga saqlaydi)
export const addProduct = async (productData) => {
  try {
    // Yangi ID yaratish
    const localProducts = getLocalProducts()
    const newId = `custom_${Date.now()}`
    
    const newProduct = {
      id: newId,
      name: productData.name,
      category: productData.category,
      price: parseFloat(productData.price),
      description: productData.description,
      image_url: productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
      images: [productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image'],
      thumbnail: productData.image_url || 'https://via.placeholder.com/300x300?text=No+Image',
      rating: 4.5,
      stock: 100,
      brand: productData.brand || 'Custom',
      isCustom: true
    }
    
    // LocalStorage ga saqlash
    localProducts.unshift(newProduct)
    saveLocalProducts(localProducts)
    
    return newProduct
  } catch (error) {
    console.error('Mahsulot qo\'shishda xatolik:', error)
    throw error
  }
}

// Mahsulot o'chirish
export const deleteProduct = async (id) => {
  try {
    // Agar custom mahsulot bo'lsa - localStorage dan o'chirish
    if (String(id).startsWith('custom_')) {
      const localProducts = getLocalProducts()
      const filtered = localProducts.filter(p => p.id !== id)
      saveLocalProducts(filtered)
      return true
    }
    
    // API mahsulotlari uchun fake delete
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

// Mahsulot yangilash
export const updateProduct = async (id, productData) => {
  try {
    // Agar custom mahsulot bo'lsa - localStorage da yangilash
    if (String(id).startsWith('custom_')) {
      const localProducts = getLocalProducts()
      const index = localProducts.findIndex(p => p.id === id)
      if (index !== -1) {
        localProducts[index] = {
          ...localProducts[index],
          name: productData.name,
          category: productData.category,
          price: parseFloat(productData.price),
          description: productData.description,
          image_url: productData.image_url || localProducts[index].image_url
        }
        saveLocalProducts(localProducts)
        return localProducts[index]
      }
    }
    
    // API mahsulotlari uchun fake update
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
