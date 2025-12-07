"use client"

import { memo, useState } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { SizeGuideModal } from "@/components/size-guide-modal"
import { ColorSelector } from "@/components/color-selector"
import { SizeSelector } from "@/components/size-selector"
import type { ProductColor, ProductSize } from "@/types/product"

interface FixedBottomControlsProps {
  colors: ProductColor[]
  selectedColorId: string
  onColorChange: (colorId: string) => void
  sizes: ProductSize[]
  selectedSize: number | null
  onSizeChange: (size: number) => void
  onOrderClick: () => void
  sizeRangeId?: string
  showColorSizePanel?: boolean
}

export const FixedBottomControls = memo(function FixedBottomControls({
  colors,
  selectedColorId,
  onColorChange,
  sizes,
  selectedSize,
  onSizeChange,
  onOrderClick,
  sizeRangeId,
  showColorSizePanel = false,
}: FixedBottomControlsProps) {
  const { t } = useLanguage()
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 ios-blur border-t border-foreground/8 pointer-events-auto"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-lg mx-auto px-4 md:px-5 py-4 space-y-3">
          <motion.div
            animate={{
              opacity: showColorSizePanel ? 1 : 0,
              height: showColorSizePanel ? "auto" : 0,
              marginBottom: showColorSizePanel ? 12 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Color selector row */}
            <div className="space-y-2 mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t.selectColor}
              </span>
              <ColorSelector colors={colors} selectedColorId={selectedColorId} onColorChange={onColorChange} />
            </div>

            {/* Size selector row */}
            <div className="mb-3">
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSizeChange={onSizeChange}
                sizeRangeId={sizeRangeId}
              />
            </div>
          </motion.div>

          <motion.button
            onClick={onOrderClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="
              w-full py-4
              bg-foreground text-background 
              font-semibold text-base tracking-tight
              rounded-2xl
              shadow-sm
              ios-press
              transition-all duration-200
              active:shadow-none
            "
          >
            {t.orderButton}
          </motion.button>
        </div>
      </motion.div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        currentRangeId={sizeRangeId}
        lang={undefined}
      />
    </>
  )
})
