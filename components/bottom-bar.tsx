"use client"

import { memo } from "react"
import { useLanguage } from "@/contexts/language-context"

interface BottomBarProps {
  onOrderClick: () => void
}

export const BottomBar = memo(function BottomBar({ onOrderClick }: BottomBarProps) {
  const { t } = useLanguage()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-background/95 backdrop-blur-3xl border-t border-border p-4 pb-safe">
      <button
        onClick={onOrderClick}
        className="w-full py-4 bg-foreground text-background font-bold text-base rounded-xl active:scale-[0.98] transition-transform duration-150"
      >
        {t.orderButton}
      </button>
    </div>
  )
})
