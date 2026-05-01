'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('sent')
      setForm({ name: '', email: '', message: '' })
    } else {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1a0e08',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 3rem',
      }}
    >
      {/* Top bar */}
      <div
        style={{
          position: 'fixed',
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
        <Link
          href="/"
          style={{
            color: '#f5f0eb',
            textDecoration: 'none',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          ← Back
        </Link>
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
        <div style={{ width: '4rem' }} />
      </div>

      {/* Form */}
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <h1
          style={{
            color: '#f5f0eb',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            fontFamily: 'Georgia, serif',
            marginBottom: '0.5rem',
          }}
        >
          Get in Touch
        </h1>
        <div
          style={{
            width: '2.5rem',
            height: '1px',
            background: '#c9a87c',
            marginBottom: '2.5rem',
          }}
        />

        {status === 'sent' ? (
          <div
            style={{
              color: '#c9a87c',
              fontSize: '0.85rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '2rem 0',
            }}
          >
            Message sent — I'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={labelStyle}>Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{ ...inputStyle, resize: 'none' }}
              />
            </div>

            {status === 'error' && (
              <p style={{ color: '#c9a87c', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                Something went wrong. Please try again.
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                background: 'transparent',
                border: '1px solid rgba(201,168,124,0.5)',
                color: '#c9a87c',
                padding: '0.85rem 2rem',
                fontSize: '0.7rem',
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                cursor: status === 'sending' ? 'default' : 'pointer',
                opacity: status === 'sending' ? 0.5 : 1,
                transition: 'all 0.2s',
                alignSelf: 'flex-start',
                fontFamily: 'Georgia, serif',
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  color: '#f5f0eb',
  fontSize: '0.65rem',
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  opacity: 0.5,
  marginBottom: '0.5rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'rgba(245,240,235,0.04)',
  border: 'none',
  borderBottom: '1px solid rgba(245,240,235,0.15)',
  color: '#f5f0eb',
  fontSize: '0.9rem',
  padding: '0.6rem 0',
  fontFamily: 'Georgia, serif',
  outline: 'none',
}
