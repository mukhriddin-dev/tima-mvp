"use client"

import { useState, memo, useCallback } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { StructuredDescription } from "@/types/product"

type DescriptionStep = "general" | "fabric" | "quality"

interface ProductDescriptionProps {
  description: StructuredDescription
}

const tabLabels: Record<DescriptionStep, { uz: string; ru: string; en: string }> = {
  general: { uz: "Umumiy", ru: "Общее", en: "Overview" },
  fabric: { uz: "Mato", ru: "Ткань", en: "Fabric" },
  quality: { uz: "Sifat va tikilish", ru: "Качество и пошив", en: "Quality & stitching" },
}

const steps: DescriptionStep[] = ["general", "fabric", "quality"]

export const ProductDescription = memo(function ProductDescription({ description }: ProductDescriptionProps) {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState<DescriptionStep>("general")

  const handleStepChange = useCallback((step: DescriptionStep) => {
    setActiveStep(step)
  }, [])

  const activeIndex = steps.indexOf(activeStep)

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4 md:space-y-5">
      <div className="relative flex p-[3px] bg-[#e8e8ed] rounded-full">
        {/* Sliding active indicator - black pill */}
        <div
          className="absolute top-[3px] bottom-[3px] bg-black rounded-full shadow-sm transition-transform duration-200 ease-out"
          style={{
            width: `calc((100% - 6px) / 3)`,
            transform: `translateX(calc(${activeIndex} * 100%))`,
          }}
        />

        {steps.map((step) => (
          <button
            key={step}
            onClick={() => handleStepChange(step)}
            className={`
              relative flex-1 py-2.5 md:py-3 px-2 min-h-[44px]
              text-[13px] md:text-[14px] font-medium
              rounded-full z-10
              transition-colors duration-200 ease-out
              ${activeStep === step ? "text-white" : "text-[#3c3c43]/60 active:text-[#3c3c43]"}
            `}
          >
            {tabLabels[step][language]}
          </button>
        ))}
      </div>

      <div className="relative bg-white rounded-[16px] md:rounded-[20px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-4 md:p-5 min-h-[100px] md:min-h-[120px]">
        {steps.map((step) => (
          <div
            key={step}
            className={`
              transition-all duration-200 ease-out
              ${
                activeStep === step
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2 absolute inset-4 md:inset-5 pointer-events-none"
              }
            `}
          >
            {activeStep === step && (
              <p className="text-[14px] md:text-[16px] text-[#3c3c43] leading-[1.5] md:leading-[1.6]">
                {description[step][language]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
})
