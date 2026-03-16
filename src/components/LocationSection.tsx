import { useState } from 'react'
import { Calendar, PartyPopper, Clock, MapPin, ChevronRight } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import BookingModal from './BookingModal'

type MarketId = 'dinsdag' | 'woensdag'

const markets = [
  {
    id: 'dinsdag' as MarketId,
    day: 'DINSDAG',
    time: '09:00 – 16:30',
    name: '18 Septemberplein',
    area: 'Eindhoven Centrum',
    mapSrc: 'https://maps.google.com/maps?q=18+Septemberplein,+Eindhoven&output=embed&z=16',
  },
  {
    id: 'woensdag' as MarketId,
    day: 'WOENSDAG',
    time: '09:00 – 17:30',
    name: 'Meerplein',
    area: 'Meerhoven Centrum',
    mapSrc: 'https://maps.google.com/maps?q=Meerplein,+Meerhoven,+Eindhoven&output=embed&z=16',
  },
]

const extras = [
  {
    icon: PartyPopper,
    title: 'Festivals',
    description: 'Van foodtruckfestivals tot muziekfestivals — wij zijn erbij met onze verse spitkip.',
    label: 'Seizoen',
  },
  {
    icon: Calendar,
    title: 'Evenementen',
    description: "Boek Kip 'N Grill voor jouw bedrijfsfeest, bruiloft of privé-evenement.",
    label: 'Op aanvraag',
  },
]

export default function LocationSection() {
  const { ref, isVisible } = useScrollReveal()
  const [activeMarket, setActiveMarket] = useState<MarketId>('dinsdag')
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <>
    {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    <section id="locaties" className="relative bg-soot-800 py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(234,88,12,0.15) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
            // Locaties
          </span>
          <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 tracking-wide transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            WAAR <span className="text-ember-500">STAAN</span> WE?
          </h2>
        </div>

        {/* Vaste markten — cards + map */}
        <div className={`mb-4 transition-all duration-1000 delay-200 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}>
          <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/25 uppercase mb-3">
            Vaste markten
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 lg:gap-4">

            {/* Market day cards */}
            <div className="lg:col-span-2 flex flex-col gap-3">
              {markets.map((market) => {
                const isActive = activeMarket === market.id
                return (
                  <button
                    key={market.id}
                    onClick={() => setActiveMarket(market.id)}
                    className={`group relative w-full text-left p-6 sm:p-8 border transition-all duration-500 overflow-hidden cursor-pointer ${
                      isActive
                        ? 'border-ember-500/35 bg-soot-900/80'
                        : 'border-cream-50/5 bg-soot-900/25 hover:border-cream-50/10 hover:bg-soot-900/40'
                    }`}
                    style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
                  >
                    {/* Active inner glow */}
                    {isActive && (
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'radial-gradient(ellipse at 0% 60%, rgba(234,88,12,0.08) 0%, transparent 65%)' }}
                      />
                    )}

                    {/* Top accent bar */}
                    <div className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-ember-500 to-ember-400 transition-all duration-500 ${
                      isActive ? 'w-full' : 'w-8 group-hover:w-16'
                    }`} />

                    {/* Day name */}
                    <div className="relative flex items-start justify-between mb-5">
                      <span className={`font-display leading-none tracking-wide transition-colors duration-400 ${
                        isActive ? 'text-ember-400' : 'text-cream-50/18'
                      }`} style={{ fontSize: 'clamp(2.8rem, 7vw, 4rem)' }}>
                        {market.day}
                      </span>
                      <ChevronRight
                        size={18}
                        className={`mt-2 shrink-0 transition-all duration-300 ${
                          isActive ? 'text-ember-500 opacity-100 translate-x-0' : 'text-cream-50/10 opacity-60 -translate-x-1'
                        }`}
                      />
                    </div>

                    {/* Divider */}
                    <div className={`h-px mb-5 transition-colors duration-400 ${isActive ? 'bg-ember-500/18' : 'bg-cream-50/4'}`} />

                    {/* Time + location */}
                    <div className="relative space-y-1.5">
                      <div className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] transition-colors duration-400 ${
                        isActive ? 'text-ember-400/75' : 'text-cream-50/18'
                      }`}>
                        <Clock size={11} strokeWidth={2} />
                        {market.time}
                      </div>
                      <h3 className={`font-display text-xl sm:text-2xl tracking-wide leading-tight transition-colors duration-400 ${
                        isActive ? 'text-cream-50' : 'text-cream-50/30'
                      }`}>
                        {market.name.toUpperCase()}
                      </h3>
                      <p className={`font-serif text-sm leading-snug transition-colors duration-400 ${
                        isActive ? 'text-cream-100/55' : 'text-cream-100/18'
                      }`}>
                        {market.area}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Map */}
            <div
              className="lg:col-span-3 relative min-h-[300px] sm:min-h-[400px] lg:min-h-0 overflow-hidden"
              style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
            >
              {/* Border overlay */}
              <div
                className="absolute inset-0 border border-ember-500/12 z-10 pointer-events-none"
                style={{ clipPath: 'inherit' }}
              />

              {/* Map iframes — both loaded, toggled via opacity */}
              {markets.map((market) => (
                <iframe
                  key={market.id}
                  src={market.mapSrc}
                  className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${
                    activeMarket === market.id ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Kaart ${market.name}`}
                />
              ))}

              {/* Active location label */}
              <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
                {markets.map((market) => (
                  <div
                    key={market.id}
                    className={`transition-all duration-500 ${
                      activeMarket === market.id
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2 absolute inset-0'
                    }`}
                  >
                    <div
                      className="inline-flex items-center gap-2 px-3 py-2 bg-soot-950/90 border border-ember-500/20"
                      style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    >
                      <MapPin size={11} className="text-ember-500 shrink-0" />
                      <span className="font-mono text-[10px] tracking-[0.15em] text-cream-50/70 uppercase">
                        {market.name} — {market.area}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Festivals + Evenementen */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 mb-14 transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {extras.map((extra) => (
            <div
              key={extra.title}
              className="group relative p-6 sm:p-7 bg-soot-900/35 border border-cream-50/5 hover:border-ember-500/15 transition-all duration-500"
              style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
            >
              <div className="flex items-start gap-5">
                <div className="text-ember-500/50 group-hover:text-ember-400 transition-colors duration-300 shrink-0 mt-0.5">
                  <extra.icon size={22} strokeWidth={1.5} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-display text-2xl text-cream-50 tracking-wide">
                      {extra.title.toUpperCase()}
                    </h3>
                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-cream-50/20 border border-cream-50/10 px-2 py-0.5">
                      {extra.label}
                    </span>
                  </div>
                  <p className="font-serif text-cream-100/65 text-base leading-relaxed">
                    {extra.description}
                  </p>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-ember-500 to-ember-400 group-hover:w-full transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={() => setBookingOpen(true)}
            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.3)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <Calendar size={18} strokeWidth={1.5} className="relative z-10" />
            <span className="relative z-10">BOEK ONS</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

      </div>
    </section>
    </>
  )
}
