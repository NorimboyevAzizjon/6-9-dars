import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { getProductById, getProducts } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { ShoppingCart, ArrowLeft, Star, Heart, Truck, Shield, RotateCcw, Check, ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, X, ZoomIn, Share2, Copy, MessageCircle, Phone, CreditCard, Clock, Award, Headphones } from 'lucide-react'
import { LoadingSpinner } from '../components/LoadingSpinner'
import ProductCard from '../components/ProductCard'

const ProductPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [showLightbox, setShowLightbox] = useState(false)
  const [similarProducts, setSimilarProducts] = useState([])
  const [copied, setCopied] = useState(false)

  // Savatchadagi mahsulot
  const cartItem = cartItems.find(item => item.id === product?.id)
  const quantity = cartItem ? cartItem.quantity : 0

  useEffect(() => {
    loadProduct()
    window.scrollTo(0, 0)
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await getProductById(id)
      if (data) {
        setProduct(data)
        // O'xshash mahsulotlarni yuklash
        const allProducts = await getProducts(10)
        const similar = allProducts.filter(p => p.id !== data.id && p.category === data.category).slice(0, 4)
        setSimilarProducts(similar)
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
  }

  const nextImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product?.images) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) return <LoadingSpinner />
  if (error) return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center p-8 rounded-2xl bg-red-50 border border-red-200">
        <p className="text-red-500 font-medium">{error}</p>
        <Button onClick={() => navigate('/')} className="mt-4" variant="outline">
          Bosh sahifaga
        </Button>
      </div>
    </div>
  )
  if (!product) return <div className="text-center py-8">Mahsulot topilmadi</div>

  // Rasmlar massivi - faqat mahsulotning o'z rasmlari
  let images = product.images || [product.image_url || product.thumbnail || 'https://via.placeholder.com/600x600']
  
  // Thumbnail boshqa bo'lsa qo'shamiz
  if (product.thumbnail && !images.includes(product.thumbnail)) {
    images = [product.thumbnail, ...images]
  }
  
  // Takroriy rasmlarni olib tashlaymiz
  images = [...new Set(images)]
  
  const favorite = isFavorite(product.id)

  // Chegirma
  const discount = product.discountPercentage || 0
  const originalPrice = discount > 0 ? Math.round(product.price / (1 - discount / 100)) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6">
      {/* Lightbox / Image Modal */}
      {showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowLightbox(false)}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full h-12 w-12"
            onClick={() => setShowLightbox(false)}
          >
            <X className="h-8 w-8" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-14 w-14"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>
          
          <img
            src={images[selectedImage]}
            alt={product.name}
            className="max-h-[85vh] max-w-[85vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full h-14 w-14"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="h-10 w-10" />
          </Button>
          
          {/* Thumbnail strip */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={(e) => { e.stopPropagation(); setSelectedImage(index); }}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          <div className="absolute bottom-6 right-6 text-white text-sm">
            {selectedImage + 1} / {images.length}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4">
        {/* Back button */}
        <Button 
          variant="ghost" 
          className="mb-6 rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Ortga
        </Button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left side - Image Gallery */}
          <div className="space-y-4 fade-in">
            {/* Main Image with Thumbnails */}
            <div className="flex gap-4">
              {/* Vertical Thumbnails - always show */}
              <div className="hidden md:flex flex-col gap-2 w-20">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg ring-2 ring-primary/30' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {images.length > 4 && (
                  <button className="w-20 h-10 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors">
                    <ChevronDown className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Main Image */}
              <Card className="relative overflow-hidden rounded-2xl border-0 shadow-lg bg-white p-4 flex-1">
                <div 
                  className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden cursor-zoom-in group"
                  onClick={() => setShowLightbox(true)}
                >
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Zoom hint */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="h-4 w-4" />
                    Kattalashtirish
                  </div>
                  
                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-lg"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </>
                  )}

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white text-sm px-3 py-1">
                        -{Math.round(discount)}%
                      </Badge>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <Badge className="bg-orange-500 text-white text-sm">
                        Faqat {product.stock} ta qoldi
                      </Badge>
                    )}
                  </div>

                  {/* Favorite button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 btn-bounce ${
                    favorite 
                      ? 'bg-red-500 text-white scale-110' 
                      : 'bg-white text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-6 w-6 ${favorite ? 'fill-current' : ''}`} />
                </button>
              </div>
            </Card>
            </div>

            {/* Mobile Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex md:hidden gap-3 overflow-x-auto pb-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-primary shadow-lg scale-105' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Share buttons */}
            <Card className="p-4 rounded-2xl border-0 shadow-sm bg-white">
              <p className="text-sm font-medium mb-3 flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Ulashish
              </p>
              <div className="flex gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full"
                  onClick={copyLink}
                >
                  {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                  {copied ? 'Nusxalandi!' : 'Linkni nusxalash'}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-full bg-green-50 border-green-200 text-green-600 hover:bg-green-100"
                  onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(product.name)}`, '_blank')}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Telegram
                </Button>
              </div>
            </Card>

            {/* Features */}
            <Card className="p-4 rounded-2xl border-0 shadow-sm bg-white">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-green-100 flex items-center justify-center">
                    <Truck className="h-6 w-6 text-green-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">Bepul yetkazish</p>
                </div>
                <div className="text-center p-3">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">Kafolat</p>
                </div>
                <div className="text-center p-3">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-purple-100 flex items-center justify-center">
                    <RotateCcw className="h-6 w-6 text-purple-600" />
                  </div>
                  <p className="text-xs text-muted-foreground">14 kun qaytarish</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Right side - Product Info */}
          <div className="space-y-6 fade-in" style={{ animationDelay: '0.1s' }}>
            {/* Category & Brand */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="rounded-full px-4">{product.category}</Badge>
              {product.brand && (
                <Badge variant="outline" className="rounded-full px-4">{product.brand}</Badge>
              )}
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.name}</h1>
            
            {/* Rating & Stock */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-full">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating || 0) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'fill-gray-200 text-gray-200'
                    }`} 
                  />
                ))}
                <span className="ml-2 font-semibold text-sm">{product.rating?.toFixed(1)}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-500'}>
                  {product.stock > 0 ? `Omborda: ${product.stock} ta` : 'Mavjud emas'}
                </span>
              </div>
            </div>
            
            {/* Price */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-r from-primary/5 to-purple-50">
              <div className="flex items-end gap-4 flex-wrap">
                <span className="text-4xl md:text-5xl font-bold gradient-text">
                  {Number(product.price).toLocaleString('uz-UZ')}
                </span>
                <span className="text-xl text-muted-foreground mb-1">so'm</span>
              </div>
              {originalPrice && (
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-lg text-muted-foreground line-through">
                    {originalPrice.toLocaleString('uz-UZ')} so'm
                  </span>
                  <Badge className="bg-red-500 text-white">
                    {Math.round(discount)}% chegirma
                  </Badge>
                </div>
              )}
            </Card>
            
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Tavsif</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
            
            {/* Add to Cart */}
            <div className="space-y-4">
              {quantity === 0 ? (
                <Button 
                  className="w-full py-7 text-lg rounded-2xl bg-gradient-to-r from-primary to-purple-600 hover:shadow-xl hover:shadow-primary/25 transition-all"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="mr-3 h-6 w-6" />
                  {product.stock > 0 ? "Savatchaga qo'shish" : "Mavjud emas"}
                </Button>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 p-2 bg-gray-100 rounded-2xl flex-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-12 w-12 rounded-xl hover:bg-white hover:text-red-500 transition-colors"
                      onClick={() => quantity === 1 ? removeFromCart(product.id) : updateQuantity(product.id, quantity - 1)}
                    >
                      <Minus className="h-5 w-5" />
                    </Button>
                    
                    <span className="font-bold text-2xl flex-1 text-center">
                      {quantity}
                    </span>
                    
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-12 w-12 rounded-xl hover:bg-white hover:text-green-500 transition-colors"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                  
                  <Badge className="bg-green-500 text-white px-4 py-2 text-base">
                    <Check className="h-4 w-4 mr-1" />
                    Qo'shildi
                  </Badge>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full py-6 rounded-2xl text-lg border-2 hover:bg-primary hover:text-white transition-all"
                onClick={() => {
                  if (quantity === 0) addToCart(product)
                  navigate('/cart')
                }}
              >
                Hozir sotib olish
              </Button>
            </div>
            
            {/* Product Details */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white">
              <h3 className="font-semibold mb-4 text-lg">Mahsulot tafsilotlari</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Kategoriya</span>
                  <span className="font-medium">{product.category}</span>
                </div>
                {product.brand && (
                  <div className="flex justify-between py-2 border-b">
                    <span className="text-muted-foreground">Brend</span>
                    <span className="font-medium">{product.brand}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b">
                  <span className="text-muted-foreground">Reyting</span>
                  <span className="font-medium flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {product.rating?.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">ID</span>
                  <span className="font-mono text-sm">{product.id}</span>
                </div>
              </div>
            </Card>

            {/* Services */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm bg-white">
              <h3 className="font-semibold mb-4 text-lg">Xizmatlar</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Onlayn to'lov</p>
                    <p className="text-xs text-muted-foreground">Payme, Click</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Tez yetkazish</p>
                    <p className="text-xs text-muted-foreground">1-3 kun</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Sifat kafolati</p>
                    <p className="text-xs text-muted-foreground">100% original</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Headphones className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">24/7 yordam</p>
                    <p className="text-xs text-muted-foreground">Har doim aloqada</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contact */}
            <Card className="p-6 rounded-2xl border-0 shadow-sm bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-lg">Savollaringiz bormi?</p>
                  <p className="text-muted-foreground text-sm">Biz sizga yordam beramiz</p>
                </div>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white rounded-xl"
                  onClick={() => window.open('tel:+998901234567', '_self')}
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Qo'ng'iroq
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold">O'xshash mahsulotlar</h2>
              <Button 
                variant="ghost" 
                className="rounded-full"
                onClick={() => navigate(`/?category=${product.category}`)}
              >
                Barchasini ko'rish
                <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductPage