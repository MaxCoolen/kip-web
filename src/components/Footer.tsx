export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-soot-950 border-t border-cream-50/5 py-12">
      {/* Grill mark pattern across top */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(234,88,12,0.15) 8px, rgba(234,88,12,0.15) 16px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo + copyright */}
          <div className="flex items-center gap-4">
            <img
              src="/logo-icon.png"
              alt="Kip 'N Grill"
              className="h-8 w-auto opacity-40"
            />
            <div className="h-4 w-px bg-cream-50/10" />
            <span className="font-mono text-xs text-cream-50/20 tracking-wider">
              &copy; {year} KIP 'N GRILL
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="#"
              className="font-mono text-xs tracking-wider text-cream-50/20 hover:text-ember-400 transition-colors duration-300"
            >
              PRIVACY
            </a>
            <a
              href="#"
              className="font-mono text-xs tracking-wider text-cream-50/20 hover:text-ember-400 transition-colors duration-300"
            >
              VOORWAARDEN
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
