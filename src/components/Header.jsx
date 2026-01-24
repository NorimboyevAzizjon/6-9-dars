import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'
import { ShoppingCart, User, LogOut, Store, Heart, Menu, X, Sparkles, Search } from 'lucide-react'
import { useState } from 'react'

const Header = () => {
  const { user, logout, isAdmin } = useAuth()
  const { getTotalItems } = useCart()
  const { getFavoritesCount } = useFavorites()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80 shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold group">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300">
              <Store className="h-5 w-5" />
            </div>
            <span className="gradient-text hidden lg:inline">TechStore</span>
          </Link>
        </div>
        
        {/* Search Bar - Markazda */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Mahsulot qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-24 h-10 rounded-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 bg-gray-50/80"
            />
            <Button 
              type="submit" 
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full px-4 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              Qidirish
            </Button>
          </div>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 mr-2">
            <Link to="/" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors">
              Bosh Sahifa
            </Link>
            {isAdmin && (
              <Link to="/admin" className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-accent transition-colors flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Admin
              </Link>
            )}
          </nav>
          
          {/* Sevimlilar */}
          <Link to="/favorites" className="relative group">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-red-50 hover:text-red-500 transition-colors">
              <Heart className="h-5 w-5" />
              {getFavoritesCount() > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500 border-2 border-white pulse-badge"
                >
                  {getFavoritesCount()}
                </Badge>
              )}
            </Button>
          </Link>
          
          {/* Savatcha */}
          <Link to="/cart" className="relative group">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {getTotalItems() > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs bg-primary border-2 border-white pulse-badge"
                >
                  {getTotalItems()}
                </Badge>
              )}
            </Button>
          </Link>

          {/* User section */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent text-sm">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                  {user.email ? user.email[0].toUpperCase() : 'U'}
                </div>
                <span className="font-medium">{user.email ? user.email.split('@')[0] : 'User'}</span>
                {isAdmin && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">Admin</Badge>
                )}
              </div>
              <Button variant="ghost" size="icon" onClick={logout} className="rounded-full hover:bg-red-50 hover:text-red-500">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm" className="rounded-full px-6 bg-gradient-to-r from-primary to-purple-600 hover:shadow-lg hover:shadow-primary/25 transition-all">
                Kirish
              </Button>
            </Link>
          )}
          
          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2 fade-in">
          <Link 
            to="/" 
            className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            Bosh Sahifa
          </Link>
          {isAdmin && (
            <Link 
              to="/admin" 
              className="block px-4 py-2 rounded-lg hover:bg-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}
        </div>
      )}
    </header>
  )
}

export default Header