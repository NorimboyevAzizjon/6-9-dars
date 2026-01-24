import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input, Textarea } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Alert, AlertDescription } from '../components/ui/alert'
import { Badge } from '../components/ui/badge'
import { getProducts, addProduct, deleteProduct, updateProduct } from '../lib/api'
import { Package, Plus, Trash2, Edit, X, Search, LayoutGrid, List, ShoppingBag, TrendingUp, DollarSign, CheckCircle, AlertCircle } from 'lucide-react'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    image_url: '',
    description: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('table')

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess('')
        setError('')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success, error])

  const loadProducts = async () => {
    setLoading(true)
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
      setError('Mahsulotlarni yuklashda xatolik')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price)
      }

      if (editingId) {
        await updateProduct(editingId, productData)
        setSuccess('Mahsulot muvaffaqiyatli yangilandi!')
        setEditingId(null)
      } else {
        await addProduct(productData)
        setSuccess('Mahsulot muvaffaqiyatli qo\'shildi!')
      }
      
      setFormData({
        name: '',
        category: '',
        price: '',
        image_url: '',
        description: ''
      })
      
      await loadProducts()
    } catch (err) {
      setError((editingId ? 'Yangilashda' : 'Qo\'shishda') + ' xatolik: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProduct = async (id, name) => {
    if (!window.confirm(`"${name}" mahsulotini o'chirmoqchimisiz?`)) {
      return
    }
    
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      await deleteProduct(id)
      setSuccess(`"${name}" mahsuloti o'chirildi!`)
      await loadProducts()
    } catch (err) {
      setError('O\'chirishda xatolik: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      image_url: product.image_url || '',
      description: product.description || ''
    })
    setEditingId(product.id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelEdit = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      image_url: '',
      description: ''
    })
    setEditingId(null)
  }

  // Filtrlangan mahsulotlar
  const filteredProducts = products.filter(product => 
    product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Statistika
  const totalProducts = products.length
  const totalValue = products.reduce((sum, p) => sum + (p.price || 0), 0)
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))]
  const avgPrice = totalProducts > 0 ? totalValue / totalProducts : 0

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b sticky top-16 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                <Package className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Mahsulotlarni boshqarish</p>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Mahsulot qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl border-gray-200 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-blue-100 text-xs font-medium">Jami mahsulotlar</p>
                  <p className="text-2xl font-bold mt-1">{totalProducts}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <ShoppingBag className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-500 to-emerald-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-emerald-100 text-xs font-medium">Jami qiymat</p>
                  <p className="text-xl font-bold mt-1">{(totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <DollarSign className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-violet-500 to-violet-600 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-violet-100 text-xs font-medium">Kategoriyalar</p>
                  <p className="text-2xl font-bold mt-1">{categories.length}</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <LayoutGrid className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow bg-gradient-to-br from-amber-500 to-orange-500 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10" />
            <CardContent className="p-4">
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-amber-100 text-xs font-medium">O'rtacha narx</p>
                  <p className="text-xl font-bold mt-1">{(avgPrice / 1000).toFixed(0)}K</p>
                </div>
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-4 rounded-xl border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-4 bg-emerald-50 text-emerald-800 border-emerald-200 rounded-xl">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-sm rounded-2xl overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between pb-2 bg-gray-50/50">
                <CardTitle className="text-base font-semibold">
                  Mahsulotlar 
                  <Badge variant="secondary" className="ml-2 rounded-full">{filteredProducts.length}</Badge>
                </CardTitle>
                <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                  <Button 
                    variant={viewMode === 'table' ? 'default' : 'ghost'} 
                    size="icon"
                    className={`h-7 w-7 ${viewMode === 'table' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('table')}
                  >
                    <List className="h-3.5 w-3.5" />
                  </Button>
                  <Button 
                    variant={viewMode === 'grid' ? 'default' : 'ghost'} 
                    size="icon"
                    className={`h-7 w-7 ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loading && products.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-10 h-10 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-muted-foreground">Yuklanmoqda...</p>
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-300" />
                    </div>
                    <p className="font-medium">{searchQuery ? 'Hech narsa topilmadi' : 'Hozircha mahsulotlar yo\'q'}</p>
                    <p className="text-sm mt-1">Yangi mahsulot qo'shing</p>
                  </div>
                ) : viewMode === 'table' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-gray-50/80 text-left text-xs text-gray-500 uppercase tracking-wider">
                          <th className="px-4 py-3 font-semibold">Mahsulot</th>
                          <th className="px-4 py-3 font-semibold">Kategoriya</th>
                          <th className="px-4 py-3 font-semibold">Narxi</th>
                          <th className="px-4 py-3 font-semibold text-right">Amallar</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredProducts.slice(0, 20).map(product => (
                          <tr 
                            key={product.id} 
                            className={`hover:bg-gray-50/80 transition-colors ${editingId === product.id ? 'bg-blue-50 hover:bg-blue-50' : ''}`}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-3">
                                <img
                                  src={product.image_url || 'https://via.placeholder.com/50x50?text=No+Image'}
                                  alt={product.name}
                                  className="w-11 h-11 object-cover rounded-lg border"
                                />
                                <div className="min-w-0">
                                  <p className="font-medium text-sm text-gray-900 truncate max-w-[200px]">{product.name}</p>
                                  {product.brand && (
                                    <p className="text-xs text-gray-500">{product.brand}</p>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <Badge variant="secondary" className="rounded-full text-xs font-normal">
                                {product.category || 'Boshqa'}
                              </Badge>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-semibold text-sm text-gray-900">
                                {Number(product.price).toLocaleString('uz-UZ')}
                              </span>
                              <span className="text-xs text-gray-500 ml-1">so'm</span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-1">
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-100"
                                  onClick={() => handleEditProduct(product)}
                                  disabled={loading}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-100"
                                  onClick={() => handleDeleteProduct(product.id, product.name)}
                                  disabled={loading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {filteredProducts.slice(0, 12).map(product => (
                      <div 
                        key={product.id} 
                        className={`group p-3 rounded-xl border bg-white hover:shadow-md transition-all ${editingId === product.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-100'}`}
                      >
                        <div className="relative mb-3">
                          <img
                            src={product.image_url || 'https://via.placeholder.com/150x150?text=No+Image'}
                            alt={product.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 rounded-lg transition-colors" />
                        </div>
                        <p className="font-medium text-sm text-gray-900 line-clamp-1">{product.name}</p>
                        <p className="text-xs text-gray-500 mb-2">{product.category || 'Boshqa'}</p>
                        <p className="font-bold text-sm text-blue-600">{Number(product.price).toLocaleString('uz-UZ')} so'm</p>
                        <div className="flex gap-1.5 mt-3">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="flex-1 h-8 text-xs rounded-lg"
                            onClick={() => handleEditProduct(product)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Tahrirlash
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:bg-red-50 hover:border-red-200 rounded-lg"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Add/Edit Form */}
          <div>
            <Card className={`border-0 shadow-sm rounded-2xl sticky top-36 overflow-hidden ${editingId ? 'ring-2 ring-blue-500' : ''}`}>
              <CardHeader className={`pb-4 ${editingId ? 'bg-blue-50' : 'bg-gray-50/50'}`}>
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    {editingId ? (
                      <>
                        <div className="p-1.5 bg-blue-500 rounded-lg text-white">
                          <Edit className="h-4 w-4" />
                        </div>
                        <span>Tahrirlash</span>
                      </>
                    ) : (
                      <>
                        <div className="p-1.5 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg text-white">
                          <Plus className="h-4 w-4" />
                        </div>
                        <span>Yangi mahsulot</span>
                      </>
                    )}
                  </span>
                  {editingId && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={handleCancelEdit}
                      className="text-gray-500 h-8 hover:bg-white"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Bekor
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">Mahsulot nomi <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="iPhone 15 Pro"
                      className="rounded-xl h-10"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="category" className="text-sm font-medium">Kategoriya</Label>
                    <Input
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="Elektronika"
                      className="rounded-xl h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="price" className="text-sm font-medium">Narxi (so'm) <span className="text-red-500">*</span></Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="1"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="18500000"
                      className="rounded-xl h-10"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="image_url" className="text-sm font-medium">Rasm URL</Label>
                    <Input
                      id="image_url"
                      name="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={handleChange}
                      placeholder="https://example.com/image.jpg"
                      className="rounded-xl h-10"
                    />
                    {formData.image_url && (
                      <div className="mt-2 p-2 bg-gray-50 rounded-lg">
                        <img 
                          src={formData.image_url} 
                          alt="Preview" 
                          className="w-full h-20 object-cover rounded-lg"
                          onError={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-sm font-medium">Tavsif</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Mahsulot haqida..."
                      rows={3}
                      className="rounded-xl resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full rounded-xl h-11 font-medium transition-all ${
                      editingId 
                        ? 'bg-blue-600 hover:bg-blue-700' 
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg hover:shadow-blue-500/25'
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        {editingId ? 'Saqlanmoqda...' : 'Qo\'shilmoqda...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {editingId ? <CheckCircle className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                        {editingId ? 'O\'zgarishlarni saqlash' : 'Mahsulot qo\'shish'}
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard