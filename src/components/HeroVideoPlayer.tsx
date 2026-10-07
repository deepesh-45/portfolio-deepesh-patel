import { useState, useRef, useEffect } from 'react'
import { Play, Pause, Compass, Sparkles } from 'lucide-react'

interface HeroVideoPlayerProps {
  videoSrc?: string
  lang?: 'en' | 'hi'
}

export const HeroVideoPlayer = ({
  videoSrc = '/hero-avatar-namaskaram.mp4',
  lang = 'en',
}: HeroVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
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

    const onTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100)
      }
    }

    const handleEnded = () => {
      // Ensure glitch-free instant loop
      video.currentTime = 0
      video.play().catch(() => {})
    }

    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', handleEnded)

    if (video.readyState >= 3) {
      handleCanPlay()
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
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

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current
    if (!video || !video.duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const pos = (e.clientX - rect.left) / rect.width
    video.currentTime = Math.max(0, Math.min(pos * video.duration, video.duration))
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '1080px',
        margin: '0 auto',
      }}
    >
      {/* Ambient background rose glow behind chassis */}
      <div
        style={{
          position: 'absolute',
          inset: '-24px',
          borderRadius: '48px',
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(212, 155, 158, 0.28) 0%, rgba(184, 114, 119, 0.14) 45%, rgba(38, 11, 15, 0) 75%)',
          filter: 'blur(45px)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Outer Curved Glassmorphic Chassis (Matching reference design frame) */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          borderRadius: '28px',
          padding: '12px',
          background:
            'linear-gradient(145deg, rgba(245, 219, 213, 0.1) 0%, rgba(57, 19, 27, 0.65) 40%, rgba(26, 6, 9, 0.85) 100%)',
          border: '1.5px solid rgba(212, 155, 158, 0.28)',
          boxShadow:
            '0 32px 84px -16px rgba(10, 2, 4, 0.9), inset 0 1px 2px rgba(245, 219, 213, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Inner Video Viewport */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(420px, 48vw, 620px)',
            borderRadius: '20px',
            overflow: 'hidden',
            backgroundColor: '#1C060A',
            boxShadow: 'inset 0 0 35px rgba(0, 0, 0, 0.8)',
          }}
        >
          {/* Glitch-Free Native HTML5 Video */}
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
              display: 'block',
              transform: 'translateZ(0) scale(1.008)',
              WebkitTransform: 'translateZ(0) scale(1.008)',
              backfaceVisibility: 'hidden',
              willChange: 'transform',
              opacity: isLoaded ? 1 : 0.85,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Top Left: Play/Pause Glass Pill */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            style={{
              position: 'absolute',
              top: '18px',
              left: '18px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(38, 11, 15, 0.78)',
              border: '1px solid rgba(212, 155, 158, 0.35)',
              color: '#F5DBD5',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(57, 19, 27, 0.92)'
              e.currentTarget.style.borderColor = '#D49B9E'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(38, 11, 15, 0.78)'
              e.currentTarget.style.borderColor = 'rgba(212, 155, 158, 0.35)'
            }}
          >
            {isPlaying ? <Pause size={12} fill="#F5DBD5" /> : <Play size={12} fill="#F5DBD5" />}
            <span>{isPlaying ? (lang === 'hi' ? 'रोकें' : 'Pause') : (lang === 'hi' ? 'चलाएं' : 'Play')}</span>
          </button>

          {/* Top Right: Reference Interaction Badge (Exact replica of reference UI) */}
          <div
            style={{
              position: 'absolute',
              top: '18px',
              right: '18px',
              zIndex: 30,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '7px 16px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(38, 11, 15, 0.82)',
              border: '1px solid rgba(212, 155, 158, 0.35)',
              color: '#D49B9E',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '0.74rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              pointerEvents: 'none',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4)',
            }}
          >
            <Sparkles size={13} className="text-[#D49B9E]" />
            <span>
              {lang === 'hi'
                ? 'इंटरएक्टिव 3D · स्थानिक मुद्रा रेंडर'
                : 'Interactive 3D · Spatial Mudra Render'}
            </span>
          </div>

          {/* Bottom Left: Spatial Coordinate Frame (Exact replica of reference UI) */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '20px',
              zIndex: 30,
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              padding: '8px 16px',
              borderRadius: '14px',
              backgroundColor: 'rgba(38, 11, 15, 0.82)',
              border: '1px solid rgba(212, 155, 158, 0.25)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              boxShadow: '0 6px 18px rgba(0,0,0,0.45)',
            }}
            className="hidden sm:flex"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#D49B9E',
              }}
            >
              <Compass size={11} />
              <span>
                {lang === 'hi' ? 'स्थानिक निर्देशांक फ्रेम' : 'Spatial Coordinate Frame'}
              </span>
            </div>
            <div
              style={{
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#F5DBD5',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              22.7196° N, 75.8577° E (Indore) · Model Ref DP-26
            </div>
          </div>

          {/* Bottom Sleek Scrubber Bar */}
          <div
            onClick={handleScrub}
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '20px',
              right: '20px',
              zIndex: 30,
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '4px',
                borderRadius: '9999px',
                backgroundColor: 'rgba(212, 155, 158, 0.22)',
                overflow: 'hidden',
                backdropFilter: 'blur(6px)',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #B87277 0%, #D49B9E 70%, #F5DBD5 100%)',
                  borderRadius: '9999px',
                  boxShadow: '0 0 10px rgba(212, 155, 158, 0.8)',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroVideoPlayer
