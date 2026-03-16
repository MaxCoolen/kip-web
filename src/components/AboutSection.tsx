import { useState } from 'react'
import { Flame, UtensilsCrossed, Truck, ShieldCheck, ChevronDown } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const features = [
  {
    icon: Flame,
    title: 'Vers van de grill',
    description: 'Onze kippen worden de hele dag vers gegrild op het spit voor de perfecte smaak.',
    accent: 'from-ember-500 to-ember-600',
    accentText: undefined,
  },
  {
    icon: UtensilsCrossed,
    title: '100% biologische vrije uitloopkippen',
    description: 'Bij Kip \'N Grill draait alles om kwaliteit en smaak. Onze kippen zijn biologisch, 100% anti biotica vrij en afkomstig van vrije uitloop, waardoor ze een eerlijke en volle smaak hebben.',
    accent: 'from-ember-400 to-ember-500',
    accentText: undefined,
  },
  {
    icon: Truck,
    title: 'Op locatie',
    description: 'Vind ons op markten, festivals of binnekort op jouw feest of evenement!',
    accent: 'from-ember-300 to-ember-400',
    accentText: undefined,
  },  {
    icon: ShieldCheck,
    title: '100% Halal',
    description: 'Al onze producten zijn 100% halal gecertificeerd. Wij werken uitsluitend met gecertificeerde leveranciers zodat iedereen met een gerust hart kan genieten.',
    accent: 'from-green-600 to-emerald-500',
    accentText: 'text-green-400',
  },
]

export default function AboutSection() {
  const { ref, isVisible } = useScrollReveal()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="over-ons" className="relative bg-soot-900 py-24 sm:py-32 overflow-hidden">
      {/* Background texture: subtle diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,251,235,1) 20px, rgba(255,251,235,1) 21px)',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header — asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
              // Over ons
            </span>
            <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 leading-[0.9] tracking-wide transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              DE LEKKERSTE
              <br />
              <span className="text-ember-500">KIP</span> VAN
              <br />
              HET SPIT
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className={`font-serif text-xl sm:text-2xl text-cream-100/70 leading-relaxed max-w-lg transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Kip 'N Grill is een foodtruck gespecialiseerd in vers gegrilde kip van het spit.
              Van hele kippen tot loaded chicken broodjes en wings — alles vers van de grill.
              Altijd bereid met passie, altijd met de beste ingrediënten.
            </p>
          </div>
        </div>

        {/* Feature cards — 4 columns side by side from lg */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {features.map((feature, i) => {
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
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 w-10 h-[2px] bg-gradient-to-r ${feature.accent} transition-all duration-500 group-hover:w-full`} />

                {/* Icon */}
                <div className={`mb-5 transition-colors duration-300 ${
                  feature.accentText
                    ? 'text-green-400/60 group-hover:text-green-400'
                    : 'text-ember-500/60 group-hover:text-ember-400'
                }`}>
                  <feature.icon size={28} strokeWidth={1.5} />
                </div>

                {/* Title + mobile chevron */}
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

                {/* Description — always visible on desktop, toggle on mobile */}
                <div className={`overflow-hidden transition-all duration-300 lg:block ${isOpen ? 'max-h-48' : 'max-h-0 lg:max-h-none'}`}>
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
