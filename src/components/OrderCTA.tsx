import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface OrderLocation {
  name: string
  address: string
  city: string
  phone: string
  tel: string
  hours: { days: string; time: string }[]
  orderUrl: string
  mapsUrl: string
}

const locations: OrderLocation[] = [
  {
    name: 'Shoreline',
    address: '18336 Aurora Ave N #116',
    city: 'Shoreline, WA 98133',
    phone: '(206) 533-6200',
    tel: '+12065336200',
    hours: [
      { days: 'Mon – Thu', time: '11:00 AM – 9:00 PM' },
      { days: 'Fri – Sat', time: '11:00 AM – 10:00 PM' },
      { days: 'Sunday', time: '12:00 PM – 9:00 PM' },
    ],
    orderUrl: 'https://thaibistro-shoreline.orderfood.express/',
    mapsUrl: 'https://maps.app.goo.gl/BV74aiAYR69br5i99',
  },
  {
    name: 'Federal Way',
    address: '34817 Enchanted Pkwy S #k1-102',
    city: 'Federal Way, WA 98003',
    phone: '(253) 874-8800',
    tel: '+12538748800',
    hours: [
      { days: 'Mon – Thu', time: '11:00 AM – 9:00 PM' },
      { days: 'Fri – Sat', time: '11:00 AM – 10:00 PM' },
      { days: 'Sunday', time: '12:00 PM – 9:00 PM' },
    ],
    orderUrl: 'https://thaibistro-federalway.orderfood.express/',
    mapsUrl: 'https://maps.app.goo.gl/zKy7ym9tdmHpSenx6',
  },
  {
    name: 'Mill Creek',
    address: '1018 164th St SE Suite #A14',
    city: 'Mill Creek, WA 98012',
    phone: '(425) 787-9707',
    tel: '+14257879707',
    hours: [
      { days: 'Mon – Thu', time: '11:00 AM – 9:00 PM' },
      { days: 'Fri – Sat', time: '11:00 AM – 9:00 PM' },
      { days: 'Sunday', time: '12:00 PM – 9:00 PM' },
    ],
    orderUrl: 'https://thaibistromillcreek.com/',
    mapsUrl: 'https://maps.app.goo.gl/QCZzbXnWvHYLJikw7',
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
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
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
        className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,168,67,0.10) 0%, transparent 65%)' }}
      />

      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-tb-gold/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-tb-gold/10 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
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

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.15 + i * 0.12, ease: EASE }}
              whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }}
              className="group bg-white/[0.03] border border-white/[0.07] rounded-lg overflow-hidden hover:border-tb-gold/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/40 transition-colors duration-300"
            >
              {/* Card image */}
              <div className="relative overflow-hidden h-44">
                <img
                  src="https://static.spotapps.co/spots/7a/49cf33c8584852a63619508cf26a06/full"
                  alt={`Thai Bistro ${loc.name} storefront`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-tb-dark/90 via-tb-dark/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                  <div>
                    <p className="text-white font-bold text-lg font-display leading-tight">Thai Bistro</p>
                    <p className="text-tb-gold font-semibold text-sm tracking-wide">{loc.name}</p>
                  </div>
                  <img src="/images/logo-square.png" alt="Thai Bistro logo" className="h-10 w-auto object-contain rounded" />
                </div>
              </div>

              {/* Card body */}
              <div className="p-5 space-y-3 sm:space-y-4">
                <motion.a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                  whileTap={{ scale: 0.98 }}
                  className="flex items-start gap-2.5 -mx-2 px-2 py-1.5 rounded-md text-white/70 hover:text-tb-gold hover:bg-white/[0.03] transition-colors">
                  <MapPinIcon />
                  <div className="text-sm leading-relaxed">
                    <div>{loc.address}</div>
                    <div>{loc.city}</div>
                  </div>
                </motion.a>
                <motion.a href={`tel:${loc.tel}`}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2.5 -mx-2 px-2 py-2 rounded-md text-white/70 hover:text-tb-gold hover:bg-white/[0.03] transition-colors">
                  <PhoneIcon />
                  <span className="text-sm">{loc.phone}</span>
                </motion.a>
                <div className="flex items-start gap-2.5 text-white/70 px-0">
                  <ClockIcon />
                  <div className="text-sm space-y-1 min-w-0 flex-1">
                    {loc.hours.map(h => (
                      <div key={h.days} className="flex gap-2 flex-wrap">
                        <span className="text-white/40 w-20 shrink-0">{h.days}</span>
                        <span className="whitespace-nowrap">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  className="h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/40 to-tb-gold/0"
                  initial={reduceMotion ? { opacity: 0 } : { scaleX: 0 }}
                  whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.3 + i * 0.12 }}
                />
                <div className="space-y-2">
                  <motion.a href={loc.orderUrl} target="_blank" rel="noopener noreferrer"
                    whileTap={{ scale: 0.97 }}
                    className="flex w-full items-center justify-center gap-2.5 bg-tb-red hover:bg-tb-red-hover text-white text-base font-bold py-3.5 min-h-[52px] rounded-lg shadow-lg shadow-tb-red/20 transition-all hover:scale-[1.02]">
                    <BagIcon />
                    Order Online
                  </motion.a>
                  <p className="text-center text-xs text-white/45 tracking-wide">Pickup &amp; delivery available</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...reveal(16, 0.3)}
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mt-10"
        >
          <motion.a href="https://thaibistro.us/locations" target="_blank" rel="noopener noreferrer"
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 px-4 py-3 min-h-[48px] text-tb-gold/80 hover:text-tb-gold text-sm font-medium transition-colors tracking-wide group">
            View All Locations on Map
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
