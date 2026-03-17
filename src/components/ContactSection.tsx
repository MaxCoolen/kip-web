import { useState } from 'react'
import { Instagram, Mail, Phone, ArrowUpRight, Calendar } from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import BookingModal from './BookingModal'
import { useLanguage } from '../context/LanguageContext'
import { contact } from '../i18n/translations'

const contactLinks = [
  { icon: Instagram, key: 'Instagram', value: '@kipngrill', href: 'https://instagram.com/kipngrill', isExternal: true },
  { icon: Mail,      key: 'email',     value: 'kipngrill@gmail.com', href: 'mailto:kipngrill@gmail.com', isExternal: false },
  { icon: Phone,     key: 'phone',     value: '06 - 1868 2922', href: 'tel:+31618682922', isExternal: false },
]

export default function ContactSection() {
  const { ref, isVisible } = useScrollReveal()
  const [bookingOpen, setBookingOpen] = useState(false)
  const { lang } = useLanguage()
  const tx = contact[lang]

  return (
    <>
    {bookingOpen && <BookingModal onClose={() => setBookingOpen(false)} />}
    <section id="contact" className="relative bg-soot-900 py-24 sm:py-32 overflow-hidden">
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.2) 0%, transparent 70%)' }}
      />

      <div ref={ref} className="relative max-w-5xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-ember-500 uppercase block mb-4">
            {tx.label}
          </span>
          <h2 className={`font-display text-5xl sm:text-6xl md:text-7xl text-cream-50 tracking-wide mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {tx.heading1} <span className="text-ember-500">{tx.heading2}</span> {tx.heading3}
          </h2>
          <p className={`font-serif text-lg sm:text-xl italic text-cream-100/65 max-w-md mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            {tx.sub}
          </p>
        </div>

        {/* Booking CTA */}
        <div className={`mb-8 transition-all duration-1000 delay-100 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <button
            onClick={() => setBookingOpen(true)}
            className="group relative w-full flex items-center justify-center gap-3 px-10 py-5 bg-ember-500 text-cream-50 font-display text-xl tracking-[0.2em] overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(234,88,12,0.35)]"
            style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))' }}
          >
            <Calendar size={20} strokeWidth={1.5} className="relative z-10" />
            <span className="relative z-10">{tx.bookingBtn}</span>
            <div className="absolute inset-0 bg-ember-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>

        {/* Contact links */}
        <div className="space-y-4">
          {contactLinks.map((c, i) => {
            const label = c.key === 'email' ? tx.email : c.key === 'phone' ? tx.phone : 'Instagram'
            return (
              <a
                key={c.key}
                href={c.href}
                target={c.isExternal ? '_blank' : undefined}
                rel={c.isExternal ? 'noopener noreferrer' : undefined}
                className={`group flex items-center justify-between p-6 sm:p-8 border border-cream-50/5 bg-soot-800/30
                  hover:border-ember-500/30 hover:bg-soot-800/60 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${0.3 + i * 0.15}s`,
                  clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
                }}
              >
                <div className="flex items-center gap-5 sm:gap-8">
                  <div className="text-ember-500/50 group-hover:text-ember-400 transition-colors duration-300">
                    <c.icon size={28} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-display text-xl sm:text-2xl text-cream-50 tracking-wide group-hover:text-ember-400 transition-colors duration-300">
                      {label.toUpperCase()}
                    </p>
                    <p className="font-serif text-cream-100/65 text-base sm:text-lg mt-0.5">{c.value}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={22}
                  className="text-cream-50/10 group-hover:text-ember-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                />
              </a>
            )
          })}
        </div>
      </div>
    </section>
    </>
  )
}
