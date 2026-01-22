import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input, Textarea } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Alert, AlertDescription } from '../components/ui/alert'
import { getProducts, addProduct, deleteProduct } from '../lib/api'
import { Package, Plus, Trash2, Edit, RefreshCw } from 'lucide-react'

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

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (err) {
      console.error('Error loading products:', err)
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
      const productToAdd = {
        ...formData,
        price: parseFloat(formData.price)
      }

      await addProduct(productToAdd)
      
      setSuccess('Mahsulot muvaffaqiyatli qo\'shildi!')
      setFormData({
        name: '',
        category: '',
        price: '',
        image_url: '',
        description: ''
      })
      
      // Yangi mahsulotlar ro'yxatini yangilash
      await loadProducts()
    } catch (err) {
      setError('Mahsulot qo\'shishda xatolik: ' + err.message)
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
      setSuccess(`"${name}" mahsuloti o'chirildi (Demo API - haqiqatda o'chirilmaydi)`)
      // Demo API da haqiqatda o'chirilmaydi, lekin muvaffaqiyat xabarini ko'rsatamiz
    } catch (err) {
      setError('O\'chirishda xatolik: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = async () => {
    setLoading(true)
    setError('')
    setSuccess('')
    
    try {
      await loadProducts()
      setSuccess('Mahsulotlar yangilandi')
    } catch (err) {
      setError('Yangilashda xatolik: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Package className="h-8 w-8" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Mahsulotlarni boshqarish paneli (DummyJSON API)
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleRefresh}
          disabled={loading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Yangilash
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Mavjud mahsulotlar</CardTitle>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  Hozircha mahsulotlar yo'q
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-muted-foreground">
                        <th className="pb-3 font-medium">Rasm</th>
                        <th className="pb-3 font-medium">Nomi</th>
                        <th className="pb-3 font-medium">Kategoriya</th>
                        <th className="pb-3 font-medium">Narxi</th>
                        <th className="pb-3 font-medium text-right">Amallar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map(product => (
                        <tr key={product.id} className="border-b last:border-0">
                          <td className="py-4">
                            <img
                              src={product.image_url || 'https://via.placeholder.com/50x50'}
                              alt={product.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                          </td>
                          <td className="py-4 font-semibold">{product.name}</td>
                          <td className="py-4 text-muted-foreground italic">{product.category || '-'}</td>
                          <td className="py-4 font-medium">
                            {Number(product.price).toLocaleString('uz-UZ')} so'm
                          </td>
                          <td className="py-4">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
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
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Yangi mahsulot
              </CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Mahsulot nomi</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="iPhone 15 Pro"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya</Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Elektronika"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Narxi (so'm)</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    step="1"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="18500000"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image_url">Rasm URL</Label>
                  <Input
                    id="image_url"
                    name="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Tavsif</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mahsulot haqida batafsil ma'lumot..."
                    rows={4}
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={loading}
                >
                  {loading ? 'Qo\'shilmoqda...' : 'Mahsulot qo\'shish'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Admin test hisobi:</h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>Email: admin@example.com</p>
              <p>Parol: Admin123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard