import React, { useRef, useState } from 'react'

interface TiltedCardProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  maxTilt?: number
  scale?: number
  glareOpacity?: number
  href?: string
}

export default function TiltedCard({
  children,
  className = '',
  style = {},
  maxTilt = 14,
  scale = 1.03,
  glareOpacity = 0.2,
  href,
}: TiltedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState('')
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -maxTilt
    const rotateY = ((x - centerX) / centerX) * maxTilt

    const glareX = (x / rect.width) * 100
    const glareY = (y / rect.height) * 100

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`)
    setGlarePosition({ x: glareX, y: glareY, opacity: glareOpacity })
  }

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }))
  }

  const Component = href ? 'a' : 'div'
  const extraProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Component
      // @ts-expect-error dynamic component props
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl transition-transform duration-200 cubic-bezier(0.03, 0.98, 0.52, 0.99) ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        textDecoration: 'none',
        ...style,
      }}
      {...extraProps}
    >
      {/* Glare Reflection Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: glarePosition.opacity,
          background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)`,
        }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </Component>
  )
}
