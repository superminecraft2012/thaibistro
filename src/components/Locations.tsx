import { motion } from 'framer-motion'
import AnimateIn from './AnimateIn'
import GoldOrnament from './GoldOrnament'

const locations = [
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
function ClockIcon() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

export default function Locations() {
  return (
    <section id="locations" className="relative bg-tb-dark py-24 md:py-32 overflow-hidden">
      {/* Diagonal texture at 5% */}
      <div className="absolute inset-0 diag-texture pointer-events-none" style={{ opacity: 0.03 }} />
      <div className="absolute inset-0 section-glow pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark to-transparent pointer-events-none" />
      {/* Corner ornaments */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-tb-gold/10 rounded-tl-lg pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-tb-gold/10 rounded-br-lg pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <AnimateIn className="text-center mb-14">
          <p className="text-tb-gold text-sm font-medium tracking-[0.2em] uppercase mb-3">Visit Us</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-5">Three Convenient Locations</h2>
          <GoldOrnament className="max-w-xs mx-auto" />
        </AnimateIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
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
              <div className="p-5 space-y-4">
                <a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2.5 text-white/70 hover:text-tb-gold transition-colors">
                  <MapPinIcon />
                  <div className="text-sm leading-relaxed">
                    <div>{loc.address}</div>
                    <div>{loc.city}</div>
                  </div>
                </a>
                <a href={`tel:${loc.tel}`} className="flex items-center gap-2.5 text-white/70 hover:text-tb-gold transition-colors">
                  <PhoneIcon />
                  <span className="text-sm">{loc.phone}</span>
                </a>
                <div className="flex items-start gap-2.5 text-white/70">
                  <ClockIcon />
                  <div className="text-sm space-y-1">
                    {loc.hours.map(h => (
                      <div key={h.days} className="flex gap-2">
                        <span className="text-white/40 w-20 shrink-0">{h.days}</span>
                        <span>{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  className="h-px bg-gradient-to-r from-tb-gold/0 via-tb-gold/40 to-tb-gold/0"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.12 }}
                />
                <a href={loc.orderUrl} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center bg-tb-red hover:bg-tb-red-hover text-white text-sm font-semibold py-2.5 rounded transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Order Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimateIn className="text-center mt-10" delay={0.3}>
          <a href="https://thaibistro.us/locations" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-tb-gold/80 hover:text-tb-gold text-sm font-medium transition-colors tracking-wide group">
            View All Locations on Map
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </AnimateIn>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-tb-dark to-transparent pointer-events-none" />
    </section>
  )
}
