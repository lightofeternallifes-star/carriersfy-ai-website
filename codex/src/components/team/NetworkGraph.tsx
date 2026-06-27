import { useEffect, useRef, useCallback } from 'react'
import { colors } from '../../design-system/tokens'

interface Node {
  id: string
  label: string
  initial: string
  x: number
  y: number
  radius: number
  color: string
  isCenter: boolean
}

interface Particle {
  nodeFrom: number
  nodeTo: number
  t: number
  speed: number
}

export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const mouseRef = useRef<{ x: number; y: number }>({ x: -999, y: -999 })

  const buildNodes = useCallback((w: number, h: number): Node[] => {
    const cx = w / 2
    const cy = h / 2
    const r = Math.min(w, h) * 0.34
    const team = [
      { id: 'sophia', label: 'Sophia', initial: 'S', color: colors.blue },
      { id: 'atlas', label: 'Atlas', initial: 'A', color: colors.red },
      { id: 'nova', label: 'Nova', initial: 'N', color: colors.blue },
      { id: 'titan', label: 'Titan', initial: 'T', color: colors.red },
      { id: 'orion', label: 'Orion', initial: 'O', color: colors.blue },
      { id: 'echo', label: 'Echo', initial: 'E', color: colors.red },
    ]
    const nodes: Node[] = team.map((emp, i) => {
      const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
      return {
        ...emp,
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        radius: 28,
        isCenter: false,
      }
    })
    nodes.unshift({
      id: 'iron-prime',
      label: 'Iron Prime',
      initial: '✦',
      x: cx,
      y: cy,
      radius: 40,
      color: colors.gold,
      isCenter: true,
    })
    return nodes
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ctx = canvas.getContext('2d') as any
    if (!ctx) return

    let nodes: Node[] = []
    const particles: Particle[] = []

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      nodes = buildNodes(canvas.width, canvas.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement!)

    // Seed particles
    for (let i = 0; i < 18; i++) {
      particles.push({
        nodeFrom: 0,
        nodeTo: 1 + (i % 6),
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.003,
      })
    }

    const drawGradCircle = (node: Node, bright: boolean) => {
      const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius)
      const base = node.color
      grad.addColorStop(0, base + (bright ? 'ff' : 'cc'))
      grad.addColorStop(1, base + '44')
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.fill()
      // Glow ring
      ctx.beginPath()
      ctx.arc(node.x, node.y, node.radius + 4, 0, Math.PI * 2)
      ctx.strokeStyle = base + (bright ? '60' : '30')
      ctx.lineWidth = 1.5
      ctx.stroke()
      // Label
      ctx.fillStyle = '#070B16'
      ctx.font = `bold ${node.isCenter ? 20 : 14}px 'Space Grotesk', sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(node.initial, node.x, node.y)
      // Name below
      ctx.fillStyle = 'rgba(244,246,251,0.75)'
      ctx.font = `600 12px 'Manrope', sans-serif`
      ctx.fillText(node.label, node.x, node.y + node.radius + 14)
    }

    let t = 0
    const draw = () => {
      t += 0.005
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Draw connection lines from center (index 0) to all others
      for (let i = 1; i < nodes.length; i++) {
        const from = nodes[0]
        const to = nodes[i]
        const grad = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
        grad.addColorStop(0, 'rgba(31,162,255,0.45)')
        grad.addColorStop(1, 'rgba(255,46,60,0.25)')
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        ctx.lineTo(to.x, to.y)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw particles
      particles.forEach((p) => {
        p.t = (p.t + p.speed) % 1
        const from = nodes[p.nodeFrom]
        const to = nodes[p.nodeTo]
        const px = from.x + (to.x - from.x) * p.t
        const py = from.y + (to.y - from.y) * p.t
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.85)'
        ctx.fill()
      })

      // Draw nodes
      nodes.forEach((node, i) => {
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const bright = dist < 60 || (i === 0 && Math.sin(t) > 0.5)
        drawGradCircle(node, bright)
      })

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', onMouse)

    return () => {
      cancelAnimationFrame(animRef.current)
      ro.disconnect()
      canvas.removeEventListener('mousemove', onMouse)
    }
  }, [buildNodes])

  return (
    <div className="relative w-full rounded-[28px] overflow-hidden" style={{ height: 'clamp(360px,48vw,480px)', background: 'radial-gradient(ellipse at center, rgba(28,127,214,0.10), transparent 70%)', border: '1px solid rgba(255,255,255,0.07)' }}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  )
}
