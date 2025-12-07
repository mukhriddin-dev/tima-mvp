import type { Product } from "@/types/product"

export const products: Product[] = [
  {
    id: "kids-set-001",
    slug: "kids-sportswear-set",
    price: 495000,
    currency: "UZS",
    sizeRangeId: "110-150",
    name: {
      uz: "Qishgi mavsum uchun premium sifatdagi kurtka",
      ru: "Премиальная куртка для зимнего сезона",
      en: "Premium Winter Jacket",
    },
    description: {
      general: {
        uz: "Sovuq kunlar uchun maxsus yaratilgan qishki sport to'plami. Kundalik yurish, bog‘cha va maktabga borish, sayr va aktiv o‘yinlar uchun juda qulay. Yengil, ammo issiq ushlab turadi. Premium mato va Italiyaning zamonaviy dizayni bolangizni ham issiq, ham stilida saqlaydi.",
        ru: "Зимний спортивный комплект, созданный специально для холодной погоды. Идеален для прогулок, сада, школы и активных игр. Лёгкий, но хорошо сохраняет тепло. Премиальные ткани и современный итальянский дизайн обеспечат вашему ребёнку и тепло, и стиль.",
        en: "Winter sportswear set designed especially for cold days. Perfect for daily walks, kindergarten or school, and active outdoor play. Lightweight yet warm and insulating. Premium fabrics and modern Italian design keep your child both cozy and stylish.",
      },
      fabric: {
        uz: "Premium darajadagi issiq ushlab turuvchi mato va yumshoq astar. Teri uchun xavfsiz, allergiya chaqirmaydi. Namlikni o‘tkazmaydigan va shamolni yaxshi to‘sadigan tuzilma. Mashinada 30°C da yumshoq rejimda yuvish tavsiya etiladi, dazmollash shart emas.",
        ru: "Премиальные утепляющие материалы и мягкая подкладка. Безопасно для кожи, не вызывает аллергии. Ткань с водоотталкивающей пропиткой и хорошей ветрозащитой. Рекомендуется деликатная машинная стирка при 30°C, глажка не требуется.",
        en: "Premium insulating materials with a soft inner lining. Skin-safe and hypoallergenic. Fabric has water-repellent and wind-resistant properties. Recommended gentle machine wash at 30°C; no ironing required.",
      },
      quality: {
        uz: "Italiya dizayniga ega yuqori sifatli tikuv va ishlov berish. Mustahkam choklar uzoq muddat xizmat qiladi, shaklini yo‘qotmaydi. Fermuar va aksessuarlar ishonchli va bardoshli. Har bir model sifat nazoratidan o‘tgan.",
        ru: "Высокое качество пошива и обработки в стиле итальянского дизайна. Прочные швы служат долго и не теряют форму. Надёжная фурнитура и молнии. Каждый комплект проходит тщательный контроль качества.",
        en: "High-quality craftsmanship with Italian-inspired design. Strong seams retain their shape and last long. Reliable zippers and hardware. Each set passes strict quality control.",
      },
    },
    colors: [
      {
        id: "pinkrose",
        hex: "#FFB6C1",
        label: { uz: "Pushti atirgul", ru: "Розовый роуз", en: "Pink Rose" },
        thumbnail: "/kids-set-001/pinkrose-thumb.webp",
        images: ["/kids-set-001/pinkrose-1.webp", "/kids-set-001/pinkrose-2.webp"],
      },
      {
        id: "gray",
        hex: "#B0B0B0",
        label: { uz: "Kulrang", ru: "Серый", en: "Grey" },
        thumbnail: "/kids-set-001/gray-thumb.webp",
        images: [
          "/kids-set-001/gray-thumb.webp",
          "/kids-set-001/gray-thumb.webp",
          "/kids-set-001/gray-thumb.webp",
        ],
        sizeImages: {
          "110": ["/kids-set-001/gray-thumb.webp"],
          "120": ["/kids-set-001/gray-thumb.webp"],
          "130": ["/kids-set-001/gray-thumb.webp"],
          "140": ["/kids-set-001/gray-thumb.webp"],
          "150": ["/kids-set-001/gray-thumb.webp"],
        },
      },
      {
        id: "limon",
        hex: "#FFD54F",
        label: { uz: "Limon", ru: "Лимонный", en: "Lemon" },
        thumbnail: "/kids-set-001/limon-thumb.webp",
        images: ["/kids-set-001/limon-thumb.webp", "/kids-set-001/limon-thumb.webp"],
      },
      {
        id: "lavender",
        hex: "#E6E6FA",
        label: { uz: "Lavanda", ru: "Лавандовый", en: "Lavender" },
        thumbnail: "/kids-set-001/lavender-thumb.webp",
        images: ["/kids-set-001/lavender-thumb.webp", "/kids-set-001/lavender-thumb.webp"],
      },
      {
        id: "qaymoq",
        hex: "#FFF5E1",
        label: { uz: "Qaymoq rang", ru: "Кремовый", en: "Cream" },
        thumbnail: "/kids-set-001/cream-thumb.webp",
        images: ["/kids-set-001/cream-thumb.webp", "/kids-set-001/cream-thumb.webp"],
      },
    ],
    sizes: [
      { value: 110, ageLabel: { uz: "4–5 yosh", ru: "4–5 года", en: "4–5 years" } },
      { value: 120, ageLabel: { uz: "6–7 yosh", ru: "6–7 лет", en: "6–7 years" } },
      { value: 130, ageLabel: { uz: "8–9 yosh", ru: "8–9 лет", en: "8–9 years" } },
      { value: 140, ageLabel: { uz: "10–11 yosh", ru: "10–11 лет", en: "10–11 years" } },
      { value: 150, ageLabel: { uz: "12–13 yosh", ru: "12–13 лет", en: "12–13 years" } },
    ],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug || p.id === slug)
}

export function getDefaultProduct(): Product {
  return products[0]
}
