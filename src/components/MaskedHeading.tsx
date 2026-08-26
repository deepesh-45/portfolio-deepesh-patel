import React, { useEffect, useRef, useState } from 'react';

export interface MaskedHeadingProps {
  text: string;
  src?: string;
  mediaType?: 'image' | 'video';
  poster?: string;
  fillScale?: number;
  parallax?: number;
  reveal?: 'rise' | 'fade' | 'zoom' | 'none';
  trigger?: 'view' | 'hover' | 'auto' | 'none';
  drift?: number;
  brightness?: number;
  saturation?: number;
  grayscale?: boolean;
  duration?: number;
  stagger?: number;
  align?: 'left' | 'center' | 'right';
  weight?: number | string;
  tracking?: number;
  lineHeight?: number;
  textScale?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text,
  src = '/hero.jpg',
  mediaType = 'image',
  poster,
  fillScale = 1.35,
  parallax = 26,
  reveal = 'rise',
  trigger = 'view',
  drift = 18,
  brightness = 1,
  saturation = 1,
  grayscale = false,
  duration = 1.1,
  stagger = 0.09,
  align = 'center',
  weight = 700,
  tracking = -0.03,
  lineHeight = 1.06,
  textScale = 0.115,
  className = '',
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (trigger === 'auto') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [trigger]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const parallaxX = mousePos.x * parallax;
  const parallaxY = mousePos.y * parallax;

  const getRevealTransform = () => {
    if (!isVisible && trigger !== 'none') {
      if (reveal === 'rise') return 'translateY(40px)';
      if (reveal === 'zoom') return 'scale(0.85)';
      if (reveal === 'fade') return 'translateY(0px)';
    }
    return 'translateY(0px) scale(1)';
  };

  const filterStyle = `brightness(${brightness}) saturate(${saturation}) ${grayscale ? 'grayscale(100%)' : ''}`;
  const fontSize = typeof textScale === 'number' ? `clamp(2.8rem, ${textScale * 100}vw, 8rem)` : textScale;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`masked-heading-container relative overflow-hidden select-none ${className}`}
      style={{
        display: 'inline-block',
        textAlign: align,
        width: '100%',
        margin: '0 auto',
        ...style,
      }}
    >
      <div
        style={{
          transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${stagger}s`,
          opacity: isVisible || trigger === 'none' ? 1 : 0,
          transform: getRevealTransform(),
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            fontSize,
            fontWeight: weight,
            letterSpacing: `${tracking}em`,
            lineHeight,
            textTransform: 'uppercase',
            maxWidth: '100%',
            wordBreak: 'break-word',
          }}
        >
          {mediaType === 'video' ? (
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
            >
              {text}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  mixBlendMode: 'normal',
                  WebkitMaskImage: `linear-gradient(black, black)`,
                  maskImage: `linear-gradient(black, black)`,
                }}
              >
                <video
                  src={src}
                  poster={poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `translate(-50%, -50%) scale(${fillScale}) translate3d(${parallaxX + drift}px, ${parallaxY}px, 0)`,
                    filter: filterStyle,
                    transition: 'transform 0.2s ease-out',
                  }}
                />
              </div>
            </div>
          ) : (
            <div
              style={{
                display: 'inline-block',
                backgroundImage: src
                  ? `url(${src}), linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)`
                  : 'linear-gradient(135deg, #ffffff 0%, #93c5fd 40%, #c084fc 100%)',
                backgroundSize: 'cover',
                backgroundPosition: `${50 + parallaxX + drift}% ${50 + parallaxY}%`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                filter: filterStyle,
                transition: 'background-position 0.2s ease-out, transform 0.3s ease',
              }}
            >
              {text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaskedHeading;
