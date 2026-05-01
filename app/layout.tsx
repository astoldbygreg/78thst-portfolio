import type { Metadata } from 'next'
import './globals.css'
import IntroAnimation from '@/components/IntroAnimation'
import FilmGrain from '@/components/FilmGrain'
import CustomCursor from '@/components/CustomCursor'

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
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
