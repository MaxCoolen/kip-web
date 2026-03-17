import { useState, useEffect, useCallback } from 'react'
import { ArrowLeft, Clock, ChefHat, Search, X, Flame, UtensilsCrossed, BookOpen } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// ── Types ─────────────────────────────────────────────────────────────────────

type Category = 'Grill' | 'Fried Chicken'
type Difficulty = 'Makkelijk' | 'Gemiddeld' | 'Gevorderd'

type Recipe = {
  id: string
  title: string
  category: Category
  prepTime: number
  difficulty: Difficulty
  tags: string[]
  description: string
  image?: string
  ingredients: string[]
  steps: string[]
  publishedAt: string
}

type TimeFilter = 'Alle' | 'Snel' | 'Medium' | 'Uitgebreid'

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function matchesTime(prepTime: number, filter: TimeFilter) {
  if (filter === 'Snel') return prepTime < 20
  if (filter === 'Medium') return prepTime >= 20 && prepTime <= 40
  if (filter === 'Uitgebreid') return prepTime > 40
  return true
}

const difficultyColor: Record<Difficulty, string> = {
  Makkelijk: 'text-emerald-400',
  Gemiddeld: 'text-ember-400',
  Gevorderd: 'text-ember-600',
}

const difficultyDots: Record<Difficulty, number> = {
  Makkelijk: 1,
  Gemiddeld: 2,
  Gevorderd: 3,
}

// ── Skeleton card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="bg-soot-800 border border-cream-50/5 overflow-hidden animate-pulse">
      <div className="h-44 bg-soot-700" />
      <div className="p-6 space-y-3">
        <div className="h-3 w-24 bg-soot-700 rounded" />
        <div className="h-7 w-3/4 bg-soot-700 rounded" />
        <div className="h-4 w-full bg-soot-700 rounded" />
        <div className="h-4 w-2/3 bg-soot-700 rounded" />
        <div className="flex gap-3 pt-2">
          <div className="h-3 w-16 bg-soot-700 rounded" />
          <div className="h-3 w-16 bg-soot-700 rounded" />
        </div>
      </div>
    </div>
  )
}

// ── Recipe image / placeholder ────────────────────────────────────────────────

function RecipeVisual({ recipe }: { recipe: Recipe }) {
  if (recipe.image) {
    return (
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-full object-cover"
      />
    )
  }

  // Elegant branded placeholder
  const isGrill = recipe.category === 'Grill'
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{
        background: isGrill
          ? 'linear-gradient(135deg, #1c1914 0%, #2a2520 50%, #1c1914 100%)'
          : 'linear-gradient(135deg, #1c1914 0%, #3d1a0a 50%, #1c1914 100%)',
      }}
    >
      {/* Grill stripe texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isGrill
            ? 'repeating-linear-gradient(0deg, transparent, transparent 10px, rgba(234,88,12,0.15) 10px, rgba(234,88,12,0.15) 12px)'
            : 'repeating-linear-gradient(-45deg, transparent, transparent 8px, rgba(234,88,12,0.08) 8px, rgba(234,88,12,0.08) 10px)',
        }}
      />
      {/* Center icon */}
      <div className="relative flex flex-col items-center gap-2 opacity-30">
        {isGrill ? (
          <Flame size={40} className="text-ember-400" />
        ) : (
          <UtensilsCrossed size={40} className="text-ember-400" />
        )}
        <span className="font-mono text-[10px] tracking-[0.3em] text-ember-500 uppercase">
          {recipe.category}
        </span>
      </div>
    </div>
  )
}

// ── Recipe card ───────────────────────────────────────────────────────────────

