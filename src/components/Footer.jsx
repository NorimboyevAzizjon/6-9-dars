import React from 'react'
import { Link } from 'react-router-dom'
import { Store, Facebook, Instagram, Send, Phone, Mail, MapPin, Heart, ShoppingBag, Sparkles } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25">
                <Store className="h-5 w-5" />
              </div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">TechStore</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Eng so'nggi texnologiyalar va gadjetlar do'koni. Sifat va ishonchlilik kafolati bilan xizmat ko'rsatamiz.
            </p>
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 hover:text-white transition-all duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://t.me/techstore_uz" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-gray-800 text-gray-400 hover:bg-sky-500 hover:text-white transition-all duration-300">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Havolalar
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                  Sevimlilar
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                  Savatcha
                </Link>
              </li>
              <li>
                <Link to="/?discount=true" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                  Chegirmalar
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <ShoppingBag className="h-4 w-4 text-primary" />
              Kategoriyalar
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/?category=smartphones" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Smartfonlar
                </Link>
              </li>
              <li>
                <Link to="/?category=laptops" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                  Noutbuklar
                </Link>
              </li>
              <li>
                <Link to="/?category=fragrances" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500"></span>
                  Parfyumeriya
                </Link>
              </li>
              <li>
                <Link to="/?category=skincare" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500"></span>
                  Teri parvarishi
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Bog'lanish
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="tel:+998901234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800">
                  <div className="p-2 rounded-lg bg-green-500/20">
                    <Phone className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Telefon</p>
                    <p className="font-medium">+998 90 123 45 67</p>
                  </div>
                </a>
              </li>
              <li>
                <a href="mailto:info@techstore.uz" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors p-3 rounded-xl bg-gray-800/50 hover:bg-gray-800">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Mail className="h-4 w-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">info@techstore.uz</p>
                  </div>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-3 text-gray-400 p-3 rounded-xl bg-gray-800/50">
                  <div className="p-2 rounded-lg bg-purple-500/20">
                    <MapPin className="h-4 w-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Manzil</p>
                    <p className="font-medium">Toshkent sh., Chilonzor tumani</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-gray-500 flex items-center gap-2">
            © {new Date().getFullYear()} TechStore. 
            <span className="hidden sm:inline">Barcha huquqlar himoyalangan.</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
          </div>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Maxfiylik siyosati</a>
            <a href="#" className="hover:text-white transition-colors">Foydalanish shartlari</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
