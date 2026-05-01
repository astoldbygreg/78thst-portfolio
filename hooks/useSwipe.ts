import { useEffect, useRef } from 'react'

export function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void) {
  const startX = useRef<number | null>(null)

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX
    }

    const onTouchEnd = (e: TouchEvent) => {
      if (startX.current === null) return
      const diff = startX.current - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) {
        if (diff > 0) onSwipeLeft()   // swipe left = next
        else onSwipeRight()            // swipe right = prev
      }
      startX.current = null
    }

    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [onSwipeLeft, onSwipeRight])
}
