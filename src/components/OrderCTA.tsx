import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

// A machine-readable weekly schedule used to compute today's open/closed status.
// `days` uses JS getDay() numbering: 0 = Sun ... 6 = Sat. `open`/`close` are minutes
// from midnight (local time). It runs parallel to the human-readable `hours` rows,
// so index i in `schedule` matches index i in `hours` for "today" highlighting.
interface DayRange {
  days: number[]
  open: number
  close: number
}

interface OrderLocation {
  name: string
  address: string
  city: string
  phone: string
  tel: string
  hours: { days: string; time: string }[]
  schedule: DayRange[]
  orderUrl: string
  mapsUrl: string
}

const STD: DayRange[] = [
  { days: [1, 2, 3, 4], open: 11 * 60, close: 21 * 60 },
  { days: [5, 6], open: 11 * 60, close: 22 * 60 },
  { days: [0], open: 12 * 60, close: 21 * 60 },
]

const MILL_CREEK: DayRange[] = [
  { days: [1, 2, 3, 4], open: 11 * 60, close: 21 * 60 },
  { days: [5, 6], open: 11 * 60, close: 21 * 60 },
  { days: [0], open: 12 * 60, close: 21 * 60 },
]

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
    schedule: STD,
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
    schedule: STD,
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
    schedule: MILL_CREEK,
    orderUrl: 'https://thaibistromillcreek.com/',
    mapsUrl: 'https://maps.app.goo.gl/QCZzbXnWvHYLJikw7',
  },
]

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

function fmtTime(mins: number) {
  const h24 = Math.floor(mins / 60)
  const mm = mins % 60
  const ampm = h24 >= 12 ? 'PM' : 'AM'
  const h12 = ((h24 + 11) % 12) + 1
  return mm === 0 ? `${h12} ${ampm}` : `${h12}:${mm.toString().padStart(2, '0')} ${ampm}`
}

type OpenState = 'open' | 'soon' | 'closed'

interface TodayStatus {
  state: OpenState
  label: string
  detail: string
  todayIndex: number
}

// Resolve the current open/closed status from a weekly schedule using the
// visitor's local clock. Returns a `todayIndex` so the matching hours row can
// be highlighted, plus a short human label + detail for the status pill.
function getTodayStatus(schedule: DayRange[], now: Date): TodayStatus {
  const day = now.getDay()
  const mins = now.getHours() * 60 + now.getMinutes()
  const todayIndex = schedule.findIndex(r => r.days.includes(day))
  const today = todayIndex >= 0 ? schedule[todayIndex] : undefined

  if (today && mins >= today.open && mins < today.close) {
    return { state: 'open', label: 'Open now', detail: `until ${fmtTime(today.close)}`, todayIndex }
  }
  if (today && mins < today.open) {
    // Opens later today. Call it "soon" within 60 minutes so the dot reads amber.
    const state: OpenState = today.open - mins <= 60 ? 'soon' : 'closed'
    return { state, label: state === 'soon' ? 'Opens soon' : 'Closed', detail: `opens ${fmtTime(today.open)}`, todayIndex }
  }

  // Closed for the rest of today — find the next day that has hours.
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7
    const r = schedule.find(x => x.days.includes(d))
    if (r) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[d]
      return { state: 'closed', label: 'Closed', detail: `opens ${when} ${fmtTime(r.open)}`, todayIndex }
    }
  }
  return { state: 'closed', label: 'Closed', detail: '', todayIndex }
}

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

function ArrowIcon({ className = 'w-5 h-5 shrink-0' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
  )
}

// Colours for the live status pill, keyed by open state.
const STATUS_STYLES: Record<OpenState, { dot: string; text: string; ring: string }> = {
  open: { dot: 'bg-emerald-400', text: 'text-emerald-300', ring: 'ring-emerald-400/25' },
  soon: { dot: 'bg-amber-400', text: 'text-amber-300', ring: 'ring-amber-400/25' },
  closed: { dot: 'bg-white/40', text: 'text-white/55', ring: 'ring-white/10' },
}

