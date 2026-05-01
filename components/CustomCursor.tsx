'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const move = (e: MouseEvent) => {
      dot.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      dot.style.opacity = '1'
    }

    const hide = () => { if (dot) dot.style.opacity = '0' }
    const show = () => { if (dot) dot.style.opacity = '1' }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: '#c9a87c',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        transform: 'translate(-100px, -100px)',
        transition: 'transform 0.06s ease-out, opacity 0.3s ease',
        mixBlendMode: 'difference',
      }}
    />
  )
}
