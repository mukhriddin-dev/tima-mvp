"use client"

import { memo } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import type { ProductColor } from "@/types/product"

interface ColorSelectorProps {
  colors: ProductColor[]
  selectedColorId: string
  onColorChange: (colorId: string) => void
}

export const ColorSelector = memo(function ColorSelector({
  colors,
  selectedColorId,
  onColorChange,
}: ColorSelectorProps) {
  const { language } = useLanguage()

  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => {
        const isSelected = selectedColorId === color.id
        const thumbnailSrc = color.thumbnail || color.images[0]

        return (
          <motion.button
            key={color.id}
            onClick={() => onColorChange(color.id)}
            className={`
              relative w-12 h-12 rounded-lg overflow-hidden 
              transition-all duration-200
              ${
                isSelected
                  ? "ring-2 ring-foreground ring-offset-2 ring-offset-background"
                  : "ring-1 ring-foreground/10 hover:ring-foreground/20"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={color.label[language]}
            aria-pressed={isSelected}
          >
            <img
              src={thumbnailSrc || "/placeholder.svg"}
              alt={color.label[language]}
              className="w-full h-full object-cover"
              loading="eager"
              draggable={false}
            />
            {isSelected && (
              <motion.div
                className="absolute inset-0 rounded-lg pointer-events-none"
                initial={{ boxShadow: "0 0 0 0 rgba(17, 17, 17, 0.3)" }}
                animate={{ boxShadow: "0 0 12px 3px rgba(17, 17, 17, 0.15)" }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              />
            )}
          </motion.button>
        )
      })}
    </div>
  )
})
