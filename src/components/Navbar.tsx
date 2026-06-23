import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../hooks/useActiveSection'

const NAV_LINKS = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Menu', href: '#menu', id: 'menu' },
  { label: 'Gallery', href: '#gallery', id: 'gallery' },
  { label: 'Location', href: '#locations', id: 'locations' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(NAV_LINKS.map(l => l.id))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-tb-dark/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-tb-border' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="#home" className="shrink-0">
          <img
            src="/images/logo.png"
            alt="Thai Bistro"
            className="h-10 md:h-12 w-auto object-contain rounded"
          />
        </a>

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
                    className="absolute -bottom-1 left-0 right-0 h-px bg-tb-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* CTA button */}
        <a
          href="https://thaibistro-shoreline.orderfood.express/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-tb-red hover:bg-tb-red-hover text-white text-sm font-semibold px-5 py-2.5 rounded transition-all hover:scale-105 active:scale-95 tracking-wide"
        >
          Order Online
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all mb-1.5 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <div className={`w-6 h-0.5 bg-current transition-all origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-tb-dark/98 border-t border-tb-border overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`block text-sm font-medium tracking-wide uppercase py-2 transition-colors ${
                      active === link.id ? 'text-tb-gold' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="https://thaibistro-shoreline.orderfood.express/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex bg-tb-red hover:bg-tb-red-hover text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors tracking-wide"
                >
                  Order Online
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
