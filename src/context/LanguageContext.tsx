import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'nl' | 'en'

type LanguageContextType = {
  lang: Lang
  setLang: (l: Lang) => void
}

const LanguageContext = createContext<LanguageContextType>({ lang: 'nl', setLang: () => {} })

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    try {
      const stored = localStorage.getItem('lang')
      return stored === 'en' ? 'en' : 'nl'
    } catch {
      return 'nl'
    }
  })

  const setLang = (l: Lang) => {
    setLangState(l)
    try { localStorage.setItem('lang', l) } catch { /* ignore */ }
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
