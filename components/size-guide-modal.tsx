"use client"

import type React from "react"
import { memo, useCallback, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { sizeGuides, type SizeGuide } from "@/data/size-guides"
import type { Language } from "@/types/product"

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
  currentRangeId?: string
  lang: Language
}

const modalStrings = {
  title: {
    uz: "O'lcham bo'yicha qo'llanma",
    ru: "Руководство по размерам",
    en: "Size Guide",
  },
} as const

export const SizeGuideModal = memo(function SizeGuideModal({
  isOpen,
  onClose,
  currentRangeId,
  lang,
}: SizeGuideModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number>(0)
  const currentY = useRef<number>(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    currentY.current = e.touches[0].clientY
    const diff = currentY.current - startY.current
    if (diff > 0 && modalRef.current) {
      modalRef.current.style.transform = `translateY(${diff}px)`
      modalRef.current.style.transition = "none"
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    const diff = currentY.current - startY.current
    if (modalRef.current) {
      modalRef.current.style.transition = "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)"
      if (diff > 100) {
        onClose()
      } else {
        modalRef.current.style.transform = "translateY(0)"
      }
    }
    startY.current = 0
    currentY.current = 0
  }, [onClose])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/35 ios-blur animate-ios-fade-in" onClick={onClose} aria-hidden="true" />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="size-guide-title"
        className="
          relative w-full max-w-lg md:max-w-xl 
          bg-background rounded-t-[28px] 
          shadow-2xl shadow-black/15
          animate-ios-slide-up
        "
        style={{ maxHeight: "85vh" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-[5px] rounded-full bg-muted-foreground/25" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-foreground/6">
          <h2 id="size-guide-title" className="text-[17px] font-semibold text-foreground">
            {modalStrings.title[lang]}
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 rounded-full hover:bg-secondary active:bg-secondary/80 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-muted-foreground" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto px-5 py-4 space-y-3 overscroll-contain"
          style={{ maxHeight: "calc(85vh - 80px)" }}
        >
          {sizeGuides.map((guide) => (
            <SizeGuideCard key={guide.id} guide={guide} lang={lang} isHighlighted={guide.id === currentRangeId} />
          ))}
        </div>

        {/* Safe area padding */}
        <div className="pb-safe" />
      </div>
    </div>
  )
})

const SizeGuideCard = memo(function SizeGuideCard({
  guide,
  lang,
  isHighlighted,
}: {
  guide: SizeGuide
  lang: Language
  isHighlighted: boolean
}) {
  return (
    <div
      className={`
        rounded-2xl p-4 transition-all duration-200
        ${isHighlighted ? "bg-foreground/5 ring-1 ring-foreground/15 shadow-md" : "bg-secondary/50"}
      `}
    >
      <h3 className="text-[15px] font-bold text-foreground mb-1">{guide.title[lang]}</h3>
      <p className="text-[13px] text-muted-foreground mb-3 leading-relaxed">{guide.description[lang]}</p>
      <ul className="space-y-1.5">
        {guide.ranges.map((range, idx) => (
          <li key={idx} className="text-[13px] text-foreground flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-foreground/30" />
            {range[lang]}
          </li>
        ))}
      </ul>
    </div>
  )
})
