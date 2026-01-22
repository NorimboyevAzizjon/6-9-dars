import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { useFavorites } from '../context/FavoritesContext'
import { useCart } from '../context/CartContext'
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react'

const FavoritesPage = () => {
  const navigate = useNavigate()
  const { favorites, removeFromFavorites } = useFavorites()
  const { addToCart } = useCart()

  const handleAddToCart = (product) => {
    addToCart(product)
    removeFromFavorites(product.id)
  }

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Sevimlilar bo'sh</h2>
        <p className="text-muted-foreground mb-6">
          Sevimli mahsulotlarni qo'shish uchun yurakchani bosing
        </p>
        <Button onClick={() => navigate('/')}>
          Mahsulotlarni ko'rish
        </Button>
      </div>
    )
  }

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

      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="h-8 w-8 text-red-500 fill-red-500" />
          Sevimlilar
        </h1>
        <p className="text-muted-foreground">
          {favorites.length} ta mahsulot
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map(product => (
          <Card key={product.id} className="p-4">
            <div className="flex gap-4">
              <img
                src={product.image_url || 'https://via.placeholder.com/100x100'}
                alt={product.name}
                className="w-24 h-24 object-cover rounded-md cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              />
              
              <div className="flex-1">
                <h3 
                  className="font-semibold text-lg mb-1 cursor-pointer hover:text-primary"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-lg">
                  {Number(product.price).toLocaleString('uz-UZ')} so'm
                </p>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button 
                className="flex-1"
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Savatchaga
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => removeFromFavorites(product.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FavoritesPage
