"use client"

import { memo, useState, useRef, useEffect } from "react"
import { Globe, Check, ChevronDown } from "lucide-react"
import type { Language } from "@/types/product"

const languages: { id: Language; code: string; name: string }[] = [
  { id: "uz", code: "UZ", name: "O'zbek" },
  { id: "ru", code: "RU", name: "Русский" },
  { id: "en", code: "EN", name: "English" },
]

interface LanguagePickerProps {
  value: Language
  onChange: (lang: Language) => void
}

export const LanguagePicker = memo(function LanguagePicker({ value, onChange }: LanguagePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => l.id === value) || languages[1]

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("touchstart", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [isOpen])

  const handleSelect = (lang: Language) => {
    onChange(lang)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1.5 h-8 px-3 
          bg-secondary/80 hover:bg-secondary 
          rounded-full
          transition-all duration-200
          ios-press
        "
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <Globe className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={1.5} />
        <span className="text-[13px] font-semibold text-foreground tracking-tight">{currentLang.code}</span>
        <ChevronDown
          className={`w-3 h-3 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          strokeWidth={2}
        />
      </button>

      <div
        className={`
          absolute right-0 top-full mt-2
          w-40 bg-background/95 ios-blur rounded-2xl
          border border-border shadow-xl shadow-black/8
          overflow-hidden
          transition-all duration-200 origin-top-right
          ${isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}
        `}
        role="listbox"
        aria-label="Select language"
      >
        {languages.map((lang, index) => (
          <button
            key={lang.id}
            onClick={() => handleSelect(lang.id)}
            className={`
              w-full flex items-center justify-between
              px-4 py-3 text-left
              transition-colors duration-150
              ${value === lang.id ? "bg-secondary" : "hover:bg-secondary/60 active:bg-secondary"}
              ${index < languages.length - 1 ? "border-b border-border/40" : ""}
            `}
            role="option"
            aria-selected={value === lang.id}
          >
            <span className="text-[15px] font-medium text-foreground">{lang.name}</span>
            {value === lang.id && <Check className="w-4 h-4 text-foreground" strokeWidth={2.5} />}
          </button>
        ))}
      </div>
    </div>
  )
})
