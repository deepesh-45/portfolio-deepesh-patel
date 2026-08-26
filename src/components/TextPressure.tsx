import React, { useRef, useState, useEffect } from 'react'

interface TextPressureProps {
  text: string
  flex?: boolean
  alpha?: boolean
  stroke?: boolean
  width?: boolean
  weight?: boolean
  italic?: boolean
  textColor?: string
  strokeColor?: string
  minFontSize?: number
  className?: string
  style?: React.CSSProperties
}

export default function TextPressure({
  text = 'Namaskaram!',
  textColor = '#9cb080',
  strokeColor = '#618764',
  className = '',
  style = {},
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))
      setMousePos({ x, y })
    }

    const currentRef = containerRef.current
    if (currentRef) {
      currentRef.addEventListener('mousemove', handleMouseMove)
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener('mousemove', handleMouseMove)
      }
    }
  }, [])

  const chars = text.split('')

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative inline-flex flex-wrap justify-center items-center select-none ${className}`}
      style={{
        cursor: 'pointer',
        ...style,
      }}
    >
      {chars.map((char, idx) => {
        const charRatio = idx / Math.max(1, chars.length - 1)
        const dist = Math.abs(charRatio - mousePos.x)
        const pressure = isHovered ? Math.max(0, 1 - dist * 2.2) : 0

        // Text Pressure distortion calculations
        const fontWeight = Math.round(500 + pressure * 450)
        const letterSpacing = `${(-0.02 + pressure * 0.08).toFixed(3)}em`
        const scaleY = (1 + pressure * 0.18).toFixed(2)
        const translateY = `-${(pressure * 10).toFixed(1)}px`
        const textShadow = isHovered
          ? `0 ${(pressure * 15).toFixed(1)}px ${(pressure * 25).toFixed(1)}px ${strokeColor}`
          : '0 4px 12px rgba(0,0,0,0.15)'

        return (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              fontWeight,
              letterSpacing,
              color: textColor,
              transform: `scaleY(${scaleY}) translateY(${translateY})`,
              textShadow,
              transition: 'transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1), font-weight 0.15s ease, letter-spacing 0.15s ease, text-shadow 0.2s ease',
              whiteSpace: char === ' ' ? 'pre' : 'normal',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        )
      })}
    </div>
  )
}
