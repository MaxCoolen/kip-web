import { useLanguage } from '../context/LanguageContext'
import { footer } from '../i18n/translations'

export default function Footer() {
  const year = new Date().getFullYear()
  const { lang } = useLanguage()
  const tx = footer[lang]

  return (
    <footer className="relative bg-soot-950 border-t border-cream-50/5 py-12">
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(234,88,12,0.15) 8px, rgba(234,88,12,0.15) 16px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img src="/logo-icon.png" alt="Kip 'N Grill" className="h-8 w-auto opacity-40" />
            <div className="h-4 w-px bg-cream-50/10" />
            <span className="font-mono text-xs text-cream-50/20 tracking-wider">
              &copy; {year} KIP 'N GRILL
            </span>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="font-mono text-xs tracking-wider text-cream-50/20 hover:text-ember-400 transition-colors duration-300">
              {tx.privacy}
            </a>
            <a href="#" className="font-mono text-xs tracking-wider text-cream-50/20 hover:text-ember-400 transition-colors duration-300">
              {tx.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
