"use client"

import { memo } from "react"
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
  const { language, t } = useLanguage()
  const selectedColor = colors.find((c) => c.id === selectedColorId)

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.selectColor}</p>
        {selectedColor && (
          <span className="text-xs font-medium text-foreground">— {selectedColor.label[language]}</span>
        )}
      </div>
      <div className="flex gap-3">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onColorChange(color.id)}
            className={`w-10 h-10 rounded-full transition-all duration-200 ${
              selectedColorId === color.id
                ? "ring-2 ring-foreground ring-offset-2 ring-offset-background scale-110"
                : "ring-1 ring-border"
            }`}
            style={{ backgroundColor: color.hex }}
            aria-label={color.label[language]}
          />
        ))}
      </div>
    </div>
  )
})
