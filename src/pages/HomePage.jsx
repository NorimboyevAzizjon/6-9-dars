import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts, getCategories, getProductsByCategory, searchProducts } from '../lib/api'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { Search } from 'lucide-react'

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadInitialData()
  }, [])

  const loadInitialData = async () => {
    try {
      setLoading(true)
      const [productsData, categoriesData] = await Promise.all([
        getProducts(30),
        getCategories()
      ])
      setProducts(productsData)
      setCategories(categoriesData)
    } catch (err) {
      setError('Mahsulotlarni yuklashda xatolik yuz berdi')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = async (category) => {
    setSelectedCategory(category)
    setLoading(true)
    try {
      if (category) {
        const data = await getProductsByCategory(category)
        setProducts(data)
      } else {
        const data = await getProducts(30)
        setProducts(data)
      }
    } catch (err) {
      setError('Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) {
      loadInitialData()
      return
    }
    setLoading(true)
    try {
      const data = await searchProducts(searchQuery)
      setProducts(data)
    } catch (err) {
      setError('Qidirishda xatolik')
    } finally {
      setLoading(false)
    }
  }

  if (error) return <div className="text-center py-8 text-red-500">{error}</div>

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search va Filter */}
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <Input
            placeholder="Mahsulot qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        {/* Kategoriyalar */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleCategoryChange('')}
          >
            Barchasi
          </Button>
          {categories.slice(0, 10).map((cat) => (
            <Button
              key={cat.slug}
              variant={selectedCategory === cat.slug ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleCategoryChange(cat.slug)}
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Barcha Mahsulotlar</h1>
        <p className="text-muted-foreground">
          {products.length} ta mahsulot topildi
        </p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">Mahsulotlar topilmadi</h3>
          <p className="text-muted-foreground">Hozircha hech qanday mahsulot yo'q</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage