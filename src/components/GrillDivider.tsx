export default function GrillDivider() {
  return (
    <div className="relative h-20 sm:h-24 overflow-hidden">
      {/* Diagonal grill lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 8px,
              rgba(255, 251, 235, 1) 8px,
              rgba(255, 251, 235, 1) 9px
            )
          `,
        }}
      />
      {/* Center ember dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-2 h-2 rotate-45 bg-ember-500/30 animate-glow-pulse" />
      </div>
      {/* Side fades */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right, var(--soot) 0%, transparent 20%, transparent 80%, var(--soot) 100%)',
        }}
      />
    </div>
  )
}
