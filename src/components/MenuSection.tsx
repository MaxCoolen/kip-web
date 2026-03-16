import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type Category = 'Grill' | 'Fried Chicken' | 'Broodjes'

// A variant is a named size/quantity option with a price
// e.g. { label: 'Medium', price: '€5' } or { label: '4 stuks', price: '€10', highlight: true }
type Variant = {
  label: string
  price: string
  highlight?: boolean   // big/promo price shown prominently
  note?: string         // small sub-text, e.g. "€2,75 per stuk"
}

type MenuItem = {
  name: string
  description: string
  tag: string | null
  number: string
  category: Category
  // Either a single price string OR an array of variants (not both)
  price?: string
  variants?: Variant[]
}

const categories: Category[] = ['Grill', 'Fried Chicken', 'Broodjes']

const menuItems: MenuItem[] = [
  {
    name: 'Hele gegrilde kip',
    description: 'Langzaam gegrild op het spit, krokant van buiten en sappig van binnen.',
    price: '€10,-',
    tag: null,
    number: '01',
    category: 'Grill',
  },
  {
    name: 'Halve kip',
    description: 'Een halve spitkip met keuze uit diverse sauzen.',
    price: '€5,50',
    tag: null,
    number: '02',
    category: 'Grill',
  },
  {
    name: 'Kippen Vleugels',
    description: 'Krokante wings gemarineerd in onze signature kruiden.',
    tag: 'Favoriet',
    number: '03',
    category: 'Grill',
    variants: [
      { label: '6 stuks', price: '€5,-', highlight: true},
      { label: 'per stuk', price: '€1' },
    ],
  },
  {
    name: 'Kippen Bouten',
    description: 'Perfect gegrilde kippenbouten.',
    tag: 'Favoriet',
    number: '04',
    category: 'Grill',
    variants: [
      { label: '4 stuks', price: '€10,-', highlight: true},
      { label: 'per stuk', price: '€2,75' },
    ],
  },
  {
    name: 'Drumsticks',
    description: 'Perfect gegrilde drumsticks van het spit.',
    tag: null,
    number: '05',
    category: 'Grill',
    variants: [
      { label: '6 stuks', price: '€7,-', highlight: true},
      { label: 'per stuk', price: '€1,30' },
    ],
  },
  {
    name: 'Kippeling',
    description: 'Goudbruin gefrituurde Kippeling gemaakt van 100% kippendijfilets.',
    tag: 'Bestseller',
    number: '06',
    category: 'Fried Chicken',
    variants: [
      { label: 'Medium', price: '€5,-', highlight: true },
      { label: 'Large', price: '€9,-' },
    ],
  },
  {
    name: 'Crispy chicken strips',
    description: 'Krokante kipstrips in een knapperig jasje.',
    tag: null,
    number: '07',
    category: 'Fried Chicken',
    variants: [
      { label: '4 Stuks', price: '€5,50', highlight: true },
      { label: '8 Stuks', price: '€10,50' },
    ],
  },
  {
    name: 'Hot Wings',
    description: 'Licht Pittige Wings in een krokant jasje.',
    tag: null,
    number: '08',
    category: 'Fried Chicken',
    variants: [
      { label: '5 Stuks', price: '€5,-', highlight: true },
      { label: '10 Stuks', price: '€10,-' },
    ],
  },
  {
    name: 'Broodje pulled chicken',
    description: 'Zacht geplukte kip op een vers broodje met komkommer en saus naar keuze.',
    tag: null,
    number: '09',
    category: 'Broodjes',
    variants: [
      { label: 'Half Stokbrood', price: '€7,-', highlight: true },
      { label: 'Heel Stokbrood', price: '€10,-' },
    ]
  },
  {
    name: 'Lunch Deal! Broodje pulled chicken + Drinken',
    description: 'Zacht geplukte kip op een vers broodje met komkommer en saus naar keuze en een drankje',
    tag: 'Bestseller',
    number: '10',
    category: 'Broodjes',
    variants: [
      { label: 'Half Stokbrood', price: '€7,95', highlight: true },
      { label: 'Heel Stokbrood', price: '€10,95' },
    ]
  },
]

