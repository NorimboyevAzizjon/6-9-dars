-- =====================================================
-- SUPABASE DATABASE SETUP - TechStore Online Do'kon
-- =====================================================
-- Bu SQL ni Supabase Dashboard > SQL Editor da ishga tushiring
-- =====================================================

-- 1. PRODUCTS JADVALI
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT,
  price NUMERIC NOT NULL DEFAULT 0,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ROW LEVEL SECURITY (RLS)
-- =====================================================
-- RLS ni yoqish
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Hamma mahsulotlarni ko'ra oladi (o'qish)
CREATE POLICY "Public read access" ON products
  FOR SELECT USING (true);

-- Hamma mahsulot qo'sha oladi (insert) - test uchun
CREATE POLICY "Public insert access" ON products
  FOR INSERT WITH CHECK (true);

-- Hamma mahsulotni yangilay oladi (update) - test uchun
CREATE POLICY "Public update access" ON products
  FOR UPDATE USING (true);

-- Hamma mahsulotni o'chira oladi (delete) - test uchun
CREATE POLICY "Public delete access" ON products
  FOR DELETE USING (true);

-- 3. NAMUNA MAHSULOTLAR QO'SHISH
-- =====================================================
INSERT INTO products (name, category, price, description, image_url) VALUES
(
  'iPhone 15 Pro Max',
  'Elektronika',
  18500000,
  'Apple iPhone 15 Pro Max - eng so''nggi Apple smartfoni. A17 Pro chip, 48MP kamera, titanium dizayn.',
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=400&hei=400&fmt=jpeg&qlt=95'
),
(
  'MacBook Pro 14',
  'Kompyuterlar',
  32000000,
  'Apple MacBook Pro 14" - M3 Pro chip, 18GB RAM, 512GB SSD. Professional darajadagi noutbuk.',
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=jpeg&qlt=95'
),
(
  'AirPods Pro 2',
  'Aksessuarlar',
  3500000,
  'Apple AirPods Pro 2 - faol shovqinni bekor qilish, adaptive audio, USB-C zaryadlash.',
  'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=95'
),
(
  'Samsung Galaxy S24 Ultra',
  'Elektronika',
  16000000,
  'Samsung Galaxy S24 Ultra - Galaxy AI, 200MP kamera, S Pen, titanium rama.',
  'https://images.samsung.com/is/image/samsung/p6pim/uz/2401/gallery/uz-galaxy-s24-s928-sm-s928bztqskz-thumb-539573400'
),
(
  'Sony WH-1000XM5',
  'Aksessuarlar',
  4800000,
  'Sony WH-1000XM5 - premium simsiz quloqchin, eng yaxshi shovqin bekor qilish texnologiyasi.',
  'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm5_Primary_image?$categorypdpnav$'
),
(
  'Nike Air Max 90',
  'Poyafzal',
  1800000,
  'Nike Air Max 90 - klassik dizayn, Air Max yostiqlash texnologiyasi, qulay va chiroyli.',
  'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/wzitsrb4oucx9jukxsmc/air-max-90-shoes-kRsBnD.png'
);

-- 4. TEKSHIRISH
-- =====================================================
-- Mahsulotlar qo'shilganini tekshirish
SELECT * FROM products;

-- =====================================================
-- MUHIM: .env faylini yangilang!
-- =====================================================
-- Supabase Dashboard > Settings > API dan oling:
-- 
-- VITE_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
-- VITE_SUPABASE_ANON_KEY=your_anon_key_here
-- =====================================================
