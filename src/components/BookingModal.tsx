import { useState } from 'react'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'

// ── SETUP ─────────────────────────────────────────────────────────────────────
// 1. Ga naar https://formspree.io en maak een gratis account aan
// 2. Maak een nieuw formulier aan en kopieer het form-ID (bijv. "xabc1234")
// 3. Vervang 'JOUW_FORM_ID' hieronder met jouw eigen ID
// 4. Formspree stuurt elk ingevuld formulier direct naar jouw e-mailadres
const FORMSPREE_ID = 'JOUW_FORM_ID'
// ─────────────────────────────────────────────────────────────────────────────

const eventTypes = [
  'Bedrijfsfeest',
  'Bruiloft',
  'Verjaardag / Privéfeest',
  'Festival',
  'Markt',
  'Anders',
]

type Status = 'idle' | 'sending' | 'success' | 'error'

function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  required,
  placeholder,
}: {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 placeholder:text-cream-50/20"
      />
    </div>
  )
}

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    naam: '',
    email: '',
    telefoon: '',
    type: '',
    datum: '',
    locatie: '',
    bericht: '',
  })
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-soot-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-soot-900 border border-cream-50/8 shadow-[0_0_80px_rgba(234,88,12,0.08)]"
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
        }}
      >
        {/* Top ember accent */}
        <div className="h-[2px] bg-gradient-to-r from-ember-500 via-ember-400 to-transparent" />

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ember-500 uppercase block mb-2">
                // Boekingsaanvraag
              </span>
              <h2 className="font-display text-4xl sm:text-5xl text-cream-50 tracking-wide leading-none">
                BOEK <span className="text-ember-500">ONS</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-cream-50/25 hover:text-cream-50/70 transition-colors duration-200 p-1 mt-1"
              aria-label="Sluiten"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {/* ── SUCCESS STATE ── */}
          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle size={52} className="text-ember-400 mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-display text-3xl text-cream-50 tracking-wide mb-3">
                AANVRAAG ONTVANGEN
              </h3>
              <p className="font-serif text-cream-100/60 text-lg leading-relaxed">
                Bedankt! We nemen zo snel mogelijk contact met je op.
              </p>
              <button
                onClick={onClose}
                className="mt-8 font-mono text-[10px] tracking-[0.25em] text-ember-400 hover:text-ember-300 uppercase transition-colors"
              >
                Sluiten →
              </button>
            </div>
          ) : (
            /* ── FORM ── */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Naam + E-mail */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Naam *"
                  name="naam"
                  value={form.naam}
                  onChange={handleChange}
                  required
                  placeholder="Jan de Vries"
                />
                <Field
                  label="E-mail *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="jan@email.nl"
                />
              </div>

              {/* Telefoon + Type evenement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Telefoonnummer"
                  name="telefoon"
                  type="tel"
                  value={form.telefoon}
                  onChange={handleChange}
                  placeholder="06 12345678"
                />
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">
                    Type evenement
                  </label>
                  <div className="relative">
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="w-full appearance-none bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 cursor-pointer"
                    >
                      <option value="" className="bg-soot-800">
                        Kies een type...
                      </option>
                      {eventTypes.map((t) => (
                        <option key={t} value={t} className="bg-soot-800">
                          {t}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cream-50/30">
                      ▾
                    </div>
                  </div>
                </div>
              </div>

              {/* Datum + Locatie */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field
                  label="Datum / Periode"
                  name="datum"
                  value={form.datum}
                  onChange={handleChange}
                  placeholder="bijv. 15 juni 2025"
                />
                <Field
                  label="Locatie / Adres"
                  name="locatie"
                  value={form.locatie}
                  onChange={handleChange}
                  placeholder="bijv. Eindhoven Centrum"
                />
              </div>

              {/* Bericht */}
              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">
                  Bericht / Extra informatie
                </label>
                <textarea
                  name="bericht"
                  value={form.bericht}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Verwacht aantal gasten, specifieke wensen, vragen..."
                  className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 resize-none placeholder:text-cream-50/20"
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-center gap-3 text-ember-500/80 font-serif text-sm">
                  <AlertCircle size={16} strokeWidth={1.5} />
                  Er ging iets mis. Probeer opnieuw of mail ons direct op kipngrill@gmail.com.
                </div>
              )}

              {/* Submit */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="group relative w-full sm:w-auto px-12 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    clipPath:
                      'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                  }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send size={16} strokeWidth={1.5} />
                    {status === 'sending' ? 'VERSTUREN...' : 'VERSTUUR AANVRAAG'}
                  </span>
                  <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
