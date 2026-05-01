import Link from 'next/link'

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#1a0e08',
        color: '#f5f0eb',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 2rem',
        fontFamily: 'Georgia, "Times New Roman", serif',
      }}
    >
      {/* Back + brand */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem 2rem',
          zIndex: 20,
          background: 'linear-gradient(to bottom, rgba(26,14,8,0.95) 0%, transparent 100%)',
        }}
      >
        <Link
          href="/"
          style={{
            color: '#f5f0eb',
            textDecoration: 'none',
            fontSize: '0.75rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          All Work
        </Link>

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

        <div style={{ width: '5rem' }} />
      </div>

      {/* Content */}
      <div style={{ maxWidth: '600px', width: '100%', paddingTop: '4rem' }}>

        {/* About photo */}
        <div style={{ marginBottom: '2.5rem', width: '100%' }}>
          <img
            src="/about.jpg"
            alt="Greg Townes"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '2px',
            }}
          />
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontWeight: 'normal',
          }}
        >
          Greg Townes
        </h1>

        {/* Divider */}
        <div
          style={{
            width: '3rem',
            height: '1px',
            background: '#c9a87c',
            marginBottom: '2.5rem',
            marginTop: '1rem',
          }}
        />

        {/* Bio */}
        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.9',
            color: 'rgba(245,240,235,0.85)',
            marginBottom: '1.5rem',
          }}
        >
          Greg Townes is a portrait and lifestyle photographer based in New Jersey, with roots
          in Chicago, IL. His work spans commercial campaigns, editorial projects, and intimate
          portrait sessions — each image crafted with intention and a distinct visual voice.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.9',
            color: 'rgba(245,240,235,0.85)',
            marginBottom: '1.5rem',
          }}
        >
          Greg has collaborated with global brands including <em>Nike</em> and <em>Adidas</em>,
          and his work has been recognized in international publications. Whether shooting
          high-profile campaigns or personal projects, he brings the same level of care and
          precision to every frame.
        </p>

        <p
          style={{
            fontSize: '1.05rem',
            lineHeight: '1.9',
            color: 'rgba(245,240,235,0.85)',
            marginBottom: '3rem',
          }}
        >
          The name <em>78thSt</em> is rooted in where it all began — growing up on the 78th
          block in Chicago, a place that shaped his identity and continues to influence his
          perspective behind the lens.
        </p>

        {/* Social links */}
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {[
            { label: 'Instagram', href: 'https://www.instagram.com/78thst/' },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#c9a87c',
                textDecoration: 'none',
                fontSize: '0.75rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                borderBottom: '1px solid rgba(201,168,124,0.3)',
                paddingBottom: '0.2em',
              }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
