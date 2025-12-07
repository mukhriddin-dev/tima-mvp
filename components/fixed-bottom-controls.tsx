"use client"

import { memo, useState } from "react"
import { Ruler, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { SizeGuideModal } from "@/components/size-guide-modal"
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
}: FixedBottomControlsProps) {
  const { language, t } = useLanguage()
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false)

  return (
    <>
      <div
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/80 ios-blur border-t border-foreground/6"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-lg mx-auto">
          {/* Color + Size controls */}
          <div className="px-4 py-3 md:px-5 md:py-4 space-y-3">
            {/* Color selector row */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {t.selectColor}
              </span>
              <div className="flex gap-2">
                {colors.map((color) => {
                  const isSelected = selectedColorId === color.id
                  const thumbnailSrc = color.thumbnail || color.images[0]

                  return (
                    <button
                      key={color.id}
                      onClick={() => onColorChange(color.id)}
                      className={`
                        relative w-11 h-11 md:w-12 md:h-12 rounded-xl overflow-hidden 
                        transition-all duration-200
                        ios-press
                        ${
                          isSelected
                            ? "ring-[2.5px] ring-foreground ring-offset-2 ring-offset-background scale-105"
                            : "ring-1 ring-foreground/10 hover:ring-foreground/20"
                        }
                      `}
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
                      {/* Color accent bar at bottom */}
                      <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: color.hex }} />
                      {/* Selected checkmark overlay */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-foreground/15 flex items-center justify-center">
                          <Check className="w-5 h-5 text-background drop-shadow-md" strokeWidth={3} />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Size selector row */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider shrink-0">
                {t.selectSize}
              </span>
              <div className="flex gap-1.5 flex-wrap flex-1">
                {sizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => onSizeChange(size.value)}
                    className={`
                      px-3 py-1.5 rounded-lg font-semibold text-[13px]
                      transition-all duration-200
                      ios-press
                      ${
                        selectedSize === size.value
                          ? "bg-foreground text-background shadow-sm"
                          : "bg-secondary text-foreground hover:bg-secondary/80"
                      }
                    `}
                  >
                    {size.value}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setIsSizeGuideOpen(true)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary active:bg-secondary/80 transition-colors"
                aria-label={t.sizeGuide}
              >
                <Ruler className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="px-4 md:px-5 pb-3">
            <button
              onClick={onOrderClick}
              className="
                w-full py-3.5 
                bg-foreground text-background 
                font-semibold text-[17px] tracking-tight
                rounded-2xl
                ios-press
                shadow-sm
              "
            >
              {t.orderButton}
            </button>
          </div>
        </div>
      </div>

      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        currentRangeId={sizeRangeId}
        lang={language}
      />
    </>
  )
})
