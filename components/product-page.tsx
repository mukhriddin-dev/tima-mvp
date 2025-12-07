"use client"

import { memo } from "react"
import { useLanguage } from "@/contexts/language-context"
import { ImageCarousel } from "@/components/image-carousel"
import { ProductDescription } from "@/components/product-description"
import { ProductInfo } from "@/components/product-info"
import { FixedBottomControls } from "@/components/fixed-bottom-controls"
import type { Product, ProductColor, ProductSize } from "@/types/product"

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
  const { language } = useLanguage()

  return (
    <>
      <div
        className="min-h-dvh pb-48 md:pb-52 overflow-y-auto overscroll-none"
        style={{ paddingTop: "calc(44px + env(safe-area-inset-top))" }}
      >
        <div className="max-w-lg mx-auto">
          <div className="h-[70vh] md:h-[65vh] min-h-[400px] md:min-h-[450px]">
            <ImageCarousel
              images={images}
              productName={product.name[language]}
              currentSlide={currentSlide}
              onSlideChange={onSlideChange}
            />
          </div>

          {/* Product Info & Description */}
          <div className="px-5 md:px-6 py-5 md:py-6 space-y-5 md:space-y-6">
            <ProductInfo name={product.name} price={product.price} currency={product.currency} />
            <ProductDescription description={product.description} />
          </div>
        </div>
      </div>

      <FixedBottomControls
        colors={product.colors}
        selectedColorId={selectedColorId}
        onColorChange={onColorChange}
        sizes={product.sizes}
        selectedSize={selectedSize}
        onSizeChange={onSizeChange}
        onOrderClick={onOrderClick}
        sizeRangeId={product.sizeRangeId}
      />
    </>
  )
})
