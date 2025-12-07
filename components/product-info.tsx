"use client"

import { memo } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { LocalizedString } from "@/types/product"

interface ProductInfoProps {
  name: LocalizedString
  price: number
  currency: string
}

export const ProductInfo = memo(function ProductInfo({ name, price, currency }: ProductInfoProps) {
  const { language, t } = useLanguage()

  // Format price with spaces (e.g., 249000 -> "249 000")
  const formattedPrice = price.toLocaleString("ru-RU").replace(/,/g, " ")

  return (
    <div>
      <h1 className="text-[22px] md:text-2xl font-bold text-foreground tracking-tight">{name[language]}</h1>
      <p className="text-[17px] font-semibold text-foreground mt-1.5">
        {formattedPrice} {t.priceLabel}
      </p>
    </div>
  )
})
