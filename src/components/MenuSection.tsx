import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useLanguage } from '../context/LanguageContext'
import { menu } from '../i18n/translations'

type Variant = {
  label: string
  price: string
  highlight?: boolean
  note?: string
}

type MenuItem = {
  number: string
  tag: string | null
  price?: string
  variants?: Variant[]
  // index into tx.items for name/description
  itemIndex: number
  categoryIndex: number // 0=Grill, 1=Fried Chicken, 2=Broodjes
}

const menuData: MenuItem[] = [
  { number: '01', tag: null,          price: '€10,-',  itemIndex: 0, categoryIndex: 0 },
  { number: '02', tag: null,          price: '€5,50',  itemIndex: 1, categoryIndex: 0 },
  { number: '03', tag: 'Favoriet',    variants: [{ label: '6 stuks', price: '€5,-', highlight: true }, { label: 'per stuk', price: '€1' }], itemIndex: 2, categoryIndex: 0 },
  { number: '04', tag: 'Favoriet',    variants: [{ label: '4 stuks', price: '€10,-', highlight: true }, { label: 'per stuk', price: '€2,75' }], itemIndex: 3, categoryIndex: 0 },
  { number: '05', tag: null,          variants: [{ label: '6 Stuks', price: '€7,-', highlight: true }, { label: 'per stuk', price: '€1,30' }], itemIndex: 4, categoryIndex: 0 },
  { number: '06', tag: 'Bestseller',  variants: [{ label: 'Medium', price: '€5,-', highlight: true }, { label: 'Large', price: '€9,-' }], itemIndex: 5, categoryIndex: 1 },
  { number: '07', tag: null,          variants: [{ label: '4 Stuks', price: '€5,50', highlight: true }, { label: '8 Stuks', price: '€10,50' }], itemIndex: 6, categoryIndex: 1 },
  { number: '08', tag: null,          variants: [{ label: '5 Stuks', price: '€5,-', highlight: true }, { label: '10 Stuks', price: '€10,-' }], itemIndex: 7, categoryIndex: 1 },
  { number: '09', tag: null,          variants: [{ label: 'Half Stokbrood', price: '€7,-', highlight: true }, { label: 'Heel Stokbrood', price: '€10,-' }], itemIndex: 8, categoryIndex: 2 },
  { number: '10', tag: 'Bestseller',  variants: [{ label: 'Half Stokbrood', price: '€7,95', highlight: true }, { label: 'Heel Stokbrood', price: '€10,95' }], itemIndex: 9, categoryIndex: 2 },
]

function PriceDisplay({ item, variantLabels }: { item: MenuItem; variantLabels: Record<string, string> }) {
  if (item.price) {
    return (
      <span className="font-display text-3xl sm:text-4xl text-ember-400 tracking-wider shrink-0">
        {item.price}
      </span>
    )
  }
  if (item.variants) {
    return (
      <div className="flex flex-wrap items-end gap-3 sm:gap-4 shrink-0">
        {item.variants.map((v) => (
          <div key={v.label} className="text-right">
            <p className="font-mono text-[10px] tracking-[0.2em] text-cream-50/30 uppercase mb-0.5">
              {variantLabels[v.label] ?? v.label}
            </p>
            <p className={`font-display tracking-wider leading-none ${
              v.highlight
                ? 'text-3xl sm:text-4xl text-ember-400'
                : 'text-xl sm:text-2xl text-cream-50/50'
            }`}>
              {v.price}
            </p>
            {v.note && (
              <p className="font-mono text-[10px] text-ember-500/40 tracking-wide mt-0.5">{v.note}</p>
            )}
          </div>
        ))}
      </div>
    )
  }
  return null
}

export default function MenuSection() {
  const { ref, isVisible } = useScrollReveal()
  const { lang } = useLanguage()
  const tx = menu[lang]

  const [activeCatIndex, setActiveCatIndex] = useState(0)

  const filtered = menuData.filter((item) => item.categoryIndex === activeCatIndex)

  return (
    <section id="menu" className="relative bg-soot-800 py-24 sm:py-32 overflow-hidden">
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
            {tx.label}
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 leading-[0.9] tracking-wide transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
            >
              {tx.heading1}
              <br />
              <span className="text-ember-500">{tx.heading2}</span>
            </h2>
            <p
              className={`font-serif text-cream-100/65 text-lg max-w-xs transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {tx.sub}
            </p>
          </div>
        </div>

        {/* Category tabs */}
        <div
          className={`flex items-center gap-0 mb-12 border-b border-cream-50/5 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {tx.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCatIndex(i)}
              className={`relative px-6 sm:px-8 py-4 font-display text-lg sm:text-xl tracking-[0.15em] transition-all duration-300 ${
                activeCatIndex === i
                  ? 'text-ember-400'
                  : 'text-cream-50/30 hover:text-cream-50/60'
              }`}
            >
              {cat.toUpperCase()}
              <span
                className={`absolute bottom-0 left-0 right-0 h-[2px] bg-ember-500 transition-all duration-300 ${
                  activeCatIndex === i ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Menu list */}
        <div className="space-y-0">
          {filtered.map((item, i) => {
            const info = tx.items[item.itemIndex]
            const tag = item.tag === 'Favoriet' ? tx.tagFavoriet : item.tag === 'Bestseller' ? tx.tagBestseller : item.tag

            return (
              <div
                key={item.number}
                className="group relative border-t border-cream-50/5 py-7 sm:py-9 hover:bg-soot-700/20 transition-colors duration-300"
                style={{
                  animation: 'fadeUp 0.4s ease-out forwards',
                  animationDelay: `${i * 0.07}s`,
                  opacity: 0,
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <span className="font-mono text-xs text-ember-500/40 w-8 shrink-0">{item.number}</span>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <h3 className="font-display text-2xl sm:text-3xl text-cream-50 tracking-wide group-hover:text-ember-400 transition-colors duration-300">
                        {info.name.toUpperCase()}
                      </h3>
                      {tag && (
                        <span className="px-3 py-1 text-[10px] font-mono tracking-[0.2em] uppercase border border-ember-500/30 text-ember-400 bg-ember-500/5 shrink-0">
                          {tag}
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-cream-100/60 text-base group-hover:text-cream-100/80 transition-colors duration-300">
                      {info.description}
                    </p>
                  </div>

                  <div className="hidden lg:block flex-1 border-b border-dotted border-cream-50/10 mx-4 self-end mb-3" />

                  <PriceDisplay item={item} variantLabels={tx.variantLabels} />
                </div>

                <div className="absolute left-0 top-0 w-[2px] h-0 bg-ember-500 group-hover:h-full transition-all duration-500" />
              </div>
            )
          })}

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
