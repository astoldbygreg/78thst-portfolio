'use client'

import { useState, useEffect } from 'react'

export default function IntroAnimation() {
  const [phase, setPhase] = useState<'in' | 'hold' | 'out' | 'done'>('in')

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem('intro-seen')) {
      setPhase('done')
      return
    }
    const t1 = setTimeout(() => setPhase('hold'), 800)   // text faded in
    const t2 = setTimeout(() => setPhase('out'), 2200)   // start fade out
    const t3 = setTimeout(() => {
      setPhase('done')
      sessionStorage.setItem('intro-seen', '1')
    }, 3200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0d0704',
        zIndex: 9000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase === 'out' ? 0 : 1,
        transition: phase === 'out' ? 'opacity 1s ease' : 'none',
        pointerEvents: phase === 'out' ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          color: '#f5f0eb',
          fontSize: 'clamp(1.4rem, 4vw, 2.8rem)',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          fontFamily: 'Georgia, "Times New Roman", serif',
          opacity: phase === 'in' ? 0 : 1,
          transition: 'opacity 0.9s ease',
        }}
      >
        78thSt
      </span>
    </div>
  )
}
