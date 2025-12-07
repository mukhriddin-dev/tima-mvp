"use client"

import type React from "react"
import { memo, useRef, useCallback, useEffect } from "react"
import { motion } from "framer-motion"

interface ImageCarouselProps {
  images: string[]
  productName: string
  currentSlide: number
  onSlideChange: (index: number) => void
}

export const ImageCarousel = memo(function ImageCarousel({
  images,
  productName,
  currentSlide,
  onSlideChange,
}: ImageCarouselProps) {
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const userInteractedRef = useRef(false)

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!userInteractedRef.current) {
          onSlideChange(currentSlide < images.length - 1 ? currentSlide + 1 : 0)
        }
      }, 8000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentSlide, images.length, onSlideChange])

  useEffect(() => {
    if (userInteractedRef.current) {
      const timeout = setTimeout(() => {
        userInteractedRef.current = false
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [currentSlide])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    userInteractedRef.current = true
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current
    const threshold = 50

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && currentSlide < images.length - 1) {
        onSlideChange(currentSlide + 1)
      } else if (diff < 0 && currentSlide > 0) {
        onSlideChange(currentSlide - 1)
      }
    }
  }, [currentSlide, images.length, onSlideChange])

  return (
    <div className="relative w-full h-full overflow-hidden bg-secondary/30">
      <motion.div
        className="flex h-full"
        animate={{ x: -currentSlide * 100 + "%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="min-h-full w-full flex-shrink-0 p-3 md:p-4">
            <motion.div
              className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-secondary/50"
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </motion.div>
          </div>
        ))}
      </motion.div>

      {images.length > 1 && (
        <div className="absolute inset-x-0 bottom-4 md:bottom-6 flex justify-center gap-1.5 pointer-events-none">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                userInteractedRef.current = true
                onSlideChange(index)
              }}
              className="pointer-events-auto transition-all duration-300 ease-out bg-foreground/25 hover:bg-foreground/40 rounded-full"
              animate={{
                width: index === currentSlide ? "24px" : "8px",
                height: "8px",
                backgroundColor: index === currentSlide ? "rgb(17, 17, 17)" : "rgba(17, 17, 17, 0.25)",
              }}
              transition={{ duration: 0.3 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Gradient overlay at top to fade into header */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-background/40 to-transparent pointer-events-none" />
    </div>
  )
})
