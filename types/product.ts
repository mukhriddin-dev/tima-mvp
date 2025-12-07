export type Language = "uz" | "ru" | "en"

export type LocalizedString = {
  uz: string
  ru: string
  en: string
}

export type StructuredDescription = {
  general: LocalizedString
  fabric: LocalizedString
  quality: LocalizedString
}

export type ProductColor = {
  id: string
  label: LocalizedString
  hex: string
  thumbnail?: string
  images: string[]
  sizeImages?: Record<string, string[]>
}

export type ProductSize = {
  value: number
  ageLabel: LocalizedString
}

export type Product = {
  id: string
  slug: string
  name: LocalizedString
  colors: ProductColor[]
  sizes: ProductSize[]
  description: StructuredDescription
  price: number
  currency: string
  sizeRangeId?: string
}

export type OrderPayload = {
  productId: string
  productName: string
  price: number
  currency: string
  selectedColorId: string
  selectedColorLabel: string
  selectedSize: number
  selectedSizeAgeLabel: string
  currentImageUrl: string
  language: Language
  customerName: string
  customerPhone: string
  customerDistrict: string
  customerAddress: string
  comment: string
  timestamp: string
}
