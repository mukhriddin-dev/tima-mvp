"use client"

import type React from "react"

import { memo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductDescription } from "@/components/product-description"
import type { StructuredDescription } from "@/types/product"

interface DescriptionBottomSheetProps {
  isOpen: boolean
  description: StructuredDescription
}

export const DescriptionBottomSheet = memo(function DescriptionBottomSheet({
  isOpen,
  description,
}: DescriptionBottomSheetProps) {
  // This is a presentational component - parent will manage close state
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
  }, [])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/20 ios-blur pointer-events-auto"
            onClick={handleBackdropClick}
            style={{ top: "env(safe-area-inset-top)" }}
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              mass: 0.8,
            }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-background rounded-t-3xl shadow-2xl shadow-black/15 pointer-events-auto"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="max-w-lg mx-auto">
              <div className="flex justify-center pt-3 pb-4">
                <div className="w-9 h-1 rounded-full bg-muted-foreground/25" />
              </div>

              <div className="px-5 md:px-6 pb-6 max-h-[70vh] overflow-y-auto">
                <ProductDescription description={description} />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
})
