"use client"

import type React from "react"
import { memo, useRef, useCallback, useEffect } from "react"

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
  const touchStartY = useRef(0)
  const touchEndY = useRef(0)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const userInteractedRef = useRef(false)

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        if (!userInteractedRef.current) {
          onSlideChange(currentSlide < images.length - 1 ? currentSlide + 1 : 0)
        }
      }, 10000)
    }

    startAutoPlay()

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentSlide, images.length, onSlideChange])

  // Reset user interaction flag after 5 seconds
  useEffect(() => {
    if (userInteractedRef.current) {
      const timeout = setTimeout(() => {
        userInteractedRef.current = false
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [currentSlide])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    userInteractedRef.current = true
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartY.current - touchEndY.current
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
    <div className="relative h-full overflow-hidden bg-muted/30">
      <div
        className="flex flex-col h-full"
        style={{
          transform: `translateY(-${currentSlide * 100}%)`,
          transition: "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {images.map((image, index) => (
          <div key={`${image}-${index}`} className="min-h-full w-full flex-shrink-0 p-3 md:p-4">
            <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden bg-secondary/50">
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            </div>
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <div className="absolute right-5 md:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                userInteractedRef.current = true
                onSlideChange(index)
              }}
              className={`
                w-2 rounded-full transition-all duration-300 ease-out
                ${
                  index === currentSlide ? "bg-foreground h-6 shadow-sm" : "bg-foreground/25 h-2 hover:bg-foreground/40"
                }
              `}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
    </div>
  )
})
