import { useState, useEffect } from 'react'

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  // Keep a stable string key so consumers can pass a fresh array each render
  // without re-creating observers on every render.
  const key = ids.join('|')

  useEffect(() => {
    const currentIds = key.split('|')
    // Tighter top margin + wider bottom margin works better on short mobile
    // viewports where sections occupy most of the screen.
    const isMobile =
      typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches
    const rootMargin = isMobile ? '-20% 0px -70% 0px' : '-35% 0px -60% 0px'

    const observers = currentIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id)
        },
        { rootMargin }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [key])

  return active
}
