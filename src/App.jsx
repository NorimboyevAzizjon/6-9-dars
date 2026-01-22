import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { FavoritesProvider } from './context/FavoritesContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import FavoritesPage from './pages/FavoritesPage'
import LoginPage from './pages/LoginPage'
import SuccessPage from './pages/SuccessPage'
import AdminDashboard from './pages/AdminDashboard'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/favorites" element={<FavoritesPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/success" element={<SuccessPage />} />
                  <Route 
                    path="/admin" 
                    element={
                      <PrivateRoute requireAdmin={true}>
                        <AdminDashboard />
                      </PrivateRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App