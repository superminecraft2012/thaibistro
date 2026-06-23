import { useScroll, useSpring, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SignatureDishes from './components/SignatureDishes'
import Gallery from './components/Gallery'
import Locations from './components/Locations'
import Footer from './components/Footer'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <div className="min-h-screen bg-tb-dark">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-tb-gold origin-left z-[9999]"
        style={{ scaleX }}
      />
      <Navbar />
      <Hero />
      <About />
      <SignatureDishes />
      <Gallery />
      <Locations />
      <Footer />
    </div>
  )
}