// ── Price display component ──────────────────────────────────────────────────

function PriceDisplay({ item }: { item: MenuItem }) {
  // Single price
  if (item.price) {
    return (
      <span className="font-display text-3xl sm:text-4xl text-ember-400 tracking-wider shrink-0">
        {item.price}
      </span>
    )
  }

  // Multiple variants
  if (item.variants) {
    return (
      <div className="flex flex-wrap items-end gap-3 sm:gap-4 shrink-0">
        {item.variants.map((v) => (
          <div key={v.label} className="text-right">
            {/* Label */}
            <p className="font-mono text-[10px] tracking-[0.2em] text-cream-50/30 uppercase mb-0.5">
              {v.label}
            </p>
            {/* Price — highlighted variant is larger */}
            <p
              className={`font-display tracking-wider leading-none ${
                v.highlight
                  ? 'text-3xl sm:text-4xl text-ember-400'
                  : 'text-xl sm:text-2xl text-cream-50/50'
              }`}
            >
              {v.price}
            </p>
            {/* Optional per-unit note */}
            {v.note && (
              <p className="font-mono text-[10px] text-ember-500/40 tracking-wide mt-0.5">
                {v.note}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  return null
}

// ── Main component ───────────────────────────────────────────────────────────

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState<Category>('Grill')

  const filtered = menuItems.filter((item) => item.category === activeCategory)

  return (
    <section id="menu" className="relative bg-soot-800 py-24 sm:py-32 overflow-hidden">
      {/* Warm ambient glow */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 30%, rgba(234,88,12,0.12) 0%, transparent 60%)',
        }}
      />

      <div ref={ref} className="relative max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section header */}
        <div className="mb-14">
          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
            // Ons menu
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 leading-[0.9] tracking-wide transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              WAT ETEN
              <br />
              <span className="text-ember-500">WE?</span>
            </h2>
            <p
              className={`font-serif text-cream-100/40 text-lg max-w-xs transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              Alles dagelijks vers bereid. Bekijk ons aanbod.
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className={`flex items-center gap-0 mb-12 border-b border-cream-50/5 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-6 sm:px-8 py-4 font-display text-lg sm:text-xl tracking-[0.15em] transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-ember-400'
                  : 'text-cream-50/30 hover:text-cream-50/60'
              }`}
            >
              {cat.toUpperCase()}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-ember-500 transition-all duration-300 ${
                  activeCategory === cat ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Menu list */}
        <div className="space-y-0">
          {filtered.map((item, i) => (
            <div
              key={item.name}
              className="group relative border-t border-cream-50/5 py-7 sm:py-9 hover:bg-soot-700/20 transition-colors duration-300"
              style={{
                animation: 'fadeUp 0.4s ease-out forwards',
                animationDelay: `${i * 0.07}s`,
                opacity: 0,
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                {/* Number */}
                <span className="font-mono text-xs text-ember-500/40 w-8 shrink-0">
                  {item.number}
                </span>

                {/* Name + tag + description */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h3 className="font-display text-2xl sm:text-3xl text-cream-50 tracking-wide group-hover:text-ember-400 transition-colors duration-300">
                      {item.name.toUpperCase()}
                    </h3>
                    {item.tag && (
                      <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] uppercase border border-ember-500/30 text-ember-400 bg-ember-500/5 shrink-0">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-serif text-cream-100/30 text-sm group-hover:text-cream-100/50 transition-colors duration-300">
                    {item.description}
                  </p>
                </div>

                {/* Dotted line connector — desktop only */}
                <div className="hidden lg:block flex-1 border-b border-dotted border-cream-50/10 mx-4 self-end mb-3" />

                {/* Price / variants */}
                <PriceDisplay item={item} />
              </div>

              {/* Left hover accent */}
              <div className="absolute left-0 top-0 w-[2px] h-0 bg-ember-500 group-hover:h-full transition-all duration-500" />
            </div>
          ))}

          <div className="border-t border-cream-50/5" />
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
