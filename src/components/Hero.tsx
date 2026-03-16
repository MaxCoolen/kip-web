import { ChevronDown } from 'lucide-react'

function Ember({ style }: { style: React.CSSProperties }) {
  return (
    <div
      className="absolute w-1.5 h-1.5 rounded-full animate-rise"
      style={{
        background: 'radial-gradient(circle, #fbbf24, #ea580c)',
        boxShadow: '0 0 8px 3px rgba(245,158,11,0.5)',
        ...style,
      }}
    />
  )
}

export default function Hero() {
  // Embers concentrated in the center-lower zone — aligned with the fire in the photo
  const embers = Array.from({ length: 22 }, () => ({
    left: `${25 + Math.random() * 50}%`,
    top: `${48 + Math.random() * 30}%`,
    animationDelay: `${Math.random() * 9}s`,
    animationDuration: `${4 + Math.random() * 6}s`,
    opacity: 0.4 + Math.random() * 0.6,
    transform: `scale(${0.4 + Math.random() * 0.9})`,
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* ── BACKGROUND ── */}
      <div className="absolute inset-0">

        {/* Photo — object-position shows chickens on spit + fire below */}
        <img
          src="/hero-bg.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 38%' }}
        />

        {/* Base darkening — very subtle, image is already moody */}
        <div className="absolute inset-0 bg-soot-950/45" />

        {/* Top gradient — deep dark so logo reads clearly */}
        <div
          className="absolute top-0 left-0 right-0 h-[65%]"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,8,6,0.92) 0%, rgba(10,8,6,0.55) 35%, rgba(10,8,6,0.1) 70%, transparent 100%)',
          }}
        />

        {/* Bottom fade — blends into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-soot-900 to-transparent" />

        {/* Side vignette — keeps eye centered on the fire */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, transparent 38%, rgba(10,8,6,0.65) 100%)',
          }}
        />

        {/* Ember glow overlay — blends with the actual flames in the photo */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[100%] h-[55%] opacity-50"
          style={{
            background:
              'radial-gradient(ellipse at 50% 80%, rgba(234,88,12,0.22) 0%, rgba(245,158,11,0.06) 45%, transparent 70%)',
          }}
        />

        {/* Subtle smoke drift at top */}
        <div
          className="absolute top-0 left-0 w-full h-2/5 opacity-15 animate-float"
          style={{
            background:
              'radial-gradient(ellipse at 35% 0%, rgba(168,162,158,0.18) 0%, transparent 55%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-2/3 h-1/3 opacity-10 animate-float-delayed"
          style={{
            background:
              'radial-gradient(ellipse at 70% 0%, rgba(168,162,158,0.12) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* ── EMBER PARTICLES — rise from the fire zone ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((s, i) => (
          <Ember key={i} style={s} />
        ))}
      </div>

      {/* ── CONTENT ── */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto">

        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <img
            src="/logo-full.png"
            alt="Kip 'N Grill"
            className="mx-auto h-44 sm:h-60 md:h-72 lg:h-80 w-auto"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(234,88,12,0.35)) drop-shadow(0 0 80px rgba(234,88,12,0.15))',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          className="font-serif text-xl sm:text-2xl md:text-3xl text-cream-100/80 italic tracking-wide mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          Vers gegrilde kip van het spit
        </p>

        {/* Decorative divider */}
        <div
          className="flex items-center justify-center gap-4 mb-10 animate-fade-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-ember-500/50" />
          <div className="w-2 h-2 rotate-45 bg-ember-500/70" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-ember-500/50" />
        </div>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <a
            href="#menu"
            className="group relative px-10 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(234,88,12,0.5)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <span className="relative z-10">BEKIJK MENU</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#locaties"
            className="group relative px-10 py-4 border border-cream-50/25 text-cream-50/85 font-display text-lg tracking-[0.2em] hover:border-ember-500/60 hover:text-ember-400 transition-all duration-300 backdrop-blur-[2px]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            VIND ONS
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#over-ons"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream-50/25 hover:text-ember-400 transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={28} strokeWidth={1} />
      </a>

    </section>
  )
}
