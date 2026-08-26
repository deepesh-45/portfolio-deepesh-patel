import React, { useRef, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  gradientBorder?: string
  style?: React.CSSProperties
  onClick?: () => void
  href?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(156, 176, 128, 0.25)',
  gradientBorder = 'linear-gradient(135deg, #9cb080, #618764, #2b5748, #9cb080)',
  style = {},
  onClick,
  href,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current) return

    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const Component = href ? 'a' : 'div'
  const extraProps = href
    ? { href, target: '_blank', rel: 'noopener noreferrer' }
    : { onClick }

  return (
    <Component
      // @ts-expect-error dynamic component props
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[32px] transition-all duration-300 ease-out ${className}`}
      style={{
        transform: isHovered ? 'translateY(-8px) scale(1.01)' : 'translateY(0px) scale(1)',
        boxShadow: isHovered
          ? '0 20px 40px -15px rgba(0, 0, 0, 0.35), 0 0 25px -5px rgba(236, 72, 153, 0.25)'
          : '0 10px 30px -10px rgba(0, 0, 0, 0.15)',
        textDecoration: 'none',
        ...style,
      }}
      {...extraProps}
    >
      {/* Animated Gradient Border Overlay */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[32px] p-[1.5px] transition-opacity duration-500 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: gradientBorder,
          backgroundSize: '200% 200%',
          animation: 'border-glow-sweep 3s ease infinite',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Mouse Tracking Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 55%)`,
        }}
      />

      <div className="relative z-20 h-full w-full">{children}</div>
    </Component>
  )
}