function LocationCard({
  loc,
  index,
  now,
  reduceMotion,
}: {
  loc: OrderLocation
  index: number
  now: Date
  reduceMotion: boolean | null
}) {
  const status = getTodayStatus(loc.schedule, now)
  const s = STATUS_STYLES[status.state]

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.15 + index * 0.12, ease: EASE }}
      whileHover={reduceMotion ? undefined : { y: -6, transition: { duration: 0.25, ease: EASE } }}
      className="group flex flex-col bg-white/[0.03] border border-white/[0.07] rounded-xl overflow-hidden hover:border-tb-gold/40 hover:bg-white/[0.05] hover:shadow-xl hover:shadow-black/40 transition-colors duration-300"
    >
      {/* Centered location header - no photo, so the location name reads clearly */}
      <div className="flex flex-col items-center text-center px-5 pt-7 pb-5">
        <p className="text-white font-bold text-3xl font-display leading-tight">{loc.name}</p>

        {/* Live open/closed status */}
        <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.04] pl-2.5 pr-3 py-1 ring-1 ${s.ring}`}>
          <span className="relative flex h-2 w-2">
            {status.state === 'open' && !reduceMotion && (
              <span className={`absolute inline-flex h-full w-full rounded-full ${s.dot} opacity-60 animate-ping`} />
            )}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${s.dot}`} />
          </span>
          <span className={`text-xs font-semibold ${s.text}`}>{status.label}</span>
          {status.detail && <span className="text-xs text-white/45">· {status.detail}</span>}
        </div>
      </div>

      {/* Card body - the order action leads, details support */}
      <div className="flex flex-col flex-1 px-5 pb-5">

        {/* PRIMARY ACTION - placed high in the card so the eye lands on it first */}
        <motion.a
          href={loc.orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order online from Thai Bistro ${loc.name}`}
          whileTap={{ scale: 0.97 }}
          className="group/btn flex w-full items-center justify-center gap-2.5 bg-tb-red hover:bg-tb-red-hover text-white text-base font-bold py-4 min-h-[56px] rounded-xl shadow-lg shadow-tb-red/25 transition-all hover:scale-[1.02]"
        >
          <BagIcon />
          Order {loc.name}
          <ArrowIcon className="w-4 h-4 shrink-0 transition-transform group-hover/btn:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover/btn:translate-x-0" />
        </motion.a>
        <p className="text-center text-xs text-white/45 tracking-wide mt-2 mb-4">Pickup &amp; delivery available</p>

        <div className="h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/30 to-tb-gold/0 mb-4" />

        {/* Supporting details - quieter than the action above */}
        <div className="space-y-1 mt-auto">
          <motion.a
            href={loc.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.98 }}
            className="flex items-start gap-2.5 -mx-2 px-2 py-1.5 rounded-md text-white/65 hover:text-tb-gold hover:bg-white/[0.03] transition-colors"
          >
            <MapPinIcon />
            <span className="text-sm leading-snug">{loc.address}, {loc.city}</span>
          </motion.a>
          <motion.a
            href={`tel:${loc.tel}`}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 -mx-2 px-2 py-1.5 rounded-md text-white/65 hover:text-tb-gold hover:bg-white/[0.03] transition-colors"
          >
            <PhoneIcon />
            <span className="text-sm">{loc.phone}</span>
          </motion.a>
          <div className="flex items-start gap-2.5 -mx-2 px-2 py-1.5 text-white/65">
            <ClockIcon />
            <div className="text-sm space-y-0.5 min-w-0 flex-1">
              {loc.hours.map((h, hi) => {
                const isToday = hi === status.todayIndex
                return (
                  <div
                    key={h.days}
                    className={`flex gap-2 flex-wrap ${isToday ? 'text-white font-medium' : 'text-white/45'}`}
                  >
                    <span className="w-20 shrink-0">{isToday ? 'Today' : h.days}</span>
                    <span className="whitespace-nowrap">{h.time}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function OrderCTA() {
  const reduceMotion = useReducedMotion()
  // Resolved once per mount on the client (Vite SPA, no SSR) so every card shares
  // a single "now" reference for its open/closed status.
  const now = new Date()
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

          {/* Gold divider */}
          <motion.div
            className="mx-auto max-w-xs h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/60 to-tb-gold/0"
            initial={reduceMotion ? { opacity: 0 } : { scaleX: 0, opacity: 0 }}
            whileInView={reduceMotion ? { opacity: 1 } : { scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={reduceMotion ? { duration: 0.25, ease: EASE } : { duration: 0.9, delay: 0.18, ease: EASE }}
          />
        </div>

        {/* Location cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {locations.map((loc, i) => (
            <LocationCard key={loc.name} loc={loc} index={i} now={now} reduceMotion={reduceMotion} />
          ))}
        </div>
      </div>
    </section>
  )
}
