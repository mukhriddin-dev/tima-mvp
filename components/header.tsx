"use client"

import { memo, useState, useEffect } from "react"
import { LanguagePicker } from "@/components/language-picker"
import { useLanguage } from "@/contexts/language-context"

export const Header = memo(function Header() {
  const { language, setLanguage } = useLanguage()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 
        max-w-md md:max-w-lg mx-auto
        transition-all duration-300 ease-out
        ${scrolled ? "bg-background/95 ios-blur" : "bg-background/60 backdrop-blur-md"}
      `}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex items-center justify-between h-11 px-4">
        {/* Left spacer for symmetry */}
        <div className="w-20" />

        {/* Center: Logo - iOS style centered title */}
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="tima" className="h-10 object-contain" draggable={false} />
        </div>

        {/* Right: Language picker */}
        <LanguagePicker value={language} onChange={setLanguage} />
      </div>

      <div
        className={`
          h-[0.5px] w-full transition-opacity duration-300
          bg-foreground/8
          ${scrolled ? "opacity-100" : "opacity-0"}
        `}
      />
    </header>
  )
})