function RecipeCard({
  recipe,
  index,
  onClick,
}: {
  recipe: Recipe
  index: number
  onClick: () => void
}) {
  return (
    <article
      className="group relative bg-soot-800 border border-cream-50/5 hover:border-ember-500/30 overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
      style={{
        animation: 'cardReveal 0.5s ease-out forwards',
        animationDelay: `${index * 0.09}s`,
        opacity: 0,
      }}
      onClick={onClick}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 w-[3px] h-full bg-gradient-to-b from-ember-500 to-ember-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

      {/* Image area */}
      <div className="relative h-44 overflow-hidden">
        <div className="w-full h-full transition-transform duration-700 group-hover:scale-105">
          <RecipeVisual recipe={recipe} />
        </div>
        {/* Category badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="px-2.5 py-1 font-mono text-[9px] tracking-[0.25em] uppercase bg-soot-950/80 backdrop-blur-sm border border-ember-500/30 text-ember-400">
            {recipe.category}
          </span>
        </div>
        {/* Date badge */}
        <div className="absolute bottom-3 left-3 z-10">
          <span className="font-mono text-[9px] tracking-[0.2em] text-cream-50/40 uppercase bg-soot-950/60 backdrop-blur-sm px-2 py-1">
            {formatDate(recipe.publishedAt)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-2xl sm:text-3xl text-cream-50 tracking-wide leading-none mb-2 group-hover:text-ember-400 transition-colors duration-300">
          {recipe.title.toUpperCase()}
        </h3>
        <p className="font-serif text-cream-100/55 text-[15px] leading-snug mb-4 line-clamp-2 group-hover:text-cream-100/75 transition-colors duration-300">
          {recipe.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {recipe.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 border border-cream-50/8 text-cream-50/30"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-5 pt-3 border-t border-cream-50/5">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-ember-500/60" />
            <span className="font-mono text-[11px] tracking-wider text-cream-50/40">
              {recipe.prepTime} min
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
              {[1, 2, 3].map((d) => (
                <div
                  key={d}
                  className={`w-1.5 h-1.5 rounded-full ${
                    d <= difficultyDots[recipe.difficulty]
                      ? 'bg-ember-400'
                      : 'bg-soot-600'
                  }`}
                />
              ))}
            </div>
            <span className={`font-mono text-[11px] tracking-wider ${difficultyColor[recipe.difficulty]}`}>
              {recipe.difficulty}
            </span>
          </div>
          <div className="ml-auto">
            <span className="font-mono text-[9px] tracking-[0.2em] text-ember-500/50 uppercase group-hover:text-ember-400 transition-colors duration-300">
              Bekijk →
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}

// ── Modal ─────────────────────────────────────────────────────────────────────

function RecipeModal({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  // Derive product name for the "dit recept gebruikt" link
  const productHint = recipe.category === 'Grill' ? 'Halve kip of hele kip' : recipe.title.includes('Kippeling') ? 'Kippeling' : recipe.title.includes('Hot') ? 'Hot Wings' : 'Crispy Chicken Strips'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ animation: 'fadeIn 0.2s ease-out' }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-soot-950/85 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-3xl max-h-[92dvh] sm:max-h-[88vh] bg-soot-900 border border-cream-50/8 overflow-hidden flex flex-col"
        style={{ animation: 'slideUp 0.3s ease-out' }}
      >
        {/* Modal header */}
        <div className="relative shrink-0">
          {/* Visual */}
          <div className="h-40 sm:h-52 overflow-hidden">
            <RecipeVisual recipe={recipe} />
          </div>
          {/* Gradient overlay bottom of image */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-soot-900 to-transparent" />
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 bg-soot-950/80 backdrop-blur-sm border border-cream-50/10 flex items-center justify-center text-cream-50/60 hover:text-cream-50 hover:border-ember-500/40 transition-all duration-200"
          >
            <X size={16} />
          </button>
          {/* Title overlay */}
          <div className="absolute bottom-4 left-6 right-16">
            <span className="font-mono text-[9px] tracking-[0.3em] text-ember-500 uppercase block mb-1">
              {recipe.category} · {recipe.prepTime} min · {recipe.difficulty}
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-cream-50 tracking-wide leading-none text-shadow-sm">
              {recipe.title.toUpperCase()}
            </h2>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <div className="p-6 sm:p-8">
            {/* Description */}
            <p className="font-serif text-cream-100/65 text-lg leading-relaxed mb-8 border-l-2 border-ember-500/30 pl-4 italic">
              {recipe.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {recipe.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-[0.2em] uppercase px-3 py-1 border border-ember-500/20 text-ember-400/70 bg-ember-500/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Two-column content */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.4fr] gap-8">
              {/* Ingredients */}
              <div>
                <h3 className="font-display text-xl tracking-[0.15em] text-ember-400 mb-4 flex items-center gap-2">
                  <UtensilsCrossed size={16} />
                  INGREDIËNTEN
                </h3>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-ember-500 mt-2 shrink-0" />
                      <span className="font-serif text-cream-100/70 text-[15px] leading-snug">{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div>
                <h3 className="font-display text-xl tracking-[0.15em] text-ember-400 mb-4 flex items-center gap-2">
                  <ChefHat size={16} />
                  BEREIDING
                </h3>
                <ol className="space-y-4">
                  {recipe.steps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-display text-2xl text-ember-500/30 leading-none shrink-0 w-6 text-right">
                        {i + 1}
                      </span>
                      <span className="font-serif text-cream-100/70 text-[15px] leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Product link */}
            <div className="mt-8 pt-6 border-t border-cream-50/5 flex items-center gap-3">
              <Flame size={14} className="text-ember-500/50 shrink-0" />
              <p className="font-serif text-cream-50/30 text-sm">
                Dit recept gebruikt:{' '}
                <a
                  href="/#menu"
                  className="text-ember-400/70 hover:text-ember-400 underline underline-offset-2 transition-colors duration-200"
                >
                  {productHint}
                </a>{' '}
                — vers te bestellen bij Kip 'N Grill.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Filter pill ───────────────────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border transition-all duration-200 whitespace-nowrap ${
        active
          ? 'bg-ember-500/15 border-ember-500/40 text-ember-400'
          : 'bg-transparent border-cream-50/8 text-cream-50/35 hover:border-cream-50/20 hover:text-cream-50/55'
      }`}
    >
      {label}
    </button>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function ReceptenPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
  const [activeRecipe, setActiveRecipe] = useState<Recipe | null>(null)

  // Filters
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<'Alle' | Category>('Alle')
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('Alle')
  const [diffFilter, setDiffFilter] = useState<'Alle' | Difficulty>('Alle')

  useEffect(() => {
    fetch('/recepten.json')
      .then((r) => r.json())
      .then((data: Recipe[]) => {
        // Sort newest first
        const sorted = [...data].sort(
          (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        setRecipes(sorted)
      })
      .finally(() => setLoading(false))
  }, [])

  const filtered = recipes.filter((r) => {
    if (categoryFilter !== 'Alle' && r.category !== categoryFilter) return false
    if (!matchesTime(r.prepTime, timeFilter)) return false
    if (diffFilter !== 'Alle' && r.difficulty !== diffFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      if (
        !r.title.toLowerCase().includes(q) &&
        !r.tags.some((t) => t.toLowerCase().includes(q)) &&
        !r.description.toLowerCase().includes(q)
      )
        return false
    }
    return true
  })

  const resetFilters = useCallback(() => {
    setSearch('')
    setCategoryFilter('Alle')
    setTimeFilter('Alle')
    setDiffFilter('Alle')
  }, [])

  const hasActiveFilters =
    search.trim() || categoryFilter !== 'Alle' || timeFilter !== 'Alle' || diffFilter !== 'Alle'

  return (
    <div className="bg-soot-900 min-h-screen">
      <Navbar />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(234,88,12,0.09) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 6px, rgba(234,88,12,0.25) 6px, rgba(234,88,12,0.25) 14px)',
          }}
        />

        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <a
            href="/"
            className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.25em] text-cream-50/30 hover:text-ember-400 transition-colors duration-300 mb-12 group uppercase"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Terug naar home
          </a>

          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-5">
            // Nieuwe recepten elke week
          </span>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <h1
              className="font-display text-[72px] sm:text-[110px] md:text-[140px] text-cream-50 leading-[0.85] tracking-wide text-shadow-fire"
              style={{ animation: 'cardReveal 0.9s ease-out forwards', opacity: 0 }}
            >
              RECEP
              <span className="text-ember-500">TEN</span>
            </h1>
            <p
              className="font-serif text-cream-100/55 text-xl sm:text-2xl max-w-xs sm:text-right"
              style={{ animation: 'cardReveal 0.9s ease-out 0.15s forwards', opacity: 0 }}
            >
              Wekelijks verse inspiratie met onze kip
            </p>
          </div>
        </div>
      </section>

      {/* ── Sticky filter bar ────────────────────────────────────────────── */}
      <div className="sticky top-[64px] z-40 bg-soot-900/95 backdrop-blur-xl border-b border-cream-50/5 shadow-[0_4px_30px_rgba(0,0,0,0.35)]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 space-y-2.5">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-cream-50/25 pointer-events-none" />
            <input
              type="text"
              placeholder="Zoek op naam of tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-soot-800/60 border border-cream-50/8 pl-9 pr-4 py-2 font-mono text-xs tracking-wider text-cream-50/70 placeholder-cream-50/20 focus:outline-none focus:border-ember-500/40 focus:bg-soot-800 transition-all duration-200"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-50/30 hover:text-cream-50/60 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>

          {/* Filter pills row */}
          <div className="flex flex-wrap gap-2 items-center">
            {/* Category */}
            <div className="flex gap-1.5 items-center">
              {(['Alle', 'Grill', 'Fried Chicken'] as const).map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={categoryFilter === c}
                  onClick={() => setCategoryFilter(c)}
                />
              ))}
            </div>

            <div className="w-px h-5 bg-cream-50/8 hidden sm:block" />

            {/* Time */}
            <div className="flex gap-1.5 items-center">
              {(['Alle', 'Snel', 'Medium', 'Uitgebreid'] as TimeFilter[]).map((t) => (
                <FilterPill
                  key={t}
                  label={
                    t === 'Snel' ? 'Snel < 20m'
                    : t === 'Medium' ? '20–40m'
                    : t === 'Uitgebreid' ? '> 40m'
                    : t
                  }
                  active={timeFilter === t}
                  onClick={() => setTimeFilter(t)}
                />
              ))}
            </div>

            <div className="w-px h-5 bg-cream-50/8 hidden sm:block" />

            {/* Difficulty */}
            <div className="flex gap-1.5 items-center">
              {(['Alle', 'Makkelijk', 'Gemiddeld', 'Gevorderd'] as const).map((d) => (
                <FilterPill
                  key={d}
                  label={d}
                  active={diffFilter === d}
                  onClick={() => setDiffFilter(d as 'Alle' | Difficulty)}
                />
              ))}
            </div>

            {/* Result count + reset */}
            <div className="ml-auto flex items-center gap-3">
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="font-mono text-[9px] tracking-[0.2em] uppercase text-ember-500/60 hover:text-ember-400 transition-colors duration-200 flex items-center gap-1"
                >
                  <X size={10} />
                  Wis filters
                </button>
              )}
              {!loading && (
                <span className="font-mono text-[10px] tracking-wider text-cream-50/20">
                  {filtered.length} recept{filtered.length !== 1 ? 'en' : ''}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recipe grid ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[0, 1, 2].map((i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <BookOpen size={40} className="text-ember-500/20 mb-5" />
            <p className="font-display text-3xl text-cream-50/20 tracking-wide mb-2">
              GEEN RECEPTEN GEVONDEN
            </p>
            <p className="font-serif text-cream-50/30 text-lg">
              Pas je filters aan om meer recepten te zien.
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="mt-6 font-mono text-xs tracking-[0.2em] uppercase text-ember-400 border border-ember-500/30 px-5 py-2.5 hover:bg-ember-500/10 transition-all duration-200"
              >
                Alle recepten tonen
              </button>
            )}
          </div>
        ) : (
          <div
            key={`${categoryFilter}-${timeFilter}-${diffFilter}-${search}`}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {filtered.map((recipe, i) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                index={i}
                onClick={() => setActiveRecipe(recipe)}
              />
            ))}
          </div>
        )}

        {/* Bottom note */}
        {!loading && recipes.length > 0 && (
          <div className="mt-14 pt-8 border-t border-cream-50/5 flex items-center justify-center gap-3">
            <Flame size={14} className="text-ember-500/30" />
            <p className="font-mono text-[10px] tracking-[0.2em] text-cream-50/20 uppercase">
              Wekelijks nieuwe recepten — kom snel terug
            </p>
            <Flame size={14} className="text-ember-500/30" />
          </div>
        )}
      </section>

      {/* ── Modal ────────────────────────────────────────────────────────── */}
      {activeRecipe && (
        <RecipeModal
          recipe={activeRecipe}
          onClose={() => setActiveRecipe(null)}
        />
      )}

      <Footer />

      <style>{`
        @keyframes cardReveal {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
