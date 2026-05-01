'use client'

import { useEffect, useRef } from 'react'

export default function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Small canvas scaled up — much more efficient
    const W = 256
    const H = 256
    canvas.width = W
    canvas.height = H

    let animId: number
    let frame = 0

    const render = () => {
      frame++
      // Only redraw grain every 3 frames (~20fps) to save CPU
      if (frame % 3 === 0) {
        const imageData = ctx.createImageData(W, H)
        const data = imageData.data
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255
          data[i] = v
          data[i + 1] = v
          data[i + 2] = v
          data[i + 3] = 18  // very subtle alpha
        }
        ctx.putImageData(imageData, 0, 0)
      }
      animId = requestAnimationFrame(render)
    }

    render()
    return () => cancelAnimationFrame(animId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 998,
        opacity: 0.35,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
