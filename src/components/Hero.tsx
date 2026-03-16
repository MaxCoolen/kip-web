import { ChevronDown } from 'lucide-react'

// ── Add your own media to /public/ for a background:
//    /hero-bg.mp4  → looping video (recommended: sizzling rotisserie chicken)
//    /hero-bg.jpg  → static photo fallback (shown while video loads)
//    Without either, the ember/smoke CSS atmosphere takes over as background.

function Ember({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full animate-rise"
      style={{
        background: 'radial-gradient(circle, #f59e0b, #ea580c)',
        boxShadow: '0 0 6px 2px rgba(245,158,11,0.4)',
        ...style,
      }}
    />
  )
}

const pills = ['100% Halal', 'Biologisch', 'Vers Gegrild', 'Dagelijks Vers']

export default function Hero() {
  const embers = Array.from({ length: 26 }, () => ({
    left: `${8 + Math.random() * 84}%`,
    animationDelay: `${Math.random() * 10}s`,
    animationDuration: `${4 + Math.random() * 7}s`,
    opacity: 0.15 + Math.random() * 0.7,
    transform: `scale(${0.4 + Math.random() * 0.9})`,
  }))

  return (
    <section className="relative min-h-screen flex flex-col justify-end pb-16 sm:pb-24 overflow-hidden">

      {/* ── BACKGROUND ─────────────────────────────────────── */}
      <div className="absolute inset-0">

        {/* Base dark fill — always visible, fallback when no media */}
        <div className="absolute inset-0 bg-soot-950" />

        {/* Video / photo background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/hero-bg.jpg"
          className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-35"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay — ensures text is always readable */}
        <div className="absolute inset-0 bg-soot-950/55" />

        {/* Ember glow — rises from below like a live grill */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[70%] opacity-60"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(234,88,12,0.28) 0%, rgba(245,158,11,0.07) 38%, transparent 65%)',
          }}
        />

        {/* Side warmth — left */}
        <div
          className="absolute bottom-0 left-0 w-1/2 h-[60%] opacity-20"
          style={{
            background:
              'radial-gradient(ellipse at 0% 100%, rgba(234,88,12,0.3) 0%, transparent 55%)',
          }}
        />

        {/* Top darkness — pulls eye downward toward headline */}
        <div
          className="absolute top-0 left-0 right-0 h-3/4"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.5) 45%, transparent 100%)',
          }}
        />

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gradient-to-t from-soot-900 to-transparent" />

        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 60%, transparent 35%, rgba(10,8,6,0.55) 100%)',
          }}
        />

        {/* Smoke drift — top left */}
        <div
          className="absolute top-0 left-0 w-3/4 h-3/5 opacity-18 animate-float"
          style={{
            background:
              'radial-gradient(ellipse at 15% 5%, rgba(168,162,158,0.22) 0%, transparent 55%)',
          }}
        />
        {/* Smoke drift — top right */}
        <div
          className="absolute top-0 right-0 w-1/2 h-1/2 opacity-12 animate-float-delayed"
          style={{
            background:
              'radial-gradient(ellipse at 85% 0%, rgba(168,162,158,0.15) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* ── EMBER PARTICLES ─────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((s, i) => (
          <Ember key={i} style={s} />
        ))}
      </div>

      {/* ── LOGO — top ──────────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 z-20 px-5 sm:px-8 pt-5 sm:pt-7 flex items-center justify-between animate-fade-up opacity-0"
        style={{ animationFillMode: 'forwards' }}
      >
        <img
          src="/logo-icon.png"
          alt="Kip 'N Grill"
          className="h-10 sm:h-12 w-auto"
          style={{
            filter: 'brightness(1.05) drop-shadow(0 0 18px rgba(234,88,12,0.25))',
          }}
        />
        <span className="font-mono text-[9px] tracking-[0.35em] text-cream-50/25 uppercase hidden sm:block">
          Eindhoven · Est. 2024
        </span>
      </div>

      {/* ── MAIN CONTENT ────────────────────────────────────── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 w-full">

        {/* Eyebrow label */}
        <div
          className="flex items-center gap-3 mb-5 sm:mb-7 animate-fade-up opacity-0"
          style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
        >
          <div className="w-8 h-px bg-ember-500/70" />
          <span className="font-mono text-[10px] tracking-[0.35em] text-ember-500 uppercase">
            Foodtruck · Eindhoven
          </span>
        </div>

        {/* ── HEADLINE ── */}
        <div
          className="mb-5 sm:mb-7 animate-fade-up opacity-0"
          style={{ animationDelay: '0.28s', animationFillMode: 'forwards' }}
        >
          <h1 className="leading-none">
            {/* Line 1 */}
            <span
              className="font-display block text-cream-50 tracking-wide leading-[0.87]"
              style={{ fontSize: 'clamp(2.6rem, 9.5vw, 7.5rem)' }}
            >
              DE LEKKERSTE
            </span>

            {/* Line 2 — KIP — the visual anchor */}
            <span
              className="font-display block leading-[0.80] tracking-wide select-none"
              style={{
                fontSize: 'clamp(6rem, 23vw, 19rem)',
                color: '#ea580c',
                textShadow:
                  '0 0 60px rgba(234,88,12,0.4), 0 0 120px rgba(234,88,12,0.18), 0 2px 0 rgba(0,0,0,0.4)',
              }}
            >
              KIP
            </span>

            {/* Line 3 */}
            <span
              className="font-display block text-cream-50/85 tracking-wide leading-[0.87]"
              style={{ fontSize: 'clamp(2rem, 7.5vw, 6rem)' }}
            >
              VAN HET SPIT
            </span>
          </h1>
        </div>

        {/* Decorative divider */}
        <div
          className="flex items-center gap-3 mb-5 sm:mb-7 animate-fade-up opacity-0"
          style={{ animationDelay: '0.42s', animationFillMode: 'forwards' }}
        >
          <div className="h-px w-10 bg-gradient-to-r from-ember-500/80 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-ember-500/80 shrink-0" />
          <div className="h-px w-4 bg-ember-500/30" />
        </div>

        {/* Tagline */}
        <p
          className="font-serif text-lg sm:text-xl md:text-2xl text-cream-100/65 italic leading-relaxed max-w-sm sm:max-w-md mb-7 sm:mb-9 animate-fade-up opacity-0"
          style={{ animationDelay: '0.52s', animationFillMode: 'forwards' }}
        >
          Dagelijks vers van het spit — krokant van buiten, sappig van binnen.
        </p>

        {/* Feature pills */}
        <div
          className="flex flex-wrap gap-2 mb-9 sm:mb-11 animate-fade-up opacity-0"
          style={{ animationDelay: '0.63s', animationFillMode: 'forwards' }}
        >
          {pills.map((pill) => (
            <span
              key={pill}
              className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase border border-cream-50/12 text-cream-50/40 px-3 py-1.5 backdrop-blur-sm"
              style={{
                clipPath:
                  'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
              }}
            >
              {pill}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up opacity-0"
          style={{ animationDelay: '0.78s', animationFillMode: 'forwards' }}
        >
          <a
            href="#menu"
            className="group relative px-10 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(234,88,12,0.45)]"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            <span className="relative z-10">BEKIJK MENU</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#locaties"
            className="group relative px-10 py-4 border border-cream-50/20 text-cream-50/70 font-display text-lg tracking-[0.2em] hover:border-ember-500/50 hover:text-ember-400 transition-all duration-300"
            style={{
              clipPath:
                'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            VIND ONS
          </a>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ───────────────────────────────── */}
      <div className="absolute bottom-8 right-6 sm:right-10 z-10 flex flex-col items-center gap-3">
        <a
          href="#over-ons"
          className="flex flex-col items-center gap-3 text-cream-50/20 hover:text-ember-400 transition-colors duration-300 group"
        >
          <span
            className="font-mono text-[8px] tracking-[0.35em] uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <ChevronDown size={16} strokeWidth={1.5} className="animate-bounce" />
        </a>
      </div>

    </section>
  )
}
