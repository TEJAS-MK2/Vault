import { useEffect, useRef } from 'react'

type SignalFieldProps = { className?: string }

export default function SignalField({ className = '' }: SignalFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const finePointer = window.matchMedia('(pointer: fine)')
    let frame = 0
    let width = 0
    let height = 0
    let dpr = 1
    let pointerX = 0.5
    let pointerY = 0.5
    let targetX = 0.5
    let targetY = 0.5
    let visible = true
    let time = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = Math.max(1, bounds.width)
      height = Math.max(1, bounds.height)
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      if (!context) return
      context.clearRect(0, 0, width, height)
      const spacing = 34
      const influenceX = pointerX * width
      const influenceY = pointerY * height
      const radius = Math.min(width, height) * 0.48

      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          const dx = x - influenceX
          const dy = y - influenceY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const falloff = Math.max(0, 1 - distance / radius)
          const wave = Math.sin(distance * 0.026 - time) * 1.6 * falloff
          const offset = wave + Math.sin(x * 0.009 + time * 0.2) * 1.2
          const alpha = 0.12 + falloff * 0.34
          context.beginPath()
          context.fillStyle = `rgba(183, 242, 109, ${alpha})`
          context.arc(x + offset, y + offset * 0.4, 0.7 + falloff * 1.05, 0, Math.PI * 2)
          context.fill()
        }
      }
    }

    const animate = () => {
      if (!visible || reducedMotion.matches) return
      pointerX += (targetX - pointerX) * 0.045
      pointerY += (targetY - pointerY) * 0.045
      time += 0.012
      draw()
      frame = window.requestAnimationFrame(animate)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (!finePointer.matches) return
      const bounds = canvas.getBoundingClientRect()
      targetX = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
      targetY = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    }
    const onVisibility = () => {
      visible = document.visibilityState === 'visible'
      window.cancelAnimationFrame(frame)
      if (visible && !reducedMotion.matches) frame = window.requestAnimationFrame(animate)
    }
    const onMotionChange = () => {
      window.cancelAnimationFrame(frame)
      if (reducedMotion.matches) draw()
      else if (visible) frame = window.requestAnimationFrame(animate)
    }

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    canvas.addEventListener('pointermove', onPointerMove)
    document.addEventListener('visibilitychange', onVisibility)
    reducedMotion.addEventListener('change', onMotionChange)
    resize()
    if (!reducedMotion.matches) frame = window.requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      canvas.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('visibilitychange', onVisibility)
      reducedMotion.removeEventListener('change', onMotionChange)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className={`signal-field ${className}`} aria-hidden="true" />
}
