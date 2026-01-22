import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { CheckCircle, Home, ShoppingBag } from 'lucide-react'

const SuccessPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            
            <CardTitle className="text-3xl mb-4">
              Tabriklaymiz!
            </CardTitle>
            
            <p className="text-xl mb-6 text-muted-foreground">
              Sizning buyurtmangiz muvaffaqiyatli amalga oshirildi. 
              Tez orada mahsulotlaringiz yetkazib beriladi!
            </p>
            
            <div className="space-y-4 mb-8">
              <p className="text-muted-foreground">
                Buyurtma raqami: <span className="font-mono font-bold">ORD-{Date.now()}</span>
              </p>
              <p className="text-muted-foreground">
                Xaridingiz uchun rahmat! Siz bilan aloqamiz tez orada bo'ladi.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="w-full sm:w-auto">
                  <Home className="mr-2 h-4 w-4" />
                  Bosh sahifaga
                </Button>
              </Link>
              
              <Link to="/">
                <Button className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Davom etish
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SuccessPage