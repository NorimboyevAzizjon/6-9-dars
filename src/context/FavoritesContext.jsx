import { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => useContext(FavoritesContext)

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // LocalStorage'dan yuklash
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Error loading favorites:', error)
        localStorage.removeItem('favorites')
      }
    }
  }, [])

  // LocalStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (product) => {
    if (!favorites.find(item => item.id === product.id)) {
      setFavorites([...favorites, product])
    }
  }

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter(item => item.id !== productId))
  }

  const toggleFavorite = (product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId)
  }

  const getFavoritesCount = () => {
    return favorites.length
  }

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      toggleFavorite,
      isFavorite,
      getFavoritesCount
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}
