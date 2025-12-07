"use client"

import { memo, useState } from "react"
import { Ruler } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SizeGuideModal } from "@/components/size-guide-modal"
import type { ProductSize } from "@/types/product"

interface SizeSelectorProps {
  sizes: ProductSize[]
  selectedSize: number | null
  onSizeChange: (size: number) => void
  sizeRangeId?: string
}

export const SizeSelector = memo(function SizeSelector({
  sizes,
  selectedSize,
  onSizeChange,
  sizeRangeId,
}: SizeSelectorProps) {
  const { language, t } = useLanguage()
  const selectedSizeData = sizes.find((s) => s.value === selectedSize)
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t.selectSize}</p>
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <Ruler className="w-3.5 h-3.5" />
          {t.sizeGuide}
        </button>
      </div>

      {/* Size buttons */}
      <div className="flex gap-2 flex-wrap">
        {sizes.map((size) => (
          <button
            key={size.value}
            onClick={() => onSizeChange(size.value)}
            className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              selectedSize === size.value ? "bg-foreground text-background" : "bg-secondary text-foreground"
            }`}
          >
            {size.value} cm
          </button>
        ))}
      </div>

      {/* Selected size info */}
      {selectedSizeData && (
        <div className="flex gap-4 mt-3 text-sm">
          <span className="text-foreground">
            <span className="text-muted-foreground">{t.sizeLabel}:</span> {selectedSizeData.value} cm
          </span>
          <span className="text-foreground">
            <span className="text-muted-foreground">{t.ageLabel}:</span> {selectedSizeData.ageLabel[language]}
          </span>
        </div>
      )}

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        currentRangeId={sizeRangeId}
        lang={language}
      />
    </div>
  )
})
