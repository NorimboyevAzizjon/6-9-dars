import { Link } from 'react-router-dom'
import { Card, CardContent, CardFooter } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { ShoppingCart, Star, Plus, Minus, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

const ProductCard = ({ product }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  // Savatchadagi mahsulot miqdorini topish
  const cartItem = cartItems.find(item => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0
  const favorite = isFavorite(product.id)

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img
              src={product.image_url || 'https://via.placeholder.com/300x300'}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>
        
        {/* Badges va Yurakcha */}
        {product.category && (
          <Badge className="absolute top-2 left-2 text-xs">
            {product.category}
          </Badge>
        )}
        {quantity > 0 && (
          <Badge className="absolute top-10 left-2 bg-green-500">
            {quantity} ta
          </Badge>
        )}
        
        {/* Yurakcha tugmasi */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleFavorite(product)
          }}
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-sm"
        >
          <Heart 
            className={`h-5 w-5 transition-colors ${
              favorite 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>
      
      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating.toFixed(1)}</span>
          </div>
        )}
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">{Number(product.price).toLocaleString('uz-UZ')} so'm</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {quantity === 0 ? (
          <Button 
            className="w-full"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Savatchaga
          </Button>
        ) : (
          <div className="flex items-center justify-between w-full gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            
            <span className="font-bold text-lg flex-1 text-center">
              {quantity}
            </span>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => updateQuantity(product.id, quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default ProductCard