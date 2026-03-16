import { MapPin, Calendar, PartyPopper } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const locations = [
  {
    icon: MapPin,
    title: 'Markten',
    description: 'Wekelijks te vinden op diverse lokale markten in de regio. Volg ons op Instagram voor de actuele planning.',
    label: 'Wekelijks',
  },
  {
    icon: PartyPopper,
    title: 'Festivals',
    description: 'Van foodtruckfestivals tot muziekfestivals — wij zijn erbij met onze verse spitkip.',
    label: 'Seizoen',
  },
  {
    icon: Calendar,
    title: 'Evenementen',
    description: 'Boek Kip \'N Grill voor jouw bedrijfsfeest, bruiloft of privé-evenement.',
    label: 'Op aanvraag',
  },
]

export default function LocationSection() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section id="locaties" className="relative bg-soot-800 py-24 sm:py-32 overflow-hidden">
      {/* Warm bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 100%, rgba(234,88,12,0.15) 0%, transparent 70%)',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
            // Locaties
          </span>
          <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 tracking-wide transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            WAAR <span className="text-ember-500">STAAN</span> WE?
          </h2>
        </div>

        {/* Location cards — horizontal layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <div
              key={loc.title}
              className={`group relative p-8 sm:p-10 bg-soot-900/60 border border-cream-50/5
                hover:border-ember-500/20 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${0.3 + i * 0.15}s`,
                clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="text-ember-500/60 group-hover:text-ember-400 transition-colors duration-300">
                  <loc.icon size={28} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/20 border border-cream-50/10 px-2 py-0.5">
                  {loc.label}
                </span>
              </div>

              <h3 className="font-display text-3xl text-cream-50 tracking-wide mb-4">
                {loc.title.toUpperCase()}
              </h3>
              <p className="font-serif text-cream-100/40 leading-relaxed">
                {loc.description}
              </p>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-ember-500 to-ember-400 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.3)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <Calendar size={18} strokeWidth={1.5} className="relative z-10" />
            <span className="relative z-10">BOEK ONS</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
        </div>
      </div>
    </section>
  )
}
