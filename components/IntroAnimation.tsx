'use client'

import { useState, useEffect } from 'react'

export default function IntroAnimation() {
  const [show, setShow] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('intro-seen')) return

    // Small delay ensures the component is fully painted before animating
    const t0 = setTimeout(() => setShow(true), 50)
    const t1 = setTimeout(() => setHiding(true), 2400)
    const t2 = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('intro-seen', '1')
    }, 3400)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!show) return null

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
        opacity: hiding ? 0 : 1,
        transition: hiding ? 'opacity 1s ease' : 'none',
        pointerEvents: hiding ? 'none' : 'auto',
      }}
    >
      <span
        style={{
          color: '#f5f0eb',
          fontSize: 'clamp(1.4rem, 4vw, 2.8rem)',
          letterSpacing: '0.55em',
          textTransform: 'uppercase',
          fontFamily: 'Georgia, "Times New Roman", serif',
          animation: 'introText 1s ease 0.2s both',
        }}
      >
        78thSt
      </span>
    </div>
  )
}
