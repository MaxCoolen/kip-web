import { useState } from 'react'
import { Flame, UtensilsCrossed, Truck, ShieldCheck, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'
import { about } from '../i18n/translations'

const featureIcons = [Flame, UtensilsCrossed, Truck, ShieldCheck]
const featureAccents = [
  { accent: 'from-ember-500 to-ember-600', accentText: undefined },
  { accent: 'from-ember-400 to-ember-500', accentText: undefined },
  { accent: 'from-ember-300 to-ember-400', accentText: undefined },
  { accent: 'from-green-600 to-emerald-500', accentText: 'text-green-400' },
]

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { lang } = useLanguage()
  const tx = about[lang]

  return (
    <section id="over-ons" className="relative bg-soot-900 py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,251,235,1) 20px, rgba(255,251,235,1) 21px)',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
              {tx.label}
            </span>
            <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 leading-[0.9] tracking-wide transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              {tx.heading1}
              <br />
              <span className="text-ember-500">{tx.heading2}</span> {tx.heading3}
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className={`font-serif text-xl sm:text-2xl text-cream-100/70 leading-relaxed max-w-lg transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {tx.body}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {tx.features.map((feature, i) => {
            const Icon = featureIcons[i]
            const { accent, accentText } = featureAccents[i]
            const isOpen = openIndex === i
            return (
              <div
                key={feature.title}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className={`group relative p-6 lg:p-8 border-cream-50/5 bg-soot-800/30
                  hover:bg-soot-700/40 transition-all duration-500 cursor-pointer lg:cursor-default
                  border lg:border-y lg:border-r lg:first:border-l
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${0.5 + i * 0.15}s` }}
              >
                <div className={`absolute top-0 left-0 w-10 h-[2px] bg-gradient-to-r ${accent} transition-all duration-500 group-hover:w-full`} />

                <div className={`mb-5 transition-colors duration-300 ${
                  accentText
                    ? 'text-green-400/60 group-hover:text-green-400'
                    : 'text-ember-500/60 group-hover:text-ember-400'
                }`}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-display text-xl lg:text-2xl text-cream-50 tracking-wide leading-tight">
                    {feature.title.toUpperCase()}
                  </h3>
                  <ChevronDown
                    size={16}
                    strokeWidth={1.5}
                    className={`shrink-0 mt-1 text-cream-50/30 transition-transform duration-300 lg:hidden ${isOpen ? 'rotate-180 text-ember-400' : ''}`}
                  />
                </div>

                <div className={`overflow-hidden transition-all duration-300 lg:block ${isOpen ? 'max-h-96' : 'max-h-0 lg:max-h-none'}`}>
                  <p className="font-serif text-cream-100/65 text-base leading-relaxed group-hover:text-cream-100/85 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
