import { useState, useRef, useEffect } from 'react'
import {
  X, Send, CheckCircle, AlertCircle,
  ChevronLeft, ChevronRight, ChevronDown, Plus, Minus, MapPin, CalendarDays,
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { booking } from '../i18n/translations'

const FORMSPREE_ID = 'https://formspree.io/f/xaqppkpo'

type Status = 'idle' | 'sending' | 'success' | 'error'

// tx is passed as a prop to sub-components to avoid calling useLanguage deep in tree
type BookingTx = typeof booking['nl']

function isSameDay(a: Date, b: Date) {
  return a.getDate() === b.getDate()
    && a.getMonth() === b.getMonth()
    && a.getFullYear() === b.getFullYear()
}

function formatDate(d: Date, locale: string) {
  return d.toLocaleDateString(locale, { day: 'numeric', month: 'short', year: 'numeric' })
}

// ── Collapsible multi-date picker ─────────────────────────────────────────────

function MultiDatePicker({
  selected, onChange, tx,
}: { selected: Date[]; onChange: (dates: Date[]) => void; tx: BookingTx }) {
  const [open, setOpen] = useState(false)
  const today = new Date(); today.setHours(0, 0, 0, 0)

  const [view, setView] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const year = view.getFullYear()
  const month = view.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const rawFirst = new Date(year, month, 1).getDay()
  const firstDay = rawFirst === 0 ? 6 : rawFirst - 1

  const cells = Array.from(
    { length: firstDay + daysInMonth },
    (_, i) => (i < firstDay ? null : i - firstDay + 1),
  )

  const toggle = (day: number) => {
    const date = new Date(year, month, day)
    if (date < today) return
    const exists = selected.some((d) => isSameDay(d, date))
    onChange(
      exists
        ? selected.filter((d) => !isSameDay(d, date))
        : [...selected, date].sort((a, b) => a.getTime() - b.getTime()),
    )
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 bg-soot-800 border transition-colors duration-200 ${
          open ? 'border-ember-500/40' : 'border-cream-50/10 hover:border-cream-50/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <CalendarDays size={15} strokeWidth={1.5} className="text-ember-500/60 shrink-0" />
          <span className="font-serif text-base text-cream-50/60">
            {selected.length === 0 ? tx.placeholders.datums : tx.datumSelected(selected.length)}
          </span>
        </div>
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={`text-cream-50/30 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="bg-soot-800 border border-cream-50/10 border-t-0 px-4 pb-4 pt-3">
          <div className="flex items-center justify-between mb-3">
            <button type="button" onClick={() => setView(new Date(year, month - 1, 1))} className="p-1 text-cream-50/30 hover:text-cream-50/70 transition-colors">
              <ChevronLeft size={14} strokeWidth={1.5} />
            </button>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-cream-50/50">
              {tx.months[month]} {year}
            </span>
            <button type="button" onClick={() => setView(new Date(year, month + 1, 1))} className="p-1 text-cream-50/30 hover:text-cream-50/70 transition-colors">
              <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          <div className="grid grid-cols-7 mb-1">
            {tx.days.map((d) => (
              <div key={d} className="text-center font-mono text-[9px] tracking-widest text-cream-50/30 py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {cells.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />
              const date = new Date(year, month, day)
              const isPast = date < today
              const isSelected = selected.some((d) => isSameDay(d, date))
              return (
                <button
                  key={day} type="button" onClick={() => toggle(day)} disabled={isPast}
                  title={isPast ? tx.pastDate : undefined}
                  className={`aspect-square flex items-center justify-center font-mono text-[11px] transition-all duration-150 rounded-sm ${
                    isPast
                      ? 'text-cream-50/15 cursor-not-allowed line-through decoration-cream-50/10'
                      : isSelected
                        ? 'bg-ember-500 text-cream-50 font-bold hover:bg-ember-600 cursor-pointer'
                        : 'text-cream-50/70 hover:bg-soot-700 hover:text-cream-50 cursor-pointer'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-2">
          {selected.map((date) => (
            <span key={date.toISOString()} className="inline-flex items-center gap-1 font-mono text-[9px] tracking-[0.1em] bg-ember-500/12 border border-ember-500/25 text-ember-400 px-2 py-1">
              {formatDate(date, tx.dateLocale)}
              <button type="button" onClick={() => onChange(selected.filter((d) => !isSameDay(d, date)))} className="text-ember-400/50 hover:text-ember-300 transition-colors ml-0.5">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Guests counter ────────────────────────────────────────────────────────────

const MIN_GUESTS = 50

function GuestsCounter({ value, onChange, gastenLabel }: { value: number; onChange: (n: number) => void; gastenLabel: string }) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => onChange(Math.max(MIN_GUESTS, value - 25))}
        className="w-9 h-9 flex items-center justify-center border border-cream-50/10 text-cream-50/40 hover:border-ember-500/40 hover:text-ember-400 transition-all duration-200 shrink-0"
        style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
      >
        <Minus size={13} strokeWidth={2} />
      </button>

      <div className="flex-1 relative">
        <input
          type="number"
          min={MIN_GUESTS}
          max={5000}
          value={value}
          onChange={(e) => onChange(Math.max(MIN_GUESTS, Math.min(5000, Number(e.target.value))))}
          className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-display text-2xl tracking-wider text-center px-3 py-2.5 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 font-serif text-xs text-cream-50/25 pointer-events-none">
          {gastenLabel}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onChange(Math.min(5000, value + 25))}
        className="w-9 h-9 flex items-center justify-center border border-cream-50/10 text-cream-50/40 hover:border-ember-500/40 hover:text-ember-400 transition-all duration-200 shrink-0"
        style={{ clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))' }}
      >
        <Plus size={13} strokeWidth={2} />
      </button>
    </div>
  )
}

// ── Address autocomplete (OpenStreetMap Nominatim — geen API key nodig) ───────

type Suggestion = { display_name: string; short: string }

function AddressAutocomplete({ value, onChange, placeholder }: { value: string; onChange: (val: string) => void; placeholder?: string }) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [open, setOpen] = useState(false)
  const debounce = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    onChange(val)
    if (debounce.current) clearTimeout(debounce.current)
    if (val.length < 3) { setSuggestions([]); setOpen(false); return }
    debounce.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(val)}&format=json&limit=5&addressdetails=1&countrycodes=nl`,
          { headers: { 'Accept-Language': 'nl', 'User-Agent': 'KipNGrill/1.0' } },
        )
        const data: Array<{ display_name: string }> = await res.json()
        const mapped = data.map((r) => ({
          display_name: r.display_name,
          short: r.display_name.split(',').slice(0, 3).join(', ').trim(),
        }))
        setSuggestions(mapped)
        setOpen(mapped.length > 0)
      } catch { /* fail silently */ }
    }, 400)
  }

  const select = (s: Suggestion) => {
    onChange(s.short); setSuggestions([]); setOpen(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin size={14} strokeWidth={1.5} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ember-500/50 pointer-events-none" />
        <input
          type="text" value={value} onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder ?? 'Begin met typen...'} required
          className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base pl-9 pr-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 placeholder:text-cream-50/20"
        />
      </div>
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 bg-soot-800 border border-cream-50/10 border-t-0 max-h-44 overflow-y-auto shadow-lg">
          {suggestions.map((s, i) => (
            <button
              key={i} type="button" onMouseDown={() => select(s)}
              className="w-full text-left px-4 py-2.5 border-b border-cream-50/5 last:border-b-0 hover:bg-soot-700 transition-colors"
            >
              <span className="block font-serif text-sm text-cream-50/80 leading-snug">{s.short}</span>
              <span className="block font-mono text-[10px] text-cream-50/30 truncate mt-0.5">{s.display_name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Simple field ──────────────────────────────────────────────────────────────

function Field({ label, name, value, onChange, type = 'text', required, placeholder }: {
  label: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; required?: boolean; placeholder?: string
}) {
  return (
    <div>
      <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        required={required} placeholder={placeholder}
        className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors duration-200 placeholder:text-cream-50/20"
      />
    </div>
  )
}

// ── Main modal ────────────────────────────────────────────────────────────────

export default function BookingModal({ onClose }: { onClose: () => void }) {
  const { lang } = useLanguage()
  const tx = booking[lang]

  const [form, setForm] = useState({ naam: '', email: '', telefoon: '', type: '', locatie: '', bericht: '' })
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [gasten, setGasten] = useState(MIN_GUESTS)
  const [status, setStatus] = useState<Status>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ID, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...form,
          gasten: `${gasten} ${tx.gastenLabel}`,
          datum: selectedDates.length > 0 ? selectedDates.map((d) => formatDate(d, tx.dateLocale)).join(', ') : '-',
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-soot-950/80 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-soot-900 border border-cream-50/8 shadow-[0_0_80px_rgba(234,88,12,0.08)]"
        style={{ clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))' }}
      >
        <div className="h-[2px] bg-gradient-to-r from-ember-500 via-ember-400 to-transparent" />

        <div className="p-6 sm:p-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] text-ember-500 uppercase block mb-2">{tx.label}</span>
              <h2 className="font-display text-4xl sm:text-5xl text-cream-50 tracking-wide leading-none">
                {tx.title1} <span className="text-ember-500">{tx.title2}</span>
              </h2>
            </div>
            <button onClick={onClose} className="text-cream-50/25 hover:text-cream-50/70 transition-colors p-1 mt-1" aria-label={tx.closeLabel}>
              <X size={22} strokeWidth={1.5} />
            </button>
          </div>

          {status === 'success' ? (
            <div className="text-center py-12">
              <CheckCircle size={52} className="text-ember-400 mx-auto mb-5" strokeWidth={1} />
              <h3 className="font-display text-3xl text-cream-50 tracking-wide mb-3">{tx.successTitle}</h3>
              <p className="font-serif text-cream-100/60 text-lg leading-relaxed">{tx.successBody}</p>
              <button onClick={onClose} className="mt-8 font-mono text-[10px] tracking-[0.25em] text-ember-400 hover:text-ember-300 uppercase transition-colors">
                {tx.closeBtn}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={tx.fields.naam} name="naam" value={form.naam} onChange={handleChange} required placeholder={tx.placeholders.naam} />
                <Field label={tx.fields.email} name="email" type="email" value={form.email} onChange={handleChange} required placeholder={tx.placeholders.email} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label={tx.fields.telefoon} name="telefoon" type="tel" value={form.telefoon} onChange={handleChange} required placeholder={tx.placeholders.telefoon} />
                <div>
                  <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">{tx.fields.type}</label>
                  <div className="relative">
                    <select
                      name="type" value={form.type} onChange={handleChange} required
                      className="w-full appearance-none bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="" className="bg-soot-800">{tx.placeholders.type}</option>
                      {tx.eventTypes.map((t) => <option key={t} value={t} className="bg-soot-800">{t}</option>)}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-cream-50/30 text-sm">▾</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">{tx.fields.datum}</label>
                <MultiDatePicker selected={selectedDates} onChange={setSelectedDates} tx={tx} />
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">
                  {tx.fields.gasten} <span className="normal-case text-cream-50/20">{tx.fields.gastenMin}</span>
                </label>
                <GuestsCounter value={gasten} onChange={setGasten} gastenLabel={tx.gastenLabel} />
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">{tx.fields.locatie}</label>
                <AddressAutocomplete value={form.locatie} onChange={(val) => setForm((p) => ({ ...p, locatie: val }))} placeholder={tx.placeholders.adres} />
              </div>

              <div>
                <label className="font-mono text-[10px] tracking-[0.2em] uppercase text-cream-50/40 block mb-2">{tx.fields.bericht}</label>
                <textarea
                  name="bericht" value={form.bericht} onChange={handleChange} rows={3}
                  placeholder={tx.placeholders.bericht}
                  className="w-full bg-soot-800 border border-cream-50/10 text-cream-50/85 font-serif text-base px-4 py-3 focus:border-ember-500/50 focus:outline-none transition-colors resize-none placeholder:text-cream-50/20"
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-3 text-ember-500/80 font-serif text-sm">
                  <AlertCircle size={16} strokeWidth={1.5} />
                  {tx.errorMsg}
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit" disabled={status === 'sending'}
                  className="group relative w-full sm:w-auto px-12 py-4 bg-ember-500 text-cream-50 font-display text-lg tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(234,88,12,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))' }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <Send size={16} strokeWidth={1.5} />
                    {status === 'sending' ? tx.submitSending : tx.submitIdle}
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
