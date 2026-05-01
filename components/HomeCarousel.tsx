'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import NavDrawer from './NavDrawer'

type Gallery = { slug: string; name: string; cover: string }

export default function HomeCarousel({ galleries }: { galleries: Gallery[] }) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % galleries.length), [galleries.length])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + galleries.length) % galleries.length), [galleries.length])

  useEffect(() => {
    const id = setInterval(next, 8000)
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
        const n = galleries.length
        const prevIdx = (current - 1 + n) % n
        const nextIdx = (current + 1) % n
        return [prevIdx, current, nextIdx].map((idx) => {
          const g = galleries[idx]
          return (
            <div
              key={g.slug}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: idx === current ? 1 : 0,
                transition: 'opacity 1s ease',
                zIndex: idx === current ? 1 : 0,
              }}
            >
              <Image
                src={g.cover}
                alt={g.name}
                fill
                sizes="100vw"
                style={{ objectFit: 'contain' }}
                priority={idx === current}
              />
            </div>
          )
        })
      })()}

      {/* Gradient overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(26,14,8,0.35) 0%, transparent 25%, transparent 55%, rgba(26,14,8,0.9) 100%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      />

      {/* Top bar — brand + about link */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.75rem 2rem',
          zIndex: 20,
        }}
      >
        <NavDrawer />
        <span
          style={{
            color: '#f5f0eb',
            fontSize: '0.8rem',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            opacity: 0.75,
          }}
        >
          78thSt
        </span>
        <Link
          href="/about"
          style={{
            color: '#f5f0eb',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.65,
            width: '4rem',
            textAlign: 'right',
          }}
        >
          About
        </Link>
      </div>

      {/* Gallery name — clickable, bottom center */}
      <div
        style={{
          position: 'absolute',
          bottom: '14%',
          width: '100%',
          textAlign: 'center',
          zIndex: 20,
        }}
      >
        <Link href={`/${galleries[current]?.slug}`} style={{ textDecoration: 'none' }}>
          <h1
            style={{
              color: '#f5f0eb',
              fontSize: 'clamp(1.8rem, 4.5vw, 3.5rem)',
              fontFamily: 'Georgia, "Times New Roman", serif',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textShadow: '0 2px 24px rgba(0,0,0,0.6)',
              display: 'inline-block',
              borderBottom: '1px solid rgba(201,168,124,0.5)',
              paddingBottom: '0.25em',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
          >
            {galleries[current]?.name}
          </h1>
          <p
            style={{
              color: '#c9a87c',
              fontSize: '0.7rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              opacity: 0.8,
            }}
          >
            View Collection
          </p>
        </Link>
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
    transition: 'background 0.2s',
  }
}
