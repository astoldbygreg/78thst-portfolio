import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '78th St — Photography',
  description: 'Freelance Photographer & Videographer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
