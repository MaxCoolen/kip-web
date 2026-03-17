import { useState } from 'react'
import { Zap, Flame, Wind, ArrowLeft, AlertTriangle, CheckCircle, Thermometer } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { opwarm } from '../i18n/translations'

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'Grill' | 'Fried Chicken'
type Method = 'Magnetron' | 'Oven' | 'Airfryer'

type MethodAdvice = {
  duration: string
  temp: string
  rating: 1 | 2 | 3
  steps: string[]
  tip?: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const methodIcons: Record<Method, React.ReactNode> = {
  Magnetron: <Zap size={20} />,
  Oven:      <Flame size={20} />,
  Airfryer:  <Wind size={20} />,
}

function RatingDots({ rating }: { rating: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i <= rating ? 'bg-ember-400' : 'bg-soot-600'}`}
        />
      ))}
    </div>
  )
}

// ── Product card ──────────────────────────────────────────────────────────────

function ProductCard({
  name,
  number,
  advice,
  index,
  ratingLabels,
  methodIcon,
}: {
  name: string
  number: string
  advice: MethodAdvice
  index: number
  ratingLabels: Record<1 | 2 | 3, string>
  methodIcon: React.ReactNode
}) {
  const { duration, temp, rating, steps, tip } = advice

  return (
    <div
      className="relative group bg-soot-800 border border-cream-50/5 hover:border-ember-500/30 transition-all duration-500 overflow-hidden"
      style={{
        animation: 'cardReveal 0.5s ease-out forwards',
        animationDelay: `${index * 0.08}s`,
        opacity: 0,
      }}
    >
      <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-ember-500 to-ember-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-br from-ember-500/0 to-ember-500/0 group-hover:from-ember-500/3 group-hover:to-transparent transition-all duration-500 pointer-events-none" />

      <div className="relative p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-ember-500/50 uppercase block mb-1">
              {number}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl text-cream-50 tracking-wide leading-none group-hover:text-ember-400 transition-colors duration-300">
              {name.toUpperCase()}
            </h3>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0 pt-1">
            <RatingDots rating={rating} />
            <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
              rating === 3 ? 'text-ember-400' : rating === 2 ? 'text-ember-300' : 'text-smoke-400'
            }`}>
              {ratingLabels[rating]}
            </span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-ember-500/20 via-cream-50/5 to-transparent mb-5" />

        <div className="flex items-center gap-6 mb-5">
          <div className="flex items-center gap-2">
            <Thermometer size={14} className="text-ember-500/60" />
            <span className="font-mono text-sm text-ember-400 tracking-wider">{temp}</span>
          </div>
          <div className="w-px h-4 bg-cream-50/10" />
          <div className="flex items-center gap-2">
            <div className="text-ember-500/60">{methodIcon}</div>
            <span className="font-mono text-sm text-cream-50/50 tracking-wider">{duration}</span>
          </div>
        </div>

        <ol className="space-y-2.5 mb-4">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="font-mono text-[11px] text-ember-500/50 mt-0.5 shrink-0 w-4">{i + 1}.</span>
              <span className="font-serif text-cream-100/70 text-[15px] leading-snug">{step}</span>
            </li>
          ))}
        </ol>

        {tip && (
          <div className="flex items-start gap-2.5 bg-ember-500/8 border border-ember-500/15 px-4 py-3 mt-4">
            <CheckCircle size={14} className="text-ember-400 mt-0.5 shrink-0" />
            <span className="font-serif text-ember-300/90 text-sm italic">{tip}</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Warmhoudzak banner ────────────────────────────────────────────────────────

function WarmhoudzakBanner({ method, tx }: { method: Method; tx: typeof opwarm['nl'] }) {
  const content = tx.banner[method]

  return (
    <div className="relative overflow-hidden border border-ember-500/25 bg-gradient-to-r from-ember-500/8 via-ember-500/5 to-transparent mb-10">
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{ backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(234,88,12,0.04) 8px, rgba(234,88,12,0.04) 10px)' }}
      />
      <div className="relative flex items-start gap-4 p-5 sm:p-6">
        <div className="shrink-0 w-10 h-10 rounded-full bg-ember-500/15 border border-ember-500/25 flex items-center justify-center">
          <AlertTriangle size={18} className="text-ember-400" />
        </div>
        <div>
          <p className="font-display text-lg tracking-widest text-ember-400 mb-1">{tx.banner.title}</p>
          <p className="font-serif text-cream-100/75 text-[15px] leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────

function MethodPill({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 font-mono text-xs tracking-[0.15em] uppercase transition-all duration-300 border ${
        active
          ? 'bg-ember-500/15 border-ember-500/40 text-ember-400'
          : 'bg-transparent border-cream-50/8 text-cream-50/35 hover:border-cream-50/20 hover:text-cream-50/60'
      }`}
    >
      <span className={active ? 'text-ember-400' : 'text-cream-50/25'}>{icon}</span>
      {label}
    </button>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function OpwarmadviesPage() {
  const { lang } = useLanguage()
  const tx = opwarm[lang]

  const [activeCategory, setActiveCategory] = useState<Category>('Grill')
  const [activeMethod, setActiveMethod] = useState<Method>('Oven')

  const filtered = tx.products.filter((p) => p.category === activeCategory)
  const categories = Object.keys(tx.categories) as Category[]
  const methods = Object.keys(tx.methods) as Method[]

  return (
    <div className="bg-soot-900 min-h-screen">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(234,88,12,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(234,88,12,0.3) 6px, rgba(234,88,12,0.3) 14px)' }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-cream-50/30 hover:text-ember-400 transition-colors duration-300 mb-12 group uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            {tx.back}
          </a>

          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-5">
            {tx.label}
          </span>

          <h1
            className="font-display text-[72px] sm:text-[110px] md:text-[140px] text-cream-50 leading-[0.85] tracking-wide text-shadow-fire mb-6"
            style={{ animation: 'cardReveal 0.9s ease-out forwards', opacity: 0 }}
          >
            {tx.title1}
            <br />
            <span className="text-ember-500">{tx.title2}</span>
          </h1>

          <p
            className="font-serif text-cream-100/60 text-xl sm:text-2xl max-w-lg"
            style={{ animation: 'cardReveal 0.9s ease-out 0.2s forwards', opacity: 0 }}
          >
            {tx.subtitle}
          </p>
        </div>
      </section>

      {/* ── Sticky controls ──────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-soot-900/95 backdrop-blur-xl border-b border-cream-50/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {/* Category tabs */}
          <div className="flex border-b border-cream-50/5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-6 sm:px-8 py-4 font-display text-lg sm:text-xl tracking-[0.15em] transition-all duration-300 ${
                  activeCategory === cat ? 'text-ember-400' : 'text-cream-50/30 hover:text-cream-50/60'
                }`}
              >
                {tx.categories[cat].toUpperCase()}
                <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-ember-500 transition-all duration-300 ${activeCategory === cat ? 'opacity-100' : 'opacity-0'}`} />
              </button>
            ))}
          </div>

          {/* Method pills */}
          <div className="flex items-center gap-2 py-3">
            <span className="font-mono text-[10px] tracking-[0.25em] text-cream-50/20 uppercase mr-2 hidden sm:block">
              {tx.methodLabel}
            </span>
            {methods.map((m) => (
              <MethodPill
                key={m}
                icon={methodIcons[m]}
                label={tx.methods[m]}
                active={activeMethod === m}
                onClick={() => setActiveMethod(m)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-14 sm:py-20">
        {activeCategory === 'Grill' && (
          <WarmhoudzakBanner method={activeMethod} tx={tx} />
        )}

        <div
          key={`${activeCategory}-${activeMethod}`}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
        >
          {filtered.map((product, i) => (
            <ProductCard
              key={product.number}
              name={product.name}
              number={product.number}
              advice={product.advice[activeMethod] as MethodAdvice}
              index={i}
              ratingLabels={tx.ratingLabels}
              methodIcon={methodIcons[activeMethod]}
            />
          ))}
        </div>

        <div className="mt-14 pt-8 border-t border-cream-50/5 flex items-start gap-3">
          <Thermometer size={16} className="text-ember-500/40 mt-0.5 shrink-0" />
          <p className="font-serif text-cream-50/30 text-sm italic">{tx.footerNote}</p>
        </div>
      </section>

      <Footer />

      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
