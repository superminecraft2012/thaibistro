import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import heroBg from '../assets/hero.jpg'
import heroMobile from '../assets/hero-mobile.jpg'

const EASE_OUT = [0.22, 1, 0.36, 1] as const

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7) % 80}%`,
  y: `${15 + (i * 11) % 70}%`,
  size: 1.5 + (i % 3) * 0.8,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}))

function LotusIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5c1.7 2 2.6 4.2 2.6 6.6 0 1.8-1 3.4-2.6 4.4-1.6-1-2.6-2.6-2.6-4.4C9.4 9.2 10.3 7 12 5z" />
      <path d="M9.4 11.7C7.9 10 5.9 9.1 3.6 9c-.2 2.3.6 4.5 2.3 6.1 1 1 2.3 1.6 3.6 1.9" />
      <path d="M14.6 11.7C16.1 10 18.1 9.1 20.4 9c.2 2.3-.6 4.5-2.3 6.1-1 1-2.3 1.6-3.6 1.9" />
      <path d="M12 16.5c2.6 1.3 5.8 1.4 8.5.1-1.3 2-3.6 3.4-6.5 3.4h-4c-2.9 0-5.2-1.4-6.5-3.4 2.7 1.3 5.9 1.2 8.5-.1z" />
    </svg>
  )
}

const FEATURES = [
  {
    label: 'Pickup & delivery',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
  },
  {
    label: 'Ready in ~20 min',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: '3 Seattle-area spots',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '30%'])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-start md:items-center overflow-hidden bg-tb-dark">
      {/* Full-bleed hero background with subtle parallax - portrait art on mobile, landscape at md+ */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{
          backgroundImage: `url(${heroMobile})`,
          filter: 'brightness(0.95) saturate(1.05)',
          y: bgY,
        }}
      />
      <motion.div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{
          backgroundImage: `url(${heroBg})`,
          filter: 'brightness(0.92) saturate(1.05)',
          y: bgY,
        }}
      />

      {/* Desktop: light left-to-right scrim so the gold mandala (left) stays visible, dish (right) reads */}
      <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-tb-dark/55 via-tb-dark/20 to-transparent" />

      {/* Mobile: top-to-bottom backdrop gradient - darker behind the headline (top) and at the
          bottom for depth, lighter in the middle so the mandala and dish stay visible */}
      <div
        className="absolute inset-0 md:hidden"
        style={{ background: 'linear-gradient(180deg, rgba(8,5,13,0.55) 0%, rgba(8,5,13,0.12) 46%, rgba(8,5,13,0.82) 100%)' }}
      />
      {/* Mobile: warm light-bloom behind the dish for atmosphere/depth */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/3 md:hidden pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 55% at 68% 92%, rgba(217,85,45,0.30) 0%, transparent 68%)' }}
      />

      {/* Bottom fade so next section blends in */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tb-dark to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark/60 to-transparent" />

      {/* Floating gold embers - disabled when reduced motion is preferred */}
      {!reduceMotion && PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-tb-gold pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [-6, 6, -6], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 pt-24 pb-28 sm:pt-24 sm:pb-20 w-full">
        <div className="max-w-xl">
          {/* Eyebrow - on mobile it gains a lotus ornament beneath it */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
            className="mb-5 sm:mb-6"
          >
            <p className="text-tb-gold/80 text-xs sm:text-sm font-medium tracking-[0.3em] sm:tracking-[0.25em] uppercase">
              Est. in Shoreline, WA
            </p>
            <div className="md:hidden flex items-center gap-3 max-w-[15rem] mt-3">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-tb-gold/40" />
              <LotusIcon className="w-5 h-5 text-tb-gold/70 shrink-0" />
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-tb-gold/40" />
            </div>
          </motion.div>

          <h1 className="font-display leading-[0.95] md:leading-[1.08] mb-5">
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
              className="block text-[clamp(3.25rem,15vw,4.25rem)] md:text-[4.5rem] font-bold text-tb-gold text-shadow"
            >
              Bold flavors,
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.52, ease: EASE_OUT }}
              className="block text-[clamp(3.25rem,15vw,4.25rem)] md:text-[4.5rem] font-bold text-white text-shadow"
            >
              timeless tradition.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75, ease: EASE_OUT }}
            className="text-white/80 md:text-white/70 text-base md:text-lg max-w-[300px] md:max-w-md mb-8 sm:mb-10 leading-[1.6] md:leading-relaxed"
          >
            A family-owned restaurant serving authentic Thai cuisine crafted with
            passion, premium ingredients, and timeless recipes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: EASE_OUT }}
            className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <motion.a
              href="#order"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: EASE_OUT }}
              className="group relative inline-flex items-center justify-center gap-2.5 text-white font-bold w-full sm:w-auto min-h-[64px] md:min-h-[52px] px-9 py-4 rounded-xl md:rounded shadow-lg shadow-tb-red/30 bg-[linear-gradient(90deg,#c9471f,#df5b2e)] hover:brightness-110 md:bg-none md:bg-tb-red md:hover:bg-tb-red-hover md:hover:brightness-100 transition-all hover:scale-105 active:scale-95 text-base tracking-wide uppercase overflow-hidden"
            >
              {/* Pulsing focus ring (looping) - only when motion is allowed */}
              {!reduceMotion && (
                <span className="absolute inset-0 rounded-xl md:rounded ring-2 ring-tb-red/40 animate-ping opacity-60 pointer-events-none" aria-hidden="true" />
              )}
              {/* Continuous shimmer sheen sweeping across the button */}
              {!reduceMotion && (
                <motion.span
                  className="absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                  aria-hidden="true"
                  animate={{ left: ['-40%', '140%'] }}
                  transition={{ duration: 2.6, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
                />
              )}
              {/* Soft glow halo to draw the eye */}
              <span className="absolute -inset-px rounded-xl md:rounded ring-1 ring-tb-gold/30 pointer-events-none" aria-hidden="true" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 relative">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="relative">Order Online</span>
            </motion.a>
          </motion.div>

          {/* Mobile: trust / convenience feature row with vertical dividers */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE_OUT }}
            className="md:hidden mt-7 grid grid-cols-3 rounded-xl border border-tb-gold/20 bg-tb-dark/30 backdrop-blur-sm overflow-hidden"
          >
            {FEATURES.map((f, i) => (
              <div
                key={f.label}
                className={`flex flex-col items-center text-center gap-1.5 px-2 py-4 ${i > 0 ? 'border-l border-tb-gold/20' : ''}`}
              >
                <span className="text-tb-gold">{f.icon}</span>
                <span className="text-white/85 text-[11px] leading-tight font-medium">{f.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Desktop: single-line microcopy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15, ease: EASE_OUT }}
            className="hidden md:block mt-5 text-white/55 text-sm tracking-wide text-balance leading-relaxed"
          >
            Pickup &amp; delivery · ready in ~20 min · 3 Seattle-area locations
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className={`absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 ${reduceMotion ? '' : 'animate-bounce'}`}
      >
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/60 rotate-45" />
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/30 rotate-45 -mt-1.5" />
      </motion.div>
    </section>
  )
}
