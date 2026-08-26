import React, { useState } from 'react'

interface DecayCardProps {
  children: React.ReactNode
  className?: string
  accentColor?: string
  style?: React.CSSProperties
}

export default function DecayCard({
  children,
  className = '',
  accentColor = '#06b6d4',
  style = {},
}: DecayCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl transition-all duration-300 ${className}`}
      style={{
        ...style,
      }}
    >
      {/* Animated Accent Line Edge */}
      <div
        className="absolute top-0 left-0 h-full w-1 transition-all duration-500"
        style={{
          backgroundColor: accentColor,
          boxShadow: isHovered ? `0 0 20px ${accentColor}` : 'none',
          transform: isHovered ? 'scaleY(1)' : 'scaleY(0.6)',
          transformOrigin: 'top',
        }}
      />
      <div className="relative z-10 pl-2">{children}</div>
    </div>
  )
}
