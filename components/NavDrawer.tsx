'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import galleryData from '@/lib/gallery-data.json'

type GalleryMeta = { slug: string; name: string }

export default function NavDrawer() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Close on Escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [])

  const currentSlug = pathname.replace(/^\//, '')

  return (
    <>
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open gallery menu"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '0.25rem 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
          width: '2.5rem',
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#f5f0eb', opacity: 0.7 }} />
        <span style={{ display: 'block', width: '22px', height: '1.5px', background: '#f5f0eb', opacity: 0.7 }} />
        <span style={{ display: 'block', width: '14px', height: '1.5px', background: '#f5f0eb', opacity: 0.7 }} />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.55)',
          zIndex: 100,
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: '260px',
          background: 'rgba(12,6,3,0.97)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid rgba(201,168,124,0.15)',
          zIndex: 101,
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.6rem 1.4rem 1rem',
            borderBottom: '1px solid rgba(201,168,124,0.12)',
            flexShrink: 0,
          }}
        >
          <Link
            href="/"
            style={{
              color: '#f5f0eb',
              textDecoration: 'none',
              fontSize: '0.65rem',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              opacity: 0.45,
            }}
          >
            78thSt
          </Link>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#f5f0eb',
              opacity: 0.4,
              fontSize: '1rem',
              lineHeight: 1,
              padding: '0.3rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            ✕
          </button>
        </div>

        {/* Gallery list */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.5rem 0',
            // Custom thin scrollbar
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(201,168,124,0.2) transparent',
          }}
        >
          {(galleryData as GalleryMeta[]).map((g) => {
            const active = currentSlug === g.slug
            return (
              <Link
                key={g.slug}
                href={`/${g.slug}`}
                style={{
                  display: 'block',
                  padding: '0.55rem 1.4rem',
                  color: active ? '#c9a87c' : '#f5f0eb',
                  textDecoration: 'none',
                  fontSize: '0.7rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  opacity: active ? 1 : 0.55,
                  borderLeft: active ? '2px solid #c9a87c' : '2px solid transparent',
                  transition: 'opacity 0.15s, color 0.15s',
                }}
              >
                {g.name}
              </Link>
            )
          })}
        </nav>

        {/* About at bottom */}
        <div
          style={{
            padding: '1rem 1.4rem 1.5rem',
            borderTop: '1px solid rgba(201,168,124,0.1)',
            flexShrink: 0,
          }}
        >
          <Link
            href="/about"
            style={{
              display: 'block',
              color: pathname === '/about' ? '#c9a87c' : '#f5f0eb',
              textDecoration: 'none',
              fontSize: '0.68rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              opacity: pathname === '/about' ? 1 : 0.45,
            }}
          >
            About
          </Link>
        </div>
      </div>
    </>
  )
}
