import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { nav } from '../i18n/translations'

function LangButton() {
  const { lang, setLang } = useLanguage()
  const next = lang === 'nl' ? 'en' : 'nl'

  return (
    <button
      onClick={() => setLang(next)}
      className="flex items-center gap-1.5 px-3 py-1.5 border border-cream-50/10 hover:border-ember-500/40 transition-all duration-300 group"
      aria-label={`Switch to ${next === 'en' ? 'English' : 'Nederlands'}`}
    >
      <span className="text-base leading-none select-none">
        {lang === 'nl' ? '🇳🇱' : '🇬🇧'}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-cream-50/40 group-hover:text-ember-400 transition-colors duration-300">
        {lang.toUpperCase()}
      </span>
    </button>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { lang, setLang } = useLanguage()
  const navLinks = nav[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-soot-950/90 backdrop-blur-xl shadow-[0_1px_0_rgba(234,88,12,0.15)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div
          className="flex items-center justify-between"
          style={{ height: scrolled ? '64px' : '80px', transition: 'height 0.5s' }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <img
              src="/logo-icon.png"
              alt="Kip 'N Grill"
              className="h-9 sm:h-11 w-auto transition-transform duration-300 group-hover:rotate-[-5deg]"
            />
            <span className="font-display text-2xl sm:text-3xl text-cream-50 tracking-[0.05em]">
              KIP 'N GRILL
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-display text-[15px] tracking-[0.2em] text-cream-50/60 hover:text-ember-400 transition-colors duration-300 py-1
                  after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-ember-500
                  after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <LangButton />
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <LangButton />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-cream-50/80 hover:text-ember-400 p-2 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-soot-950/95 backdrop-blur-xl border-t border-ember-500/10 px-5 py-6 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block font-display text-xl tracking-[0.15em] text-cream-50/60 hover:text-ember-400 hover:translate-x-2 transition-all duration-300 py-3 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          {/* Mobile language switcher */}
          <div className="pt-3 flex items-center gap-3">
            {(['nl', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => { setLang(l); setMobileOpen(false) }}
                className={`flex items-center gap-1.5 px-3 py-2 border transition-all duration-200 ${
                  lang === l
                    ? 'border-ember-500/40 text-ember-400'
                    : 'border-cream-50/10 text-cream-50/30 hover:text-cream-50/60'
                }`}
              >
                <span className="text-base">{l === 'nl' ? '🇳🇱' : '🇬🇧'}</span>
                <span className="font-mono text-[10px] tracking-[0.2em]">{l.toUpperCase()}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
