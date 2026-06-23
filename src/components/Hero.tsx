import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: `${10 + (i * 7) % 80}%`,
  y: `${15 + (i * 11) % 70}%`,
  size: 1.5 + (i % 3) * 0.8,
  delay: i * 0.4,
  duration: 4 + (i % 4),
}))

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} id="home" className="relative min-h-screen flex items-center overflow-hidden bg-tb-dark">
      {/* Diagonal texture at 5% */}
      <div className="absolute inset-0 diag-texture pointer-events-none" style={{ opacity: 0.03 }} />

      {/* Parallax food photo */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://static.spotapps.co/spots/b5/db83fd4a254d978ac5047d35b95d8e/full')`,
          filter: 'brightness(0.65) saturate(1.3)',
          y: bgY,
        }}
      />
      {/* Smooth left-to-right gradient blending photo into dark bg */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-tb-dark via-tb-dark/75 to-transparent" />
      {/* Bottom fade so next section blends in */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-tb-dark to-transparent" />
      {/* Top fade */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-tb-dark/60 to-transparent" />

      {/* Floating gold particles */}
      {PARTICLES.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-tb-gold pointer-events-none"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [-6, 6, -6], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-tb-gold/80 text-sm font-medium tracking-[0.25em] uppercase mb-6"
          >
            Est. in Shoreline, WA
          </motion.p>

          <h1 className="font-display leading-tight mb-5">
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="block text-5xl md:text-[4.5rem] font-bold text-tb-gold text-shadow"
            >
              Authentic Thai.
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -48, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="block text-5xl md:text-[4.5rem] font-bold text-white text-shadow"
            >
              Made with Heart.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="text-white/65 text-base md:text-lg max-w-md mb-10 leading-relaxed"
          >
            A family-owned restaurant serving traditional Thai cuisine crafted with
            passion, premium ingredients, and timeless recipes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#menu"
              className="inline-flex items-center gap-2 border border-tb-gold/60 hover:border-tb-gold text-tb-gold hover:bg-tb-gold/10 font-semibold px-7 py-3.5 rounded transition-all hover:scale-105 active:scale-95 text-sm tracking-wide">
              View Our Menu
            </a>
            <a href="https://thaibistro.us/reservations" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-tb-red hover:bg-tb-red-hover text-white font-semibold px-7 py-3.5 rounded transition-all hover:scale-105 active:scale-95 text-sm tracking-wide">
              Reserve a Table
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 animate-bounce"
      >
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/60 rotate-45" />
        <div className="w-3 h-3 border-r-2 border-b-2 border-tb-gold/30 rotate-45 -mt-1.5" />
      </motion.div>
    </section>
  )
}
