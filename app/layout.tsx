import type { Metadata } from 'next'
import './globals.css'
import IntroAnimation from '@/components/IntroAnimation'
import FilmGrain from '@/components/FilmGrain'

export const metadata: Metadata = {
  title: '78thSt — Photography',
  description: 'Freelance Photographer & Videographer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <IntroAnimation />
        <FilmGrain />
        {children}
      </body>
    </html>
  )
}
