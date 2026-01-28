import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// Admin emaillar ro'yxati (Supabase'da role qo'shish mumkin)
const ADMIN_EMAILS = ['admin@example.com', 'admin@techstore.uz']

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Supabase session tekshirish
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
            role: ADMIN_EMAILS.includes(session.user.email) ? 'admin' : 'user',
            isAdmin: ADMIN_EMAILS.includes(session.user.email)
          }
          setUser(userData)
        }
      } catch (error) {
        console.error('Session error:', error)
      } finally {
        setLoading(false)
      }
    }

    getSession()

    // Auth state o'zgarishlarini kuzatish
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            name: session.user.user_metadata?.name || session.user.email?.split('@')[0],
            role: ADMIN_EMAILS.includes(session.user.email) ? 'admin' : 'user',
            isAdmin: ADMIN_EMAILS.includes(session.user.email)
          }
          setUser(userData)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      throw new Error(error.message === 'Invalid login credentials' 
        ? 'Email yoki parol noto\'g\'ri' 
        : error.message)
    }

    const userData = {
      id: data.user.id,
      email: data.user.email,
      name: data.user.user_metadata?.name || data.user.email?.split('@')[0],
      role: ADMIN_EMAILS.includes(data.user.email) ? 'admin' : 'user',
      isAdmin: ADMIN_EMAILS.includes(data.user.email)
    }

    return userData
  }

  const register = async (name, email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    })

    if (error) {
      return { success: false, error: error.message }
    }

    // Email tasdiqlash kerak bo'lsa
    if (data.user && !data.session) {
      return { 
        success: true, 
        message: 'Ro\'yxatdan o\'tdingiz! Email manzilingizga tasdiqlash xabari yuborildi.' 
      }
    }

    return { success: true }
  }

  const updateProfile = async (updates) => {
    if (!user) {
      return { success: false, error: 'Foydalanuvchi topilmadi' }
    }

    const { error } = await supabase.auth.updateUser({
      data: updates
    })

    if (error) {
      return { success: false, error: error.message }
    }

    setUser(prev => ({ ...prev, ...updates }))
    return { success: true }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const isAdmin = user?.role === 'admin' || ADMIN_EMAILS.includes(user?.email) || user?.isAdmin

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      register,
      updateProfile,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  )
}