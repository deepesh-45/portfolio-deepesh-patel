import { useState, useRef, useEffect } from 'react'
import { Play, Pause } from 'lucide-react'

interface HeroBackgroundVideoProps {
  videoSrc?: string
  lang?: 'en' | 'hi'
}

export const HeroBackgroundVideo = ({
  videoSrc = '/hero-avatar-namaskaram.mp4',
  lang = 'en',
}: HeroBackgroundVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = true
    video.defaultMuted = true

    const handleCanPlay = () => {
      setIsLoaded(true)
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false))
      }
    }

    const handleEnded = () => {
      video.currentTime = 0
      video.play().catch(() => {})
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('ended', handleEnded)

    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('ended', handleEnded)
    }
  }, [videoSrc])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Native Glitch-Free Background Video */}
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: '84% center', // Anchors avatar cleanly on the right half
          display: 'block',
          transform: 'translateZ(0) scale(1.02)',
          WebkitTransform: 'translateZ(0) scale(1.02)',
          backfaceVisibility: 'hidden',
          willChange: 'transform',
          opacity: isLoaded ? 0.95 : 0.7,
          transition: 'opacity 0.6s ease',
        }}
      />

      {/* 
        DIRECTIONAL PROTECTION SCRIMS
        These ensure the left-aligned text is 100% crisp and readable
        without mixing with the avatar or video colors.
      */}

      {/* 1. Primary Left-to-Right Scrim: Dark Oxblood on left -> transparent on right */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, rgba(38, 11, 15, 0.98) 0%, rgba(38, 11, 15, 0.93) 38%, rgba(38, 11, 15, 0.62) 58%, rgba(38, 11, 15, 0.18) 78%, rgba(38, 11, 15, 0) 100%)',
          zIndex: 2,
        }}
        className="hidden md:block"
      />

      {/* Mobile/Tablet Full Protective Scrim */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to bottom, rgba(38, 11, 15, 0.94) 0%, rgba(38, 11, 15, 0.86) 50%, rgba(38, 11, 15, 0.95) 100%)',
          zIndex: 2,
        }}
        className="block md:hidden"
      />

      {/* 2. Bottom Seamless Fade into Canvas */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '180px',
          background:
            'linear-gradient(to bottom, rgba(38, 11, 15, 0) 0%, rgba(38, 11, 15, 0.65) 55%, #260B0F 100%)',
          zIndex: 3,
        }}
      />

      {/* 3. Top Header Ambient Scrim */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '110px',
          background:
            'linear-gradient(to bottom, rgba(26, 6, 9, 0.85) 0%, rgba(26, 6, 9, 0) 100%)',
          zIndex: 3,
        }}
      />

      {/* Discreet Video Control Pill in Bottom Right (No decorative legends) */}
      <div
        style={{
          position: 'absolute',
          bottom: '24px',
          right: 'clamp(16px, 3vw, 40px)',
          zIndex: 20,
          pointerEvents: 'auto',
        }}
      >
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause Background Video' : 'Play Background Video'}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '7px 14px',
            borderRadius: '9999px',
            backgroundColor: 'rgba(38, 11, 15, 0.8)',
            border: '1px solid rgba(212, 155, 158, 0.3)',
            color: '#F5DBD5',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(57, 19, 27, 0.95)'
            e.currentTarget.style.borderColor = '#D49B9E'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(38, 11, 15, 0.8)'
            e.currentTarget.style.borderColor = 'rgba(212, 155, 158, 0.3)'
          }}
        >
          {isPlaying ? <Pause size={11} fill="#F5DBD5" /> : <Play size={11} fill="#F5DBD5" />}
          <span>{isPlaying ? (lang === 'hi' ? 'रोकें' : 'Pause') : (lang === 'hi' ? 'चलाएं' : 'Play')}</span>
        </button>
      </div>
    </div>
  )
}

export default HeroBackgroundVideo
