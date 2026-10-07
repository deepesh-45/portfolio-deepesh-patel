export const MandalaWatermark = () => {
  return (
    <>
      {/* Top Right Ornamental Mandala Filigree */}
      <svg
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '580px',
          height: '580px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.12,
        }}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="250" r="230" stroke="#F5DBD5" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="250" cy="250" r="200" stroke="#D49B9E" strokeWidth="2" />
        <circle cx="250" cy="250" r="160" stroke="#F5DBD5" strokeWidth="1" />
        <circle cx="250" cy="250" r="120" stroke="#D49B9E" strokeWidth="2.5" />
        <circle cx="250" cy="250" r="80" stroke="#F5DBD5" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="40" stroke="#D49B9E" strokeWidth="2" />
        {/* Radiating 16 Petals */}
        {[...Array(16)].map((_, i) => {
          const angle = (i * 360) / 16
          return (
            <g key={i} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M 250 50 C 275 110, 275 170, 250 210 C 225 170, 225 110, 250 50 Z"
                stroke="#D49B9E"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 250 90 C 265 130, 265 170, 250 190 C 235 170, 235 130, 250 90 Z"
                stroke="#F5DBD5"
                strokeWidth="1"
                fill="none"
              />
              <line x1="250" y1="20" x2="250" y2="250" stroke="#D49B9E" strokeWidth="0.75" strokeDasharray="2 4" />
            </g>
          )
        })}
      </svg>

      {/* Bottom Left Ornamental Mandala Filigree */}
      <svg
        style={{
          position: 'absolute',
          bottom: '-120px',
          left: '-120px',
          width: '540px',
          height: '540px',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.1,
        }}
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="250" cy="250" r="220" stroke="#D49B9E" strokeWidth="2" strokeDasharray="6 8" />
        <circle cx="250" cy="250" r="180" stroke="#F5DBD5" strokeWidth="1.5" />
        <circle cx="250" cy="250" r="140" stroke="#D49B9E" strokeWidth="2" />
        <circle cx="250" cy="250" r="90" stroke="#F5DBD5" strokeWidth="1" />
        {[...Array(12)].map((_, i) => {
          const angle = (i * 360) / 12
          return (
            <g key={i} transform={`rotate(${angle} 250 250)`}>
              <path
                d="M 250 60 C 280 120, 280 180, 250 220 C 220 180, 220 120, 250 60 Z"
                stroke="#F5DBD5"
                strokeWidth="1.5"
                fill="none"
              />
            </g>
          )
        })}
      </svg>
    </>
  )
}

export default MandalaWatermark
