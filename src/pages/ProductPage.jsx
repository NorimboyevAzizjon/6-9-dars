import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { getProductById } from '../lib/api'
import { useCart } from '../context/CartContext'
import { ShoppingCart, ArrowLeft, Star, Package } from 'lucide-react'
import { LoadingSpinner } from '../components/LoadingSpinner'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      if (data) {
        setProduct(data)
      } else {
        setError('Mahsulot topilmadi')
      }
    } catch (err) {
      setError('Mahsulotni yuklashda xatolik')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    addToCart(product)
    alert('Mahsulot savatchaga qo\'shildi!')
  }

  if (loading) return <LoadingSpinner />
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>
  if (!product) return <div className="text-center py-8">Mahsulot topilmadi</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Ortga
      </Button>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <img
              src={product.image_url || 'https://via.placeholder.com/600x600'}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              {product.brand && <Badge variant="outline">{product.brand}</Badge>}
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-semibold">{product.rating?.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <div className="flex items-center text-muted-foreground">
                <Package className="h-4 w-4 mr-1" />
                <span>Omborda: {product.stock} ta</span>
              </div>
            </div>
            
            <div className="mb-6">
              <span className="text-4xl font-bold text-primary">
                {Number(product.price).toLocaleString('uz-UZ')} so'm
              </span>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-3">Tavsif</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="space-y-4">
              <Button 
                className="w-full py-6 text-lg"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                {product.stock > 0 ? "Savatchaga qo'shish" : "Mavjud emas"}
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/cart')}
              >
                Hozir sotib olish
              </Button>
            </div>
            
            <div className="mt-8 pt-8 border-t">
              <h3 className="font-semibold mb-2">Mahsulot tafsilotlari</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>ID: {product.id}</li>
                <li>Kategoriya: {product.category}</li>
                {product.brand && <li>Brend: {product.brand}</li>}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default ProductPage