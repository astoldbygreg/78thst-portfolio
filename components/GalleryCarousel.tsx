'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavDrawer from './NavDrawer'

export default function GalleryCarousel({ photos, name }: { photos: string[]; name: string }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % photos.length), [photos.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + photos.length) % photos.length), [photos.length])

  useEffect(() => {
    const id = setInterval(next, 7000)
    return () => clearInterval(id)
  }, [next])

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [next, prev])

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#1a0e08', overflow: 'hidden' }}>

      {/* Image stack — only render prev / current / next (crossfade window) */}
      {(() => {
        const n = photos.length
        const prevIdx = (current - 1 + n) % n
        const nextIdx = (current + 1) % n
        return [prevIdx, current, nextIdx].map((idx) => (
          <div
            key={photos[idx]}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: idx === current ? 1 : 0,
              transition: 'opacity 0.9s ease',
              zIndex: idx === current ? 1 : 0,
            }}
          >
            <Image
              src={photos[idx]}
              alt={`${name} — ${idx + 1}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'contain' }}
              priority={idx === current}
            />
          </div>
        ))
      })()}

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,14,8,0.55) 0%, transparent 20%, transparent 65%, rgba(26,14,8,0.9) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          zIndex: 20,
        }}
      >
        <NavDrawer />

        <span
          style={{
            color: '#f5f0eb',
            fontSize: '0.75rem',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          78thSt
        </span>

        <span
          style={{
            color: '#c9a87c',
            fontSize: '0.8rem',
            letterSpacing: '0.1em',
            opacity: 0.85,
            minWidth: '4rem',
            textAlign: 'right',
          }}
        >
          {current + 1} / {photos.length}
        </span>
      </div>

      {/* Gallery name — bottom center */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          width: '100%',
          textAlign: 'center',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      >
        <h1
          style={{
            color: '#f5f0eb',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textShadow: '0 2px 24px rgba(0,0,0,0.7)',
          }}
        >
          {name}
        </h1>
      </div>

      {/* Prev arrow */}
      <button onClick={prev} aria-label="Previous" style={arrowStyle('left')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next arrow */}
      <button onClick={next} aria-label="Next" style={arrowStyle('right')}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '0.4rem',
          zIndex: 20,
          flexWrap: 'wrap',
          padding: '0 3rem',
        }}
      >
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Photo ${i + 1}`}
            style={{
              width: i === current ? '1.8rem' : '0.38rem',
              height: '0.38rem',
              borderRadius: '3px',
              background: i === current ? '#c9a87c' : 'rgba(245,240,235,0.3)',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              transition: 'all 0.35s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    [side]: '1.5rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 20,
    background: 'rgba(26,14,8,0.5)',
    border: '1px solid rgba(245,240,235,0.15)',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: '#f5f0eb',
    backdropFilter: 'blur(6px)',
  }
}
