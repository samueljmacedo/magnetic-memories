import { useEffect, useState } from 'react'

export const languages = ['EN', 'PT', 'FR'] as const
export type Language = (typeof languages)[number]

const STORAGE_KEY = 'mm-language'

const readStoredLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return languages.find((language) => language === stored) ?? 'EN'
  } catch {
    return 'EN'
  }
}

/**
 * Keeps the selected language, remembers it between visits and sets the
 * <html lang> attribute. Translating the content comes in a later phase.
 */
export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>(readStoredLanguage)

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase()
    try {
      localStorage.setItem(STORAGE_KEY, language)
    } catch {
      // Storage can be unavailable (private mode); the selection still works.
    }
  }, [language])

  return [language, setLanguage] as const
}
