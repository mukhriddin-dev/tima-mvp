"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { products, getDefaultProduct } from "@/data/products"
import type { Language, Product } from "@/types/product"

export function useProductState() {
  const searchParams = useSearchParams()
  const router = useRouter()

  // Parse initial state from URL
  const initialProduct = useMemo(() => {
    const productParam = searchParams.get("product")
    return products.find((p) => p.slug === productParam || p.id === productParam) || getDefaultProduct()
  }, [searchParams])

  const initialColorId = searchParams.get("color") || initialProduct.colors[0].id
  const initialSize = searchParams.get("size") ? Number(searchParams.get("size")) : 110
  const initialLang = (searchParams.get("lang") as Language) || "ru"
  const initialSlide = searchParams.get("slide") ? Number(searchParams.get("slide")) : 0

  const [product, setProduct] = useState<Product>(initialProduct)
  const [selectedColorId, setSelectedColorId] = useState(initialColorId)
  const [selectedSize, setSelectedSize] = useState(initialSize)
  const [language, setLanguage] = useState<Language>(initialLang)
  const [currentSlide, setCurrentSlide] = useState(initialSlide)

  // Get derived state
  const selectedColor = useMemo(
    () => product.colors.find((c) => c.id === selectedColorId) || product.colors[0],
    [product.colors, selectedColorId],
  )

  const selectedSizeData = useMemo(
    () => product.sizes.find((s) => s.value === selectedSize),
    [product.sizes, selectedSize],
  )

  // Get images based on color and size
  const images = useMemo(() => {
    if (selectedColor.sizeImages && selectedSize && selectedColor.sizeImages[String(selectedSize)]) {
      return selectedColor.sizeImages[String(selectedSize)]
    }
    return selectedColor.images
  }, [selectedColor, selectedSize])

  // Update URL when state changes
  const updateUrl = useCallback(
    (updates: { color?: string; size?: number; lang?: Language; slide?: number; product?: string }) => {
      const params = new URLSearchParams(searchParams.toString())

      if (updates.product !== undefined) params.set("product", updates.product)
      if (updates.color !== undefined) params.set("color", updates.color)
      if (updates.size !== undefined) params.set("size", String(updates.size))
      if (updates.lang !== undefined) params.set("lang", updates.lang)
      if (updates.slide !== undefined) params.set("slide", String(updates.slide))

      router.replace(`?${params.toString()}`, { scroll: false })
    },
    [router, searchParams],
  )

  // State setters with URL sync
  const handleColorChange = useCallback(
    (colorId: string) => {
      setSelectedColorId(colorId)
      setCurrentSlide(0) // Reset slide on color change
      updateUrl({ color: colorId, slide: 0 })
    },
    [updateUrl],
  )

  const handleSizeChange = useCallback(
    (size: number) => {
      setSelectedSize(size)
      // Check if size-specific images exist
      const color = product.colors.find((c) => c.id === selectedColorId)
      if (color?.sizeImages?.[String(size)]) {
        setCurrentSlide(0)
        updateUrl({ size, slide: 0 })
      } else {
        updateUrl({ size })
      }
    },
    [updateUrl, product.colors, selectedColorId],
  )

  const handleLanguageChange = useCallback(
    (lang: Language) => {
      setLanguage(lang)
      updateUrl({ lang })
    },
    [updateUrl],
  )

  const handleSlideChange = useCallback(
    (slide: number) => {
      setCurrentSlide(slide)
      updateUrl({ slide })
    },
    [updateUrl],
  )

  // Initialize URL params on mount if missing
  useEffect(() => {
    const hasParams = searchParams.has("product") || searchParams.has("color")
    if (!hasParams) {
      updateUrl({
        product: product.slug,
        color: selectedColorId,
        size: selectedSize,
        lang: language,
        slide: currentSlide,
      })
    }
  }, []) // Only run on mount

  return {
    product,
    selectedColorId,
    selectedColor,
    selectedSize,
    selectedSizeData,
    language,
    currentSlide,
    images,
    setColorId: handleColorChange,
    setSize: handleSizeChange,
    setLanguage: handleLanguageChange,
    setSlide: handleSlideChange,
  }
}
