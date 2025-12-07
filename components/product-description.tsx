"use client"

import { useState, memo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { StructuredDescription } from "@/types/product"

type DescriptionStep = "general" | "fabric"

interface ProductDescriptionProps {
  description: StructuredDescription
}

const tabLabels: Record<DescriptionStep, { uz: string; ru: string; en: string }> = {
  general: { uz: "Umumiy", ru: "Общее", en: "Overview" },
  fabric: { uz: "Mato va xususiyatlar", ru: "Ткань и характеристики", en: "Fabric & Details" },
}

const steps: DescriptionStep[] = ["general", "fabric"]

export const ProductDescription = memo(function ProductDescription({ description }: ProductDescriptionProps) {
  const { language, t } = useLanguage()
  const [activeStep, setActiveStep] = useState<DescriptionStep>("general")
  const [isExpanded, setIsExpanded] = useState(false)

  const handleStepChange = useCallback((step: DescriptionStep) => {
    setActiveStep(step)
  }, [])

  const activeIndex = steps.indexOf(activeStep)

  return (
    <div className="w-full space-y-4">
      <div className="relative flex p-[3px] bg-secondary rounded-full">
        <div
          className="absolute top-[3px] bottom-[3px] bg-foreground rounded-full shadow-sm transition-transform duration-200 ease-out"
          style={{
            width: `calc((100% - 6px) / 2)`,
            transform: `translateX(calc(${activeIndex} * 100%))`,
          }}
        />

        {steps.map((step) => (
          <button
            key={step}
            onClick={() => handleStepChange(step)}
            className={`
              relative flex-1 py-2 px-2 min-h-[40px]
              text-xs md:text-sm font-medium
              rounded-full z-10
              transition-colors duration-200 ease-out
              ${activeStep === step ? "text-background" : "text-muted-foreground hover:text-foreground"}
            `}
          >
            {tabLabels[step][language]}
          </button>
        ))}
      </div>

      {/* Description content - expandable on mobile */}
      <div className="relative">
        <motion.div
          initial={{ height: "auto" }}
          animate={{ height: isExpanded ? "auto" : "60px" }}
          className="overflow-hidden"
        >
          <div className="relative bg-transparent rounded-lg p-0 min-h-[60px]">
            {steps.map((step) => (
              <AnimatePresence key={step} mode="wait">
                {activeStep === step && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                  >
                    <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                      {description[step][language]}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            ))}
          </div>
        </motion.div>

        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent" />
        )}
      </div>

      {/* Expand/collapse toggle */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4" />
        </motion.span>
        {isExpanded ? t.less : t.more}
      </button>
    </div>
  )
})
