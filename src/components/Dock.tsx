import React, { useRef, useState } from 'react'

export interface DockItem {
  id: string
  label: string
  icon: React.ReactNode
  onClick: () => void
}

interface DockProps {
  items: DockItem[]
  currentTheme: {
    cardBg: string
    cardBorder: string
    textColor: string
    subTextColor: string
    pillBg: string
    pillBorder: string
    accent: string
  }
  brandName?: string
  brandSub?: string
}

export default function Dock({
  items,
  currentTheme,
  brandName = 'Deepesh Patel',
  brandSub = 'AI & ML Engineer',
}: DockProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const dockRef = useRef<HTMLDivElement>(null)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 1000,
        padding: '8px clamp(8px, 2vw, 20px)',
        backgroundColor: currentTheme.cardBg,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: `1px solid ${currentTheme.cardBorder}`,
        boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.25)',
        transition: 'all 0.3s ease',
      }}
      ref={dockRef}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(8px, 1.5vw, 16px)',
        }}
      >
        {/* Brand Title Block Shifted Far Left */}
        <div
          style={{
            cursor: 'pointer',
            flexShrink: 0,
            paddingRight: '12px',
            borderRight: `1px solid ${currentTheme.cardBorder}`,
          }}
          onClick={() => {
            const elem = document.getElementById('home')
            if (elem) elem.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <h1 style={{ margin: 0, fontSize: 'clamp(0.92rem, 2vw, 1.2rem)', fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>
            {brandName}
          </h1>
          <p className="hidden md:block" style={{ margin: 0, fontSize: '0.7rem', color: currentTheme.accent, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {brandSub}
          </p>
        </div>

        {/* Dock Items Bar (Positioned clearly to the right of brand name with zero overlap) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2px, 0.8vw, 8px)',
            marginLeft: 'auto',
            flexShrink: 1,
            overflow: 'hidden',
          }}
        >
          {items.map((item, idx) => {
            const isHovered = hoveredIdx === idx
            const isNeighbor =
              hoveredIdx !== null && Math.abs(hoveredIdx - idx) === 1

            let scale = 1
            if (isHovered) scale = 1.12
            else if (isNeighbor) scale = 1.04

            return (
              <button
                key={item.id}
                onClick={item.onClick}
                aria-label={item.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  padding: '6px clamp(6px, 1vw, 12px)',
                  minHeight: '34px',
                  borderRadius: '9999px',
                  backgroundColor: isHovered ? currentTheme.pillBg : 'transparent',
                  border: `1px solid ${isHovered ? currentTheme.pillBorder : 'transparent'}`,
                  color: isHovered ? currentTheme.accent : currentTheme.textColor,
                  fontSize: 'clamp(0.75rem, 1vw, 0.86rem)',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition:
                    'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  transform: `scale(${scale})`,
                  outline: 'none',
                  flexShrink: 0,
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center' }}>{item.icon}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
