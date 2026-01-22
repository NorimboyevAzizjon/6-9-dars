import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Alert, AlertDescription } from '../components/ui/alert'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartItem from '../components/CartItem'
import { ShoppingBag, AlertCircle } from 'lucide-react'

const CartPage = () => {
  const navigate = useNavigate()
  const { cartItems, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    
    // Savatchani tozalash va Success page ga o'tish
    clearCart()
    navigate('/success')
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Savatchangiz bo'sh</h2>
        <p className="text-muted-foreground mb-6">
          Savatchangizga mahsulot qo'shish uchun bosh sahifaga o'ting
        </p>
        <Button onClick={() => navigate('/')}>
          Mahsulotlarni ko'rish
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Savatcha</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          
          <div className="flex justify-end pt-4">
            <Button 
              variant="outline" 
              onClick={clearCart}
            >
              Savatchani tozalash
            </Button>
          </div>
        </div>
        
        <div>
          <Card className="p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Buyurtma haqida</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Jami mahsulotlar:</span>
                <span>{cartItems.length} ta</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-muted-foreground">Yetkazib berish:</span>
                <span className="text-green-600">Bepul</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Umumiy summa:</span>
                  <span className="text-2xl text-primary">{Number(getTotalPrice()).toLocaleString('uz-UZ')} so'm</span>
                </div>
              </div>
            </div>
            
            {!user && (
              <Alert className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Buyurtma berish uchun tizimga kiring
                </AlertDescription>
              </Alert>
            )}
            
            <Button 
              className="w-full py-6 text-lg"
              onClick={handleCheckout}
            >
              {user ? 'Buyurtma berish' : 'Kirish va buyurtma berish'}
            </Button>
            
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Buyurtma berish orqali siz bizning shartlarimizga rozilik bildirasiz
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CartPage