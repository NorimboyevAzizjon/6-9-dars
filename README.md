# TechStore - Online Do'kon 🛒

Zamonaviy texnologiyalar asosida qurilgan onlayn do'kon veb-sayti.

## 🚀 Texnologiyalar

- **React 18** - UI kutubxonasi
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Supabase** - Backend va Auth
- **React Router** - Routing
- **Lucide React** - Ikonkalar

## 📋 Talablar

- Node.js 18+
- npm yoki yarn
- Supabase account

## 🛠️ O'rnatish

### 1. Loyihani klonlash

```bash
git clone https://github.com/NorimboyevAzizjon/TechStore.git
cd TechStore
```

### 2. Paketlarni o'rnatish

```bash
npm install
```

### 3. Supabase sozlash

- [Supabase](https://supabase.com) da yangi proyekt yarating
- SQL Editor'da database jadvalini yarating
- `.env` faylini yarating va sozlang:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Loyihani ishga tushirish

```bash
npm run dev
```

## 📁 Loyiha tuzilishi

```text
src/
├── components/     # UI komponentlar
│   └── ui/        # Shadcn komponentlari
├── context/       # React Context (Auth, Cart, Favorites)
├── lib/           # API va utility funksiyalar
├── pages/         # Sahifalar
└── assets/        # Statik fayllar
```

## 🔐 Funksiyalar

### Foydalanuvchi autentifikatsiyasi

- ✅ Supabase Auth orqali ro'yxatdan o'tish
- ✅ Email/parol bilan kirish
- ✅ Protected routes (Admin dashboard)

### Sahifalar

- ✅ **Homepage** - Barcha mahsulotlar ro'yxati
- ✅ **Product Page** - Mahsulot batafsil ma'lumoti
- ✅ **Cart Page** - Savatcha
- ✅ **Success Page** - Xarid muvaffaqiyatli
- ✅ **Admin Dashboard** - Mahsulot qo'shish

### Qo'shimcha

- ✅ Context API bilan savatcha boshqaruvi
- ✅ localStorage da savatcha saqlanishi
- ✅ Responsive dizayn
- ✅ Sevimlilar ro'yxati

## 👤 Admin kirish

Admin dashboard'ga kirish uchun `admin@example.com` bilan ro'yxatdan o'ting.

## 📝 License

MIT
