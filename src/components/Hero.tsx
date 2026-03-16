import { ChevronDown } from 'lucide-react'

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

export default function Hero() {
  const embers = Array.from({ length: 18 }, () => ({
    left: `${5 + Math.random() * 90}%`,
    animationDelay: `${Math.random() * 8}s`,
    animationDuration: `${5 + Math.random() * 6}s`,
    opacity: 0.3 + Math.random() * 0.7,
    transform: `scale(${0.5 + Math.random()})`,
  }))

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-soot-950">
        {/* Radial warm glow from bottom center — the "grill" */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[70%] opacity-40"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(234,88,12,0.25) 0%, rgba(245,158,11,0.08) 40%, transparent 70%)',
          }}
        />
        {/* Side vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(10,8,6,0.8) 100%)',
          }}
        />
        {/* Smoke drift */}
        <div
          className="absolute top-0 left-0 w-full h-1/2 opacity-20 animate-float"
          style={{
            background: 'radial-gradient(ellipse at 30% 0%, rgba(168,162,158,0.15) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute top-0 right-0 w-full h-1/2 opacity-15 animate-float-delayed"
          style={{
            background: 'radial-gradient(ellipse at 70% 0%, rgba(168,162,158,0.12) 0%, transparent 50%)',
          }}
        />
      </div>

      {/* Ember particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {embers.map((s, i) => (
          <Ember key={i} style={s} />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-5 sm:px-8 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-8 animate-scale-in">
          <img
            src="/logo-full.png"
            alt="Kip 'N Grill"
            className="mx-auto h-44 sm:h-60 md:h-72 lg:h-80 w-auto drop-shadow-[0_0_60px_rgba(234,88,12,0.2)]"
          />
        </div>

        {/* Tagline */}
        <p
          className="font-serif text-xl sm:text-2xl md:text-3xl text-cream-100/70 italic tracking-wide mb-4 animate-fade-up opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          Vers gegrilde kip van het spit
        </p>

        {/* Decorative line */}
        <div
          className="flex items-center justify-center gap-4 mb-10 animate-fade-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          <div className="h-px w-16 bg-gradient-to-r from-transparent to-ember-500/40" />
          <div className="w-2 h-2 rotate-45 bg-ember-500/60" />
          <div className="h-px w-16 bg-gradient-to-l from-transparent to-ember-500/40" />
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <a
            href="#menu"
            className="group relative px-10 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.3)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            <span className="relative z-10">BEKIJK MENU</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </a>
          <a
            href="#locaties"
            className="group relative px-10 py-4 border border-cream-50/20 text-cream-50/80 font-display text-lg tracking-[0.2em] hover:border-ember-500/50 hover:text-ember-400 transition-all duration-300"
            style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
          >
            VIND ONS
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#over-ons"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-cream-50/20 hover:text-ember-400 transition-colors duration-300 animate-bounce"
      >
        <ChevronDown size={28} strokeWidth={1} />
      </a>

      {/* Bottom gradient into content */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-soot-900 to-transparent" />
    </section>
  )
}
