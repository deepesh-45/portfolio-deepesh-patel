import React from 'react';

export interface ShinyTextProps {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  direction?: 'left' | 'right';
  yoyo?: boolean;
  pauseOnHover?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  speed = 2.5,
  delay = 0,
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 145,
  direction = 'left',
  yoyo = false,
  pauseOnHover = false,
  disabled = false,
  className = '',
  style = {},
}) => {
  const animationDuration = `${speed}s`;
  const animationDelay = `${delay}s`;

  if (disabled) {
    return (
      <span className={`inline-block ${className}`} style={{ color, ...style }}>
        {text}
      </span>
    );
  }

  const gradientDirection = direction === 'left' ? '90deg' : '-90deg';

  return (
    <span
      className={`shiny-text-component inline-block ${pauseOnHover ? 'hover:pause-animation' : ''} ${className}`}
      style={{
        display: 'inline-block',
        color,
        backgroundImage: `linear-gradient(${gradientDirection}, ${color} 0%, ${color} ${Math.max(0, 50 - spread / 3)}%, ${shineColor} 50%, ${color} ${Math.min(100, 50 + spread / 3)}%, ${color} 100%)`,
        backgroundSize: `${spread * 2.5}% 100%`,
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        animationName: yoyo ? 'shiny-text-yoyo' : 'shiny-text-left',
        animationDuration,
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        animationDelay,
        animationDirection: yoyo ? 'alternate' : 'normal',
        ...style,
      }}
    >
      {text}
    </span>
  );
};

export default ShinyText;
