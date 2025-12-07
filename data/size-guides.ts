import type { Language } from "@/types/product"

export type LocalizedText = Record<Language, string>

export type SizeGuide = {
  id: string
  title: LocalizedText
  description: LocalizedText
  ranges: LocalizedText[]
}

export const sizeGuides: SizeGuide[] = [
  {
    id: "80-120",
    title: {
      uz: "80–120 sm",
      ru: "80–120 см",
      en: "80–120 cm",
    },
    description: {
      uz: "Odatda 1,5 yoshdan 5 yoshgacha bo'lgan bolalar.",
      ru: "Обычно для детей от 1,5 до 5 лет.",
      en: "Usually for children aged 1.5 to 5 years.",
    },
    ranges: [
      {
        uz: "80–90 sm → 1,5–2 yosh",
        ru: "80–90 см → 1,5–2 года",
        en: "80–90 cm → 1.5–2 years",
      },
      {
        uz: "90–100 sm → 2–3 yosh",
        ru: "90–100 см → 2–3 года",
        en: "90–100 cm → 2–3 years",
      },
      {
        uz: "100–110 sm → 3–4 yosh",
        ru: "100–110 см → 3–4 года",
        en: "100–110 cm → 3–4 years",
      },
      {
        uz: "110–120 sm → 4–5 yosh",
        ru: "110–120 см → 4–5 лет",
        en: "110–120 cm → 4–5 years",
      },
    ],
  },
  {
    id: "90-130",
    title: {
      uz: "90–130 sm",
      ru: "90–130 см",
      en: "90–130 cm",
    },
    description: {
      uz: "2 yoshdan 7 yoshgacha bo'lganlar.",
      ru: "Для детей от 2 до 7 лет.",
      en: "For children aged 2 to 7 years.",
    },
    ranges: [
      {
        uz: "90–100 sm → 2–3 yosh",
        ru: "90–100 см → 2–3 года",
        en: "90–100 cm → 2–3 years",
      },
      {
        uz: "100–110 sm → 3–4 yosh",
        ru: "100–110 см → 3–4 года",
        en: "100–110 cm → 3–4 years",
      },
      {
        uz: "110–120 sm → 5–6 yosh",
        ru: "110–120 см → 5–6 лет",
        en: "110–120 cm → 5–6 years",
      },
      {
        uz: "120–130 sm → 6–7 yosh",
        ru: "120–130 см → 6–7 лет",
        en: "120–130 cm → 6–7 years",
      },
    ],
  },
  {
    id: "120-150",
    title: {
      uz: "120–150 sm",
      ru: "120–150 см",
      en: "120–150 cm",
    },
    description: {
      uz: "6 yoshdan 12 yoshgacha.",
      ru: "Для детей от 6 до 12 лет.",
      en: "For children aged 6 to 12 years.",
    },
    ranges: [
      {
        uz: "120–130 sm → 6–7 yosh",
        ru: "120–130 см → 6–7 лет",
        en: "120–130 cm → 6–7 years",
      },
      {
        uz: "130–140 sm → 8–10 yosh",
        ru: "130–140 см → 8–10 лет",
        en: "130–140 cm → 8–10 years",
      },
      {
        uz: "140–150 sm → 10–12 yosh",
        ru: "140–150 см → 10–12 лет",
        en: "140–150 cm → 10–12 years",
      },
    ],
  },
  {
    id: "110-150",
    title: {
      uz: "110–150 sm",
      ru: "110–150 см",
      en: "110–150 cm",
    },
    description: {
      uz: "4,5 yoshdan 12 yoshgacha.",
      ru: "Для детей от 4,5 до 12 лет.",
      en: "For children aged 4.5 to 12 years.",
    },
    ranges: [
      {
        uz: "110–120 sm → 4,5–6 yosh",
        ru: "110–120 см → 4,5–6 лет",
        en: "110–120 cm → 4.5–6 years",
      },
      {
        uz: "120–130 sm → 6–7 yosh",
        ru: "120–130 см → 6–7 лет",
        en: "120–130 cm → 6–7 years",
      },
      {
        uz: "130–140 sm → 8–10 yosh",
        ru: "130–140 см → 8–10 лет",
        en: "130–140 cm → 8–10 years",
      },
      {
        uz: "140–150 sm → 10–12 yosh",
        ru: "140–150 см → 10–12 лет",
        en: "140–150 cm → 10–12 years",
      },
    ],
  },
]

export function getSizeGuideById(id: string): SizeGuide | undefined {
  return sizeGuides.find((guide) => guide.id === id)
}
