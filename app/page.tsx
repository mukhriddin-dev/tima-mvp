"use client"

import { Suspense, useState, useCallback } from "react"
import { Header } from "@/components/header"
import { ProductPage } from "@/components/product-page"
import { OrderModal } from "@/components/order-modal"
import { LanguageProvider } from "@/contexts/language-context"
import { useProductState } from "@/hooks/use-product-state"

function ProductApp() {
  const {
    product,
    selectedColorId,
    selectedColor,
    selectedSize,
    selectedSizeData,
    language,
    currentSlide,
    images,
    setColorId,
    setSize,
    setLanguage,
    setSlide,
  } = useProductState()

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false)

  const handleOrderClick = useCallback(() => {
    setIsOrderModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsOrderModalOpen(false)
  }, [])

  const currentImageUrl = images[currentSlide] || images[0] || ""

  return (
    <LanguageProvider language={language} setLanguage={setLanguage}>
      <div className="min-h-dvh w-full bg-background">
        <main className="relative w-full max-w-md md:max-w-lg mx-auto min-h-dvh bg-background">
          <Header />
          <ProductPage
            product={product}
            selectedColorId={selectedColorId}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedSizeData={selectedSizeData}
            images={images}
            currentSlide={currentSlide}
            onColorChange={setColorId}
            onSizeChange={setSize}
            onSlideChange={setSlide}
            onOrderClick={handleOrderClick}
          />
          <OrderModal
            isOpen={isOrderModalOpen}
            onClose={handleCloseModal}
            product={product}
            selectedColor={selectedColor}
            selectedSizeData={selectedSizeData}
            currentImageUrl={currentImageUrl}
          />
        </main>
      </div>
    </LanguageProvider>
  )
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh w-full bg-background">
          <main className="w-full max-w-md md:max-w-lg mx-auto min-h-dvh bg-background flex items-center justify-center">
            <div className="w-8 h-8 border-[2.5px] border-muted-foreground/20 border-t-foreground rounded-full animate-spin" />
          </main>
        </div>
      }
    >
      <ProductApp />
    </Suspense>
  )
}
