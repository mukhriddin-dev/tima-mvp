"use client"

import { memo } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { LocalizedString } from "@/types/product"
import { Info } from "lucide-react"
import { motion } from "framer-motion"

interface ProductInfoProps {
  name: LocalizedString
  price: number
  currency: string
  onDetailsClick?: () => void
}

export const ProductInfo = memo(function ProductInfo({ name, price, currency, onDetailsClick }: ProductInfoProps) {
  const { language, t } = useLanguage()

  const formattedPrice = price.toLocaleString("ru-RU").replace(/,/g, " ")

  return (
    <div className="space-y-2">
      <h1 className="text-[22px] md:text-2xl font-bold text-foreground tracking-tight">{name[language]}</h1>
      <p className="text-[17px] font-semibold text-foreground">
        {formattedPrice} {t.priceLabel}
      </p>
      {onDetailsClick && (
        <motion.button
          onClick={onDetailsClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary/60 hover:bg-secondary/80 transition-colors flex items-center justify-center mt-1"
          aria-label={t.moreDetails || "More details"}
        >
          <Info className="w-5 h-5 text-foreground/70" strokeWidth={1.5} />
        </motion.button>
      )}
    </div>
  )
})
