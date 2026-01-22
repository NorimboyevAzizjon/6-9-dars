import { supabase } from './supabase'

export const seedProducts = [
  {
    name: 'iPhone 15 Pro Max',
    category: 'Elektronika',
    price: 18500000,
    description: 'Apple iPhone 15 Pro Max - eng so\'nggi Apple smartfoni. A17 Pro chip, 48MP kamera, titanium dizayn.',
    image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=400&hei=400&fmt=jpeg&qlt=95'
  },
  {
    name: 'MacBook Pro 14',
    category: 'Kompyuterlar',
    price: 32000000,
    description: 'Apple MacBook Pro 14" - M3 Pro chip, 18GB RAM, 512GB SSD. Professional darajadagi noutbuk.',
    image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=400&hei=400&fmt=jpeg&qlt=95'
  },
  {
    name: 'AirPods Pro 2',
    category: 'Aksessuarlar',
    price: 3500000,
    description: 'Apple AirPods Pro 2 - faol shovqinni bekor qilish, adaptive audio, USB-C zaryadlash.',
    image_url: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=400&hei=400&fmt=jpeg&qlt=95'
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Elektronika',
    price: 16000000,
    description: 'Samsung Galaxy S24 Ultra - Galaxy AI, 200MP kamera, S Pen, titanium rama.',
    image_url: 'https://images.samsung.com/is/image/samsung/p6pim/uz/2401/gallery/uz-galaxy-s24-s928-sm-s928bztqskz-thumb-539573400'
  },
  {
    name: 'Sony WH-1000XM5',
    category: 'Aksessuarlar',
    price: 4800000,
    description: 'Sony WH-1000XM5 - premium simsiz quloqchin, eng yaxshi shovqin bekor qilish texnologiyasi.',
    image_url: 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-1000xm5_Primary_image?$categorypdpnav$'
  },
  {
    name: 'Nike Air Max 90',
    category: 'Poyafzal',
    price: 1800000,
    description: 'Nike Air Max 90 - klassik dizayn, Air Max yostiqlash texnologiyasi, qulay va chiroyli.',
    image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/wzitsrb4oucx9jukxsmc/air-max-90-shoes-kRsBnD.png'
  }
]

export const insertSeedProducts = async () => {
  try {
    // Avval mavjud mahsulotlarni tekshirish
    const { data: existingProducts } = await supabase
      .from('products')
      .select('name')
    
    const existingNames = existingProducts?.map(p => p.name) || []
    
    // Faqat mavjud bo'lmagan mahsulotlarni qo'shish
    const newProducts = seedProducts.filter(p => !existingNames.includes(p.name))
    
    if (newProducts.length === 0) {
      console.log('Barcha mahsulotlar allaqachon mavjud')
      return { success: true, message: 'Barcha mahsulotlar allaqachon mavjud', added: 0 }
    }
    
    const { data, error } = await supabase
      .from('products')
      .insert(newProducts)
      .select()
    
    if (error) {
      console.error('Mahsulotlarni qo\'shishda xatolik:', error)
      throw error
    }
    
    console.log(`${newProducts.length} ta mahsulot muvaffaqiyatli qo'shildi`)
    return { success: true, message: `${newProducts.length} ta mahsulot qo'shildi`, added: newProducts.length, data }
  } catch (error) {
    console.error('Seed xatoligi:', error)
    return { success: false, message: error.message, added: 0 }
  }
}
