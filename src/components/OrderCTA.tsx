import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface OrderLocation {
  name: string
  address: string
  city: string
  orderUrl: string
}

const locations: OrderLocation[] = [
  {
    name: 'Shoreline',
    address: '18336 Aurora Ave N #116',
    city: 'Shoreline, WA',
    orderUrl: 'https://thaibistro-shoreline.orderfood.express/',
  },
  {
    name: 'Federal Way',
    address: '34817 Enchanted Pkwy S #k1-102',
    city: 'Federal Way, WA',
    orderUrl: 'https://thaibistro-federalway.orderfood.express/',
  },
  {
    name: 'Mill Creek',
    address: '1018 164th St SE Suite #A14',
    city: 'Mill Creek, WA',
    orderUrl: 'https://thaibistromillcreek.com/',
  },
]

function BagIcon({ className = 'w-5 h-5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
    </svg>
  )
}

export default function OrderCTA() {
  const reduceMotion = useReducedMotion()
  const reveal = (y: number, delay: number, duration = 0.6) =>
    reduceMotion
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.25, ease: EASE } }
      : { initial: { opacity: 0, y }, whileInView: { opacity: 1, y: 0 }, transition: { duration, delay, ease: EASE } }

  return (
    <section
      id="order"
      className="relative bg-tb-dark py-24 md:py-32 overflow-hidden"
      style={{ scrollMarginTop: '5rem' }}
    >
      {/* Diagonal texture + section glow to match the site language */}
      <div className="absolute inset-0 diag-texture pointer-events-none" style={{ opacity: 0.03 }} />
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-dark to-transparent pointer-events-none" />

      {/* Soft gold glow behind the heading */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 65%)' }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-tb-gold/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-tb-gold/10 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading block */}
        <div className="text-center mb-12 md:mb-14">
          <motion.p
            {...reveal(24, 0)}
            viewport={{ once: true, margin: '-80px' }}
            className="text-tb-gold text-sm font-medium tracking-[0.25em] uppercase mb-3"
          >
            Order Online
          </motion.p>
          <motion.h2
            {...reveal(32, 0.08, 0.65)}
            viewport={{ once: true, margin: '-80px' }}
            className="font-display text-3xl md:text-5xl font-bold text-white mb-5"
          >
            Skip the wait. <span className="text-tb-gold-light">Order ahead.</span>
          </motion.h2>

          {/* Gold divider */}
          <motion.div
            className="mx-auto max-w-xs h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/60 to-tb-gold/0"
            initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
            whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={reduceMotion ? { duration: 0.25, ease: EASE } : { duration: 0.9, delay: 0.18, ease: EASE }}
          />

          <motion.div
            {...reveal(20, 0.24)}
            viewport={{ once: true, margin: '-80px' }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-white/60 text-sm"
          >
            <span className="inline-flex items-center gap-2">
              <BagIcon className="w-4 h-4 shrink-0 text-tb-gold" />
              Pickup &amp; delivery
            </span>
            <span className="inline-flex items-center gap-2">
              <ClockIcon />
              Ready in ~20 min
            </span>
            <span className="inline-flex items-center gap-2">
              <TruckIcon />
              Delivered to your door
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={reduceMotion ? { duration: 0.25, ease: EASE } : { duration: 0.6, delay: 0.32, ease: EASE }}
            className="mt-6 text-white/45 text-sm tracking-wide"
          >
            Choose your location to start your order
          </motion.p>
        </div>

        {/* Location picker */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {locations.map((loc, i) => (
            <motion.a
              key={loc.name}
              href={loc.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Order online from Thai Bistro ${loc.name}`}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
              whileInView={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={
                reduceMotion
                  ? { duration: 0.25, ease: EASE }
                  : { duration: 0.65, delay: 0.15 + i * 0.12, ease: EASE }
              }
              whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              className="group relative flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-xl p-6 sm:p-7 overflow-hidden hover:border-tb-gold/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/40 transition-colors duration-300 tap-highlight-none"
            >
              {/* Top gold accent line that grows in on view */}
              <motion.div
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/50 to-tb-gold/0"
                initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
                whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
                viewport={{ once: true }}
                transition={reduceMotion ? { duration: 0.25, ease: EASE } : { duration: 0.9, delay: 0.3 + i * 0.12, ease: EASE }}
              />

              <p className="text-tb-gold text-xs font-medium tracking-[0.2em] uppercase mb-1">Thai Bistro</p>
              <h3 className="font-display text-2xl font-bold text-white leading-tight mb-2 group-hover:text-tb-gold-light transition-colors">
                {loc.name}
              </h3>
              <p className="text-white/55 text-sm leading-relaxed mb-6">
                {loc.address}
                <br />
                {loc.city}
              </p>

              <span className="mt-auto inline-flex w-full items-center justify-center gap-2.5 min-h-[3.25rem] bg-tb-red group-hover:bg-tb-red-hover text-white text-base font-bold rounded-lg shadow-lg shadow-tb-red/20 transition-all group-hover:scale-[1.02] group-active:scale-[0.98]">
                <BagIcon />
                Order Online
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
