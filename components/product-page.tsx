"use client"
import { memo, useState, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ImageCarousel } from "@/components/image-carousel"
import { ProductInfo } from "@/components/product-info"
import { DetailsRow } from "@/components/details-row"
import { ProductDescription } from "@/components/product-description"
import { ColorSelector } from "@/components/color-selector"
import { SizeSelector } from "@/components/size-selector"
import type { Product, ProductColor, ProductSize } from "@/types/product"
import { motion, AnimatePresence } from "framer-motion"

interface ProductPageProps {
  product: Product
  selectedColorId: string
  selectedColor: ProductColor
  selectedSize: number | null
  selectedSizeData: ProductSize | undefined
  images: string[]
  currentSlide: number
  onColorChange: (colorId: string) => void
  onSizeChange: (size: number) => void
  onSlideChange: (index: number) => void
  onOrderClick: () => void
}

export const ProductPage = memo(function ProductPage({
  product,
  selectedColorId,
  selectedColor,
  selectedSize,
  selectedSizeData,
  images,
  currentSlide,
  onColorChange,
  onSizeChange,
  onSlideChange,
  onOrderClick,
}: ProductPageProps) {
  const { language, t } = useLanguage()
  const [isDescriptionSheetOpen, setIsDescriptionSheetOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="min-h-dvh pb-32 md:pb-36 overflow-y-auto overscroll-contain"
        style={{ paddingTop: "calc(44px + env(safe-area-inset-top))" }}
      >
        <div className="max-w-lg mx-auto">
          {/* Image carousel - 60% of viewport height */}
          <div className="h-[60vh] md:h-[55vh] min-h-[350px] md:min-h-[400px]">
            <ImageCarousel
              images={images}
              productName={product.name[language]}
              currentSlide={currentSlide}
              onSlideChange={onSlideChange}
            />
          </div>

          <div className="px-5 md:px-6 py-6 md:py-7 space-y-4">
            {/* Product title and price */}
            <ProductInfo name={product.name} price={product.price} currency={product.currency} />

            {/* Short description preview */}
            <p className="text-sm md:text-base text-foreground/70 leading-relaxed line-clamp-2">
              {product.description.general[language]}
            </p>

            <DetailsRow onDetailsClick={() => setIsDescriptionSheetOpen(true)} />

            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {t.selectColor}
              </span>
              <ColorSelector colors={product.colors} selectedColorId={selectedColorId} onColorChange={onColorChange} />
            </div>

            <div className="space-y-2">
              <SizeSelector
                sizes={product.sizes}
                selectedSize={selectedSize}
                onSizeChange={onSizeChange}
                sizeRangeId={product.sizeRangeId}
              />
            </div>

            {/* Padding for bottom bar clearance */}
            <div className="h-6" />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 ios-blur border-t border-foreground/8 pointer-events-auto"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="max-w-lg mx-auto px-5 md:px-6 py-4">
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

      <AnimatePresence>
        {isDescriptionSheetOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsDescriptionSheetOpen(false)}
              style={{ top: "env(safe-area-inset-top)" }}
            />

            {/* Bottom sheet */}
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
                mass: 0.8,
              }}
              className="fixed bottom-0 left-0 right-0 z-40 bg-background rounded-t-3xl shadow-2xl shadow-black/20 pointer-events-auto"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
            >
              <div className="max-w-lg mx-auto flex flex-col h-[90vh]">
                {/* iOS-style drag handle */}
                <div className="flex justify-center pt-3 pb-4 flex-shrink-0">
                  <div className="w-9 h-1 rounded-full bg-muted-foreground/25" />
                </div>

                {/* Scrollable content area */}
                <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-24 space-y-6">
                  {/* Description header */}
                  <div>
                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                      {t.description}
                    </h2>
                    <ProductDescription description={product.description} />
                  </div>

                  {/* Color selector in sheet */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {t.selectColor}
                    </span>
                    <ColorSelector
                      colors={product.colors}
                      selectedColorId={selectedColorId}
                      onColorChange={onColorChange}
                    />
                  </div>

                  {/* Size selector in sheet */}
                  <div>
                    <SizeSelector
                      sizes={product.sizes}
                      selectedSize={selectedSize}
                      onSizeChange={onSizeChange}
                      sizeRangeId={product.sizeRangeId}
                    />
                  </div>
                </div>

                <div className="fixed bottom-0 left-0 right-0 z-50 px-5 md:px-6 py-4 border-t border-foreground/8 bg-background/95 backdrop-blur-sm max-w-lg mx-auto">
                  <motion.button
                    onClick={() => {
                      onOrderClick()
                      setIsDescriptionSheetOpen(false)
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      lead-button
                      w-full py-4
                      bg-foreground text-background 
                      font-semibold text-base tracking-tight
                      rounded-2xl
                      shadow-sm
                      transition-all duration-200
                      active:shadow-none
                    "
                    id="lead-button"
                  >
                    {t.orderButton}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})
