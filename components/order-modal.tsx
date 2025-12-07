"use client"

import type React from "react"
import { useState, useEffect, useCallback, memo, useRef } from "react"
import { useLanguage } from "@/contexts/language-context"
import { sendOrder } from "@/lib/send-order"
import { X, Check } from "lucide-react"
import type { Product, ProductColor, ProductSize, OrderPayload } from "@/types/product"

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product
  selectedColor: ProductColor
  selectedSizeData: ProductSize | undefined
  currentImageUrl: string
}

const districts = [
  "Bektemir",
  "Chilonzor",
  "Mirobod",
  "Mirzo Ulug'bek",
  "Olmazor",
  "Sergeli",
  "Shayxontohur",
  "Uchtepa",
  "Yakkasaroy",
  "Yunusobod",
  "Yashnaobod",
]

export const OrderModal = memo(function OrderModal({
  isOpen,
  onClose,
  product,
  selectedColor,
  selectedSizeData,
  currentImageUrl,
}: OrderModalProps) {
  const { t, language } = useLanguage()
  const [phone, setPhone] = useState("+998 ")
  const [name, setName] = useState("")
  const [district, setDistrict] = useState("")
  const [address, setAddress] = useState("")
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number>(0)
  const currentY = useRef<number>(0)

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setPhone("+998 ")
        setName("")
        setDistrict("")
        setAddress("")
        setComment("")
        setIsSuccess(false)
        setError(null)
      }, 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const formatPhone = useCallback((value: string) => {
    const rawDigits = value.replace(/\D/g, "")
    let digits = rawDigits
    if (rawDigits.startsWith("998")) {
      digits = rawDigits.slice(3)
    }
    digits = digits.slice(0, 9)

    if (digits.length === 0) return "+998 "
    if (digits.length <= 2) return `+998 (${digits}`
    if (digits.length <= 5) return `+998 (${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 7) return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5)}`
    return `+998 (${digits.slice(0, 2)}) ${digits.slice(2, 5)}-${digits.slice(5, 7)}-${digits.slice(7)}`
  }, [])

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPhone(formatPhone(e.target.value))
    },
    [formatPhone],
  )

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const payload: OrderPayload = {
      productId: product.id,
      productName: product.name[language],
      price: product.price,
      currency: product.currency,
      selectedColorId: selectedColor.id,
      selectedColorLabel: selectedColor.label[language],
      selectedSize: selectedSizeData?.value || 0,
      selectedSizeAgeLabel: selectedSizeData?.ageLabel[language] || "",
      currentImageUrl,
      language,
      customerName: name,
      customerPhone: phone,
      customerDistrict: district,
      customerAddress: address,
      comment,
      timestamp: new Date().toISOString(),
    }

    try {
      const result = await sendOrder(payload)
      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || "An error occurred")
      }
    } catch (err) {
      setError("An error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div
        className={`
          fixed inset-0 bg-black/35 ios-blur z-50 
          transition-opacity duration-300
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
      />

      <div
        ref={modalRef}
        className={`
          fixed bottom-0 left-0 right-0 z-50 
          max-w-md mx-auto 
          bg-background rounded-t-[28px] 
          shadow-2xl shadow-black/15
          transition-transform duration-[400ms]
          ${isOpen ? "translate-y-0" : "translate-y-full"}
        `}
        style={{
          transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
          maxHeight: "85vh",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-[5px] bg-muted-foreground/25 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
        </button>

        <div className="px-6 pb-6 pt-1 max-h-[75vh] overflow-y-auto overscroll-contain">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-foreground rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-background" strokeWidth={2.5} />
              </div>
              <p className="text-foreground font-medium leading-relaxed px-4">{t.successMessage}</p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 bg-secondary text-foreground font-semibold rounded-2xl ios-press"
              >
                {t.closeButton}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.nameLabel}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.namePlaceholder}
                  className="w-full px-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-foreground/15 transition-all text-[16px]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.phoneLabel}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={handlePhoneChange}
                  placeholder={t.phonePlaceholder}
                  className="w-full px-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-foreground/15 transition-all text-[16px]"
                  required
                />
              </div>

              {/* District */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.districtLabel}
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-4 py-3.5 bg-secondary rounded-xl text-foreground focus:ring-2 focus:ring-foreground/15 transition-all appearance-none text-[16px]"
                  required
                >
                  <option value="" disabled className="text-muted-foreground">
                    {t.districtPlaceholder}
                  </option>
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.addressLabel}
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t.addressPlaceholder}
                  className="w-full px-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-foreground/15 transition-all text-[16px]"
                />
              </div>

              {/* Comment */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.commentLabel}
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={t.commentPlaceholder}
                  rows={2}
                  className="w-full px-4 py-3.5 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:ring-2 focus:ring-foreground/15 transition-all resize-none text-[16px]"
                />
              </div>

              {error && <p className="text-sm text-destructive text-center">{error}</p>}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-foreground text-background font-semibold text-[17px] rounded-2xl ios-press disabled:opacity-60 shadow-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <span className="w-5 h-5 border-[2.5px] border-background/30 border-t-background rounded-full animate-spin" />
                  </span>
                ) : (
                  t.submitOrder
                )}
              </button>
            </form>
          )}
        </div>

        {/* Safe area padding */}
        <div className="pb-safe" />
      </div>
    </>
  )
})
