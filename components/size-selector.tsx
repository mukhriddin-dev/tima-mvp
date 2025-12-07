"use client"

import { memo, useState } from "react"
import { Ruler } from "lucide-react"
import { motion } from "framer-motion"
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
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.selectSize}</p>
        <button
          onClick={() => setIsSizeGuideOpen(true)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors active:scale-95"
        >
          <Ruler className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium">{t.sizeGuide}</span>
        </button>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {sizes.map((size) => (
          <motion.button
            key={size.value}
            onClick={() => onSizeChange(size.value)}
            className={`
              py-2.5 px-1 rounded-xl font-medium text-xs
              transition-all duration-200
              ${
                selectedSize === size.value
                  ? "bg-foreground text-background shadow-sm"
                  : "bg-secondary text-foreground hover:bg-secondary/80 active:bg-secondary/70"
              }
            `}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
          >
            {size.value} cm
          </motion.button>
        ))}
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        currentRangeId={sizeRangeId}
        lang={language}
      />
    </div>
  )
})
