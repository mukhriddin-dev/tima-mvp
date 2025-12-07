"use client"

import { createContext, useContext, type ReactNode } from "react"
import type { Language } from "@/types/product"

type Translations = {
  orderButton: string
  expandDetails: string
  collapseDetails: string
  selectColor: string
  selectSize: string
  sizeLabel: string
  ageLabel: string
  phoneLabel: string
  phonePlaceholder: string
  nameLabel: string
  namePlaceholder: string
  districtLabel: string
  districtPlaceholder: string
  addressLabel: string
  addressPlaceholder: string
  commentLabel: string
  commentPlaceholder: string
  submitOrder: string
  successMessage: string
  closeButton: string
  priceLabel: string
  sizeGuide: string
}

const translations: Record<Language, Translations> = {
  uz: {
    orderButton: "Buyurtma berish",
    expandDetails: "Batafsil",
    collapseDetails: "Yopish",
    selectColor: "Rangni tanlang",
    selectSize: "O'lchamni tanlang",
    sizeLabel: "O'lcham",
    ageLabel: "Yosh",
    phoneLabel: "Telefon raqami",
    phonePlaceholder: "+998 (__) ___-__-__",
    nameLabel: "Ismingiz",
    namePlaceholder: "Ismingizni kiriting",
    districtLabel: "Tuman",
    districtPlaceholder: "Tumanni tanlang",
    addressLabel: "Manzil",
    addressPlaceholder: "Ko'cha, uy, kvartira",
    commentLabel: "Izoh",
    commentPlaceholder: "Qo'shimcha ma'lumot",
    submitOrder: "Buyurtma berish",
    successMessage: "Buyurtmangiz qabul qilindi. Menejerlarimiz siz bilan tez orada bog'lanadi!",
    closeButton: "Yopish",
    priceLabel: "so'm",
    sizeGuide: "O'lcham qo'llanmasi",
  },
  ru: {
    orderButton: "Заказать",
    expandDetails: "Подробнее",
    collapseDetails: "Свернуть",
    selectColor: "Выберите цвет",
    selectSize: "Выберите размер",
    sizeLabel: "Размер",
    ageLabel: "Возраст",
    phoneLabel: "Номер телефона",
    phonePlaceholder: "+998 (__) ___-__-__",
    nameLabel: "Ваше имя",
    namePlaceholder: "Введите ваше имя",
    districtLabel: "Район",
    districtPlaceholder: "Выберите район",
    addressLabel: "Адрес",
    addressPlaceholder: "Улица, дом, квартира",
    commentLabel: "Комментарий",
    commentPlaceholder: "Дополнительная информация",
    submitOrder: "Оформить заказ",
    successMessage: "Ваш заказ принят. Наши менеджеры свяжутся с вами в ближайшее время!",
    closeButton: "Закрыть",
    priceLabel: "сум",
    sizeGuide: "Таблица размеров",
  },
  en: {
    orderButton: "Order Now",
    expandDetails: "More Details",
    collapseDetails: "Collapse",
    selectColor: "Select Color",
    selectSize: "Select Size",
    sizeLabel: "Size",
    ageLabel: "Age",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+998 (__) ___-__-__",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",
    districtLabel: "District",
    districtPlaceholder: "Select district",
    addressLabel: "Address",
    addressPlaceholder: "Street, house, apartment",
    commentLabel: "Comment",
    commentPlaceholder: "Additional information",
    submitOrder: "Submit Order",
    successMessage: "Your order has been received. Our managers will contact you soon!",
    closeButton: "Close",
    priceLabel: "UZS",
    sizeGuide: "Size Guide",
  },
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  language,
  setLanguage,
}: {
  children: ReactNode
  language: Language
  setLanguage: (lang: Language) => void
}) {
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
