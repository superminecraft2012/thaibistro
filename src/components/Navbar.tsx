import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Order', href: '#order', id: 'order' },
]

function OrderBagIcon({ className }: { className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map(l => l.id))
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Esc-to-close for the mobile menu.
  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // Lock body scroll while the mobile menu is open; always clean up.
  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [menuOpen])

  // Stagger config respects reduced-motion (no delay cascade, instant items).
  const menuContainerVariants = {
    open: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.06, delayChildren: 0.08 },
    },
    closed: {
      transition: reduceMotion
        ? {}
        : { staggerChildren: 0.03, staggerDirection: -1 },
    },
  }

  const menuItemVariants: Variants = reduceMotion
    ? {
        open: { opacity: 1 },
        closed: { opacity: 0 },
      }
    : {
        open: {
          opacity: 1,
          y: 0,
          transition: { type: 'spring', stiffness: 400, damping: 32 },
        },
        closed: { opacity: 0, y: -8 },
      }

  return (
    <motion.nav
      initial={reduceMotion ? false : { y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-tb-dark/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-tb-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <motion.a
          href="#home"
          className="shrink-0"
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.93 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          <img
            src="/images/logo.png"
            alt="Thai Bistro"
            className="h-10 md:h-12 w-auto object-contain rounded"
          />
        </motion.a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => {
            const isActive = active === link.id
            return (
              <li key={link.label} className="relative">
                <a
                  href={link.href}
                  className={`text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
                    isActive ? 'text-tb-gold' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-tb-gold"
                    transition={
                      reduceMotion
                        ? { duration: 0 }
                        : { type: 'spring', stiffness: 380, damping: 30 }
                    }
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA button */}
        <a
          href="#order"
          aria-label="Order online - pick your location"
          className="hidden md:inline-flex items-center gap-2 bg-tb-red hover:bg-tb-red-hover text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-all hover:scale-105 active:scale-95 tracking-wide ring-1 ring-tb-gold/50 hover:ring-tb-gold shadow-lg shadow-tb-red/30 hover:shadow-tb-red/50"
        >
          <OrderBagIcon className="w-4 h-4" />
          Order Online
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col items-center justify-center text-tb-gold w-11 h-11 -mr-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <motion.span
            className="block w-6 h-0.5 bg-current rounded-full"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-current rounded-full my-1.5"
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeInOut' }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-current rounded-full"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeInOut' }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-tb-dark/98 border-t border-tb-border overflow-hidden"
          >
            <motion.ul
              className="flex flex-col gap-1 px-6 py-4"
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {NAV_LINKS.map(link => (
                <motion.li key={link.label} variants={menuItemVariants}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center min-h-[44px] text-base font-medium tracking-wide uppercase transition-colors active:bg-white/5 rounded-md px-1 ${
                      active === link.id ? 'text-tb-gold' : 'text-tb-gold/70 hover:text-tb-gold'
                    }`}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li className="pt-3" variants={menuItemVariants}>
                <a
                  href="#order"
                  aria-label="Order online - pick your location"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full items-center justify-center gap-2 min-h-[44px] bg-tb-red hover:bg-tb-red-hover active:scale-[0.98] text-white text-base font-semibold px-5 py-3.5 rounded-md transition-all tracking-wide ring-1 ring-tb-gold/50 shadow-lg shadow-tb-red/30"
                >
                  <OrderBagIcon className="w-5 h-5" />
                  Order Online
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
