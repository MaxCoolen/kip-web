import { useScrollReveal } from '../hooks/useScrollReveal'

const galleryItems = [
  {
    title: 'Spitkip',
    subtitle: 'Goudbruin gegrild',
    emoji: '🍗',
    span: 'md:col-span-2 md:row-span-2',
    size: 'text-7xl sm:text-8xl',
    gradient: 'from-amber-950 via-orange-950 to-red-950',
  },
  {
    title: 'Loaded Fries',
    subtitle: 'Vol beladen',
    emoji: '🍟',
    span: '',
    size: 'text-5xl sm:text-6xl',
    gradient: 'from-yellow-950 to-amber-950',
  },
  {
    title: 'Wings',
    subtitle: 'Krokant & kruidig',
    emoji: '🔥',
    span: '',
    size: 'text-5xl sm:text-6xl',
    gradient: 'from-red-950 to-orange-950',
  },
  {
    title: 'Pulled Chicken',
    subtitle: 'Zacht & sappig',
    emoji: '🥖',
    span: 'md:col-span-2',
    size: 'text-5xl sm:text-6xl',
    gradient: 'from-orange-950 to-stone-900',
  },
  {
    title: 'Kip Burger',
    subtitle: 'Huisgemaakt',
    emoji: '🍔',
    span: '',
    size: 'text-5xl sm:text-6xl',
    gradient: 'from-stone-900 to-amber-950',
  },
]

export default function FoodGallery() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative bg-soot-900 py-24 sm:py-32 overflow-hidden">
      <div ref={ref} className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
            // Impressie
          </span>
          <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 leading-[0.9] tracking-wide transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            VERS VAN
            <br />
            <span className="text-ember-500">DE GRILL</span>
          </h2>
        </div>

        {/* Gallery grid — asymmetric Masonry-inspired */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {galleryItems.map((item, i) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden cursor-pointer ${item.span}
                ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '0.8s',
                transitionDelay: `${0.2 + i * 0.1}s`,
                aspectRatio: item.span.includes('row-span-2') ? 'auto' : '1',
                minHeight: item.span.includes('row-span-2') ? '100%' : undefined,
              }}
            >
              {/* Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />

              {/* Diagonal grill texture */}
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 6px, rgba(255,251,235,1) 6px, rgba(255,251,235,1) 7px)',
                }}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center min-h-[180px]">
                <span className={`${item.size} mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                  {item.emoji}
                </span>
                <h3 className="font-display text-xl sm:text-2xl text-cream-50 tracking-wide">
                  {item.title.toUpperCase()}
                </h3>
                <p className="font-serif text-cream-100/30 text-sm italic mt-1">
                  {item.subtitle}
                </p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-ember-500/0 group-hover:bg-ember-500/10 transition-colors duration-500" />

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-6 h-[2px] bg-ember-500/0 group-hover:bg-ember-500 transition-all duration-300" />
              <div className="absolute top-0 left-0 w-[2px] h-6 bg-ember-500/0 group-hover:bg-ember-500 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
