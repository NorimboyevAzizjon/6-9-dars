import { Card } from './ui/card'
import { Button } from './ui/button'
import { useCart } from '../context/CartContext'
import { Trash2, Plus, Minus } from 'lucide-react'

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart()

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        <img
          src={item.image_url || 'https://via.placeholder.com/100x100'}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-md"
        />
        
        <div className="flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">
                {item.description}
              </p>
            </div>
            
            <div className="text-right">
              <div className="text-xl font-bold mb-2">
                {(item.price * item.quantity).toLocaleString('uz-UZ')} so'm
              </div>
              <div className="text-sm text-muted-foreground">
                {Number(item.price).toLocaleString('uz-UZ')} × {item.quantity}
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="w-12 text-center font-medium">
                {item.quantity}
              </span>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              O'chirish
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default CartItem