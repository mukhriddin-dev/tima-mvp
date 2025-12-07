"use client"

import { memo } from "react"
import { ChevronRight, Info } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"

interface DetailsRowProps {
  onDetailsClick: () => void
}

export const DetailsRow = memo(function DetailsRow({ onDetailsClick }: DetailsRowProps) {
  const { t } = useLanguage()

  return (
    <motion.button
      onClick={onDetailsClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="
        w-full flex items-center justify-between
        px-4 py-3.5 
        bg-secondary/40 hover:bg-secondary/60 
        rounded-2xl 
        transition-colors duration-200
        active:bg-secondary/80
      "
    >
      <div className="flex items-center gap-2">
        <Info className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-sm font-medium text-foreground">{t.moreDetails}</span>
      </div>
      <ChevronRight className="w-4 h-4 text-muted-foreground" strokeWidth={2} />
    </motion.button>
  )
})
